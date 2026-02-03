import requests
import json

# Supabase configuration
SUPABASE_URL = "https://vfximbrvzkmcsupqbkgq.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGltYnJ2emttY3N1cHFia2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA2MDAyOSwiZXhwIjoyMDg1NjM2MDI5fQ.Mj4kq-SxU04-TX0QvcrXJF5vw0RGd83RsvYJlweXhEY"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

# SQL to create tables
sql_commands = """
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tasks table
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

-- Projects table
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

-- Ideas table
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

-- Brain/Insights table
CREATE TABLE IF NOT EXISTS brain (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    entry_type TEXT DEFAULT 'Note' CHECK (entry_type IN ('VrajPref', 'MayaiNote', 'Idea', 'Learning', 'Decision', 'Note')),
    topic TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logs table
CREATE TABLE IF NOT EXISTS logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'Mayai',
    level TEXT DEFAULT 'INFO' CHECK (level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'SUCCESS')),
    message TEXT NOT NULL,
    topic_module TEXT,
    metadata JSONB
);

-- Discussions table
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

-- System status table
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

-- Insert initial system status
INSERT INTO system_status (id, status, current_activity) 
VALUES (1, 'Operational', 'Command Center initialized')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_brain_type ON brain(entry_type);
"""

# Execute SQL
response = requests.post(
    f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
    headers=headers,
    json={"sql": sql_commands}
)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")

if response.status_code == 200:
    print("✅ Tables created successfully!")
else:
    print("❌ Error creating tables")
    print(f"Details: {response.json() if response.text else 'No response'}")
