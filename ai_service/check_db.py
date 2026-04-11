import os
from sqlalchemy import text
from database import engine

def check_connection():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT current_user, current_database();"))
            row = result.fetchone()
            print(f"SUCCESS: Connected to database '{row[1]}' as user '{row[0]}'")
            
            tables = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
            """)).fetchall()
            print(f"TABLES FOUND: {[t[0] for t in tables]}")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    check_connection()