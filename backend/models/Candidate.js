const db = require('../db');

class Candidate {
  static async upsert(candidateData) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      
      // 1. Insert or update candidate
      const candidateRes = await client.query(
        `INSERT INTO candidates (name, email, phone, location, raw_resume_text) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO UPDATE 
         SET name=EXCLUDED.name, phone=EXCLUDED.phone, location=EXCLUDED.location, raw_resume_text=EXCLUDED.raw_resume_text
         RETURNING *`,
        [candidateData.name, candidateData.email, candidateData.phone || null, candidateData.location || null, candidateData.rawText || '']
      );
      const candidate = candidateRes.rows[0];

      // 2. Insert skills safely and associate
      if (candidateData.skills && Array.isArray(candidateData.skills)) {
        for (const skill of candidateData.skills) {
          const skillName = skill.trim();
          if (!skillName) continue;
          
          let skillRes = await client.query(`SELECT id FROM skills WHERE name = $1`, [skillName]);
          if (skillRes.rows.length === 0) {
            skillRes = await client.query(`INSERT INTO skills (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`, [skillName]);
            if (skillRes.rows.length === 0) {
               // In case another transaction inserted it just now
               skillRes = await client.query(`SELECT id FROM skills WHERE name = $1`, [skillName]);
            }
          }
          
          if (skillRes.rows[0]) {
             await client.query(
               `INSERT INTO candidate_skills (candidate_id, skill_id, years_of_experience) 
                VALUES ($1, $2, $3)
                ON CONFLICT (candidate_id, skill_id) DO UPDATE SET years_of_experience = EXCLUDED.years_of_experience`,
               [candidate.id, skillRes.rows[0].id, candidateData.experience || null]
             );
          }
        }
      }
      
      await client.query('COMMIT');
      return candidate;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const res = await db.query(`
      SELECT c.*, array_remove(array_agg(s.name), NULL) as skills 
      FROM candidates c
      LEFT JOIN candidate_skills cs ON c.id = cs.candidate_id
      LEFT JOIN skills s ON cs.skill_id = s.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    return res.rows;
  }
}

module.exports = Candidate;
