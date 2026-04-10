import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists with this email');
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: role || 'user',
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data received');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login user / Auth
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide an email and password');
    }

    // Check for user (must strictly select password since we hid it by default)
    const user = await User.findOne({ email }).select('+password');

    // Check if user matches and password is valid
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Google Auth Login / Register
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res, next) => {
  try {
    const { tokenId } = req.body;

    if (!tokenId) {
      res.status(400);
      throw new Error('No Google token provided');
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update Google ID if it was an existing email account that didn't have one
      if (!user.googleId) {
        user.googleId = googleId;
        user.name = user.name || name;
        user.avatar = user.avatar || avatar;
        await user.save();
      }
    } else {
      // Create new user using Google profile
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        role: 'user',
        // Note: Password isn't required anymore, but you can randomize it if needed.
      });
    }

    // Generate JWT token
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401);
    next(new Error('Google authentication failed - Invalid Token'));
  }
};