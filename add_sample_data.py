"""
Add sample data to Supabase tables
"""

import requests
import json

SUPABASE_URL = "https://vfximbrvzkmcsupqbkgq.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGltYnJ2emttY3N1cHFia2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA2MDAyOSwiZXhwIjoyMDg1NjM2MDI5fQ.Mj4kq-SxU04-TX0QvcrXJF5vw0RGd83RsvYJlweXhEY"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def check_data(table_name):
    """Check if table has data"""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?limit=1"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return len(data) > 0
    return False

def insert_data(table_name, data):
    """Insert data into table"""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}"
    response = requests.post(url, headers=headers, json=data)
    return response.status_code in [200, 201]

def main():
    print("=" * 60)
    print("ADDING SAMPLE DATA TO SUPABASE")
    print("=" * 60)
    
    # Check current data
    tables = ['tasks', 'projects', 'ideas', 'brain', 'logs']
    
    print("\nChecking existing data...")
    for table in tables:
        has_data = check_data(table)
        status = "[HAS DATA]" if has_data else "[EMPTY]"
        print(f"  {table}: {status}")
    
    # Add tasks if empty
    if not check_data('tasks'):
        print("\n[ADDING] Tasks...")
        tasks = [
            {"title": "Setup Command Center", "description": "Initialize the Mayai Command Center", "status": "Done", "priority": "High"},
            {"title": "Configure Supabase", "description": "Connect to Supabase database", "status": "Done", "priority": "High"},
            {"title": "Add Dashboard Components", "description": "Create all dashboard widgets", "status": "In Progress", "priority": "High"},
            {"title": "Test Real-time Updates", "description": "Verify live data synchronization", "status": "Todo", "priority": "Medium"},
            {"title": "Deploy to GitHub Pages", "description": "Set up CI/CD pipeline", "status": "Todo", "priority": "Medium"}
        ]
        for task in tasks:
            insert_data('tasks', task)
        print("  [OK] Added 5 tasks")
    else:
        print("\n[SKIPPING] Tasks already have data")
    
    # Add projects if empty
    if not check_data('projects'):
        print("\n[ADDING] Projects...")
        projects = [
            {"name": "Mayai Command Center", "description": "AI collaboration platform with real-time dashboard", "status": "In Progress", "priority": "High", "progress": 75},
            {"name": "Local Dashboard", "description": "Python-based local dashboard", "status": "Completed", "priority": "High", "progress": 100},
            {"name": "Supabase Integration", "description": "Cloud database and real-time sync", "status": "In Progress", "priority": "High", "progress": 80},
            {"name": "GitHub Deployment", "description": "CI/CD and GitHub Pages setup", "status": "Planning", "priority": "Medium", "progress": 0}
        ]
        for proj in projects:
            insert_data('projects', proj)
        print("  [OK] Added 4 projects")
    else:
        print("\n[SKIPPING] Projects already have data")
    
    # Add ideas if empty
    if not check_data('ideas'):
        print("\n[ADDING] Ideas...")
        ideas = [
            {"title": "Voice Interface", "description": "Add voice command capabilities to Mayai", "status": "New", "category": "Feature", "priority": "Should Have", "votes": 5},
            {"title": "Mobile App", "description": "Create mobile-responsive PWA", "status": "Under Review", "category": "Feature", "priority": "Nice to Have", "votes": 3},
            {"title": "Local LLM Integration", "description": "Connect Ollama for offline AI", "status": "Approved", "category": "Integration", "priority": "Must Have", "votes": 8},
            {"title": "Team Collaboration", "description": "Multi-user support and permissions", "status": "New", "category": "Feature", "priority": "Nice to Have", "votes": 2}
        ]
        for idea in ideas:
            insert_data('ideas', idea)
        print("  [OK] Added 4 ideas")
    else:
        print("\n[SKIPPING] Ideas already have data")
    
    # Add brain entries if empty
    if not check_data('brain'):
        print("\n[ADDING] Brain entries...")
        brain_entries = [
            {"title": "Architecture Decision", "content": "Vraj prefers local-first solutions for privacy and control", "entry_type": "VrajPref"},
            {"title": "Communication Style", "content": "Mayai should proactively communicate status updates", "entry_type": "MayaiNote"},
            {"title": "Tech Stack", "content": "React + Vite + Supabase + Tailwind = perfect combo", "entry_type": "Learning"},
            {"title": "Deployment Strategy", "content": "GitHub Pages + Supabase free tier = $0 cost", "entry_type": "Decision"}
        ]
        for entry in brain_entries:
            insert_data('brain', entry)
        print("  [OK] Added 4 brain entries")
    else:
        print("\n[SKIPPING] Brain already has data")
    
    # Add logs if empty
    if not check_data('logs'):
        print("\n[ADDING] Logs...")
        logs = [
            {"message": "Command Center initialized successfully", "level": "SUCCESS", "source": "System", "topic_module": "Initialization"},
            {"message": "Connected to Supabase database", "level": "SUCCESS", "source": "Database", "topic_module": "Connection"},
            {"message": "Dashboard components loaded", "level": "INFO", "source": "UI", "topic_module": "Components"},
            {"message": "Real-time subscriptions active", "level": "INFO", "source": "Realtime", "topic_module": "Subscriptions"}
        ]
        for log in logs:
            insert_data('logs', log)
        print("  [OK] Added 4 logs")
    else:
        print("\n[SKIPPING] Logs already have data")
    
    # Update system status
    print("\n[UPDATING] System status...")
    url = f"{SUPABASE_URL}/rest/v1/system_status"
    response = requests.patch(url, headers=headers, json={
        "status": "Operational",
        "current_activity": "Command Center fully operational!",
        "active_tasks": 5,
        "active_projects": 4,
        "pending_ideas": 4,
        "updated_at": "2026-02-02T20:45:00Z"
    }, params={"id": "eq.1"})
    if response.status_code in [200, 204]:
        print("  [OK] System status updated")
    else:
        print(f"  [INFO] Status response: {response.status_code}")
    
    print("\n" + "=" * 60)
    print("DATA SETUP COMPLETE!")
    print("=" * 60)
    print("\nRefresh your dashboard to see the data:")
    print("  http://localhost:3000/mayai-command-center/")
    print("\nOr open the built version:")
    print("  file:///D:/Mayai/web/dist/index.html")

if __name__ == "__main__":
    main()
