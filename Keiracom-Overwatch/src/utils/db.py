import sqlite3

def init_db():
    """Initialize Local SQLite for audit logs."""
    conn = sqlite3.connect('overwatch.db')
    c = conn.cursor()
    # Create tables if not exist
    conn.commit()
    conn.close()
