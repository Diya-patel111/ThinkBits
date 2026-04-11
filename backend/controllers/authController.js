const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me_in_production';
// Fallback clientId for testing if not set in .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '1013487374026-YOUR_CLIENT_ID.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into DB
    const newUser = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'User registered successfully!', user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error during signup.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ error: 'User does not exist. Please sign up first.' });
    }

    const user = userCheck.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful!', user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token, mode } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Google token is required.' });
    }

    // Verify token with google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      // If you are setting the client ID in env, pass it here, or omit if relying on default behaviour
      // audience: GOOGLE_CLIENT_ID,  
    });
    
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    let user;

    if (userCheck.rows.length === 0) {
      // If user tries to login but hasn't created an account yet
      if (mode === 'login') {
        return res.status(400).json({ error: 'User does not exist. Please sign up first.' });
      }

      // User does not exist, so register them properly in the DB
      // We generate a secure random password since they use Google to log in, but DB requires password
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      const newUser = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );
      user = newUser.rows[0];
    } else {
      // If user tries to signup but already has an account
      if (mode === 'signup') {
        return res.status(400).json({ error: 'User with this email already exists. Please log in.' });
      }
      // User exists, so just fetch their record
      user = userCheck.rows[0];
    }

    // Generate JWT specific to your app
    const appToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ 
      message: 'Google login successful!', 
      user: { id: user.id, name: user.name, email: user.email }, 
      token: appToken 
    });
  } catch (error) {
    console.error('Google Login error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google.' });
  }
};

