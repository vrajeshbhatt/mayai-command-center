-- Initial schema for Mayai Command Center
-- Run this in Supabase SQL Editor

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
VALUES (1, 'Operational', 'System initialized')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_brain_type ON brain(entry_type);

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE ideas;
ALTER PUBLICATION supabase_realtime ADD TABLE brain;
ALTER PUBLICATION supabase_realtime ADD TABLE logs;
ALTER PUBLICATION supabase_realtime ADD TABLE discussions;
ALTER PUBLICATION supabase_realtime ADD TABLE system_status;

-- Set up Row Level Security (RLS)
-- For now, allow all access (public). In production, restrict based on user.

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE brain ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_status ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (for demo/public use)
-- In production, replace these with proper auth checks

CREATE POLICY "Allow all" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON ideas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON brain FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON discussions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON system_status FOR ALL USING (true) WITH CHECK (true);
