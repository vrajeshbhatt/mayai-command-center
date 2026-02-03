"""
Create Supabase Tables via Direct PostgreSQL Connection
"""

import psycopg2
from psycopg2.extras import RealDictCursor

# Connection details from the URI
# postgresql://postgres:Mayai@database1@db.vfximbrvzkmcsupqbkgq.supabase.co:5432/postgres

conn_params = {
    'host': 'db.vfximbrvzkmcsupqbkgq.supabase.co',
    'port': '5432',
    'database': 'postgres',
    'user': 'postgres',
    'password': 'Mayai@database1'
}

# SQL to create all tables
sql_commands = """
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Todo' CHECK (status IN ('Todo', 'In Progress', 'Blocked', 'Done')),
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Planning' CHECK (status IN ('Planning', 'In Progress', 'Review', 'Completed', 'On Hold')),
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date TIMESTAMP WITH TIME ZONE,
    target_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IDEAS TABLE
CREATE TABLE IF NOT EXISTS ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Approved', 'In Development', 'Implemented', 'Archived')),
    category TEXT DEFAULT 'Other' CHECK (category IN ('Feature', 'Improvement', 'Integration', 'Automation', 'Research', 'Other')),
    priority TEXT DEFAULT 'Nice to Have' CHECK (priority IN ('Must Have', 'Should Have', 'Nice to Have', 'Someday')),
    impact TEXT DEFAULT 'Medium' CHECK (impact IN ('High', 'Medium', 'Low')),
    effort TEXT DEFAULT 'Medium' CHECK (effort IN ('Quick Win', 'Medium', 'Large')),
    votes INTEGER DEFAULT 0,
    submitted_by TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BRAIN/INSIGHTS TABLE
CREATE TABLE IF NOT EXISTS brain (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    entry_type TEXT DEFAULT 'Note' CHECK (entry_type IN ('VrajPref', 'MayaiNote', 'Idea', 'Learning', 'Decision', 'Note')),
    topic TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LOGS TABLE
CREATE TABLE IF NOT EXISTS logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'Mayai',
    level TEXT DEFAULT 'INFO' CHECK (level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'SUCCESS')),
    message TEXT NOT NULL,
    topic_module TEXT,
    metadata JSONB
);

-- DISCUSSIONS TABLE
CREATE TABLE IF NOT EXISTS discussions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    topic TEXT NOT NULL,
    type TEXT DEFAULT 'Discussion' CHECK (type IN ('Decision', 'Question', 'Discussion', 'Feedback', 'Announcement')),
    status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Discussion', 'Resolved', 'Closed')),
    priority TEXT DEFAULT 'Normal' CHECK (priority IN ('Urgent', 'High', 'Normal', 'Low')),
    participants TEXT[],
    key_points TEXT,
    decision_outcome TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SYSTEM STATUS TABLE
CREATE TABLE IF NOT EXISTS system_status (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    status TEXT DEFAULT 'Operational',
    last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active_tasks INTEGER DEFAULT 0,
    pending_ideas INTEGER DEFAULT 0,
    active_projects INTEGER DEFAULT 0,
    current_activity TEXT DEFAULT 'Idle',
    api_connections TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INSERT INITIAL SYSTEM STATUS
INSERT INTO system_status (id, status, current_activity) 
VALUES (1, 'Operational', 'Command Center initialized and ready!')
ON CONFLICT (id) DO NOTHING;

-- INSERT SAMPLE TASKS
INSERT INTO tasks (title, description, status, priority) VALUES
('Setup Command Center', 'Initialize the Mayai Command Center', 'Done', 'High'),
('Configure Supabase', 'Connect to Supabase database', 'Done', 'High'),
('Add Dashboard Components', 'Create all dashboard widgets', 'In Progress', 'High'),
('Test Real-time Updates', 'Verify live data synchronization', 'Todo', 'Medium'),
('Deploy to GitHub Pages', 'Set up CI/CD pipeline', 'Todo', 'Medium')
ON CONFLICT DO NOTHING;

-- INSERT SAMPLE PROJECTS
INSERT INTO projects (name, description, status, priority, progress) VALUES
('Mayai Command Center', 'AI collaboration platform with real-time dashboard', 'In Progress', 'High', 75),
('Local Dashboard', 'Python-based local dashboard', 'Completed', 'High', 100),
('Supabase Integration', 'Cloud database and real-time sync', 'In Progress', 'High', 80),
('GitHub Deployment', 'CI/CD and GitHub Pages setup', 'Planning', 'Medium', 0)
ON CONFLICT DO NOTHING;

-- INSERT SAMPLE IDEAS
INSERT INTO ideas (title, description, status, category, priority, votes) VALUES
('Voice Interface', 'Add voice command capabilities to Mayai', 'New', 'Feature', 'Should Have', 5),
('Mobile App', 'Create mobile-responsive PWA', 'Under Review', 'Feature', 'Nice to Have', 3),
('Local LLM Integration', 'Connect Ollama for offline AI', 'Approved', 'Integration', 'Must Have', 8),
('Team Collaboration', 'Multi-user support and permissions', 'New', 'Feature', 'Nice to Have', 2)
ON CONFLICT DO NOTHING;

-- INSERT SAMPLE BRAIN ENTRIES
INSERT INTO brain (title, content, entry_type) VALUES
('Architecture Decision', 'Vraj prefers local-first solutions for privacy and control', 'VrajPref'),
('Communication Style', 'Mayai should proactively communicate status updates', 'MayaiNote'),
('Tech Stack', 'React + Vite + Supabase + Tailwind = perfect combo', 'Learning'),
('Deployment Strategy', 'GitHub Pages + Supabase free tier = $0 cost', 'Decision')
ON CONFLICT DO NOTHING;

-- INSERT SAMPLE LOGS
INSERT INTO logs (message, level, source, topic_module) VALUES
('Command Center initialized successfully', 'SUCCESS', 'System', 'Initialization'),
('Connected to Supabase database', 'SUCCESS', 'Database', 'Connection'),
('Dashboard components loaded', 'INFO', 'UI', 'Components'),
('Real-time subscriptions active', 'INFO', 'Realtime', 'Subscriptions')
ON CONFLICT DO NOTHING;

-- CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_brain_type ON brain(entry_type);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE brain ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_status ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES (Allow all for demo)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'tasks' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON tasks FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON projects FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'ideas' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON ideas FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'brain' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON brain FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'logs' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON logs FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'discussions' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON discussions FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'system_status' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON system_status FOR ALL USING (true) WITH CHECK (true);
    END IF;
END
$$;
"""

def setup_database():
    """Connect to PostgreSQL and create all tables"""
    print("=" * 60)
    print("SETTING UP SUPABASE DATABASE")
    print("=" * 60)
    
    conn = None
    try:
        # Connect to database
        print("\n[1/3] Connecting to PostgreSQL...")
        conn = psycopg2.connect(**conn_params)
        conn.autocommit = True
        
        # Create cursor
        cursor = conn.cursor()
        
        # Execute SQL
        print("[2/3] Creating tables and inserting sample data...")
        cursor.execute(sql_commands)
        
        # Verify tables were created
        print("[3/3] Verifying setup...")
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('tasks', 'projects', 'ideas', 'brain', 'logs', 'system_status')
        """)
        
        tables = cursor.fetchall()
        print(f"\n[SUCCESS] Created {len(tables)} tables:")
        for table in tables:
            print(f"  - {table[0]}")
        
        # Count records in each table
        print("\n[SUCCESS] Sample data inserted:")
        for table_name in ['tasks', 'projects', 'ideas', 'brain', 'logs']:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"  - {table_name}: {count} records")
        
        cursor.close()
        print("\n" + "=" * 60)
        print("DATABASE SETUP COMPLETE!")
        print("=" * 60)
        print("\nYour Command Center is ready to use!")
        print("Refresh your dashboard to see the data.")
        
        return True
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    setup_database()
