"""
Setup Supabase Database Directly
Uses Service Role Key to create tables and insert sample data
"""

import requests
import json

# Supabase configuration
SUPABASE_URL = "https://vfximbrvzkmcsupqbkgq.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGltYnJ2emttY3N1cHFia2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA2MDAyOSwiZXhwIjoyMDg1NjM2MDI5fQ.Mj4kq-SxU04-TX0QvcrXJF5vw0RGd83RsvYJlweXhEY"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def create_table(table_name, columns):
    """Create a table via Supabase REST API"""
    # Note: Supabase REST API doesn't support CREATE TABLE directly
    # We need to use the PostgreSQL connection or run SQL via the dashboard
    print(f"Table creation for {table_name} needs to be done via SQL Editor")
    return False

def insert_data(table_name, data):
    """Insert data into a table"""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}"
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f"[OK] Inserted data into {table_name}")
        return True
    else:
        print(f"[ERROR] Failed to insert into {table_name}: {response.status_code}")
        print(f"  Response: {response.text}")
        return False

def check_table_exists(table_name):
    """Check if a table exists by trying to query it"""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?limit=1"
    
    response = requests.get(url, headers=headers)
    
    return response.status_code == 200

def main():
    print("=" * 60)
    print("SUPABASE DATABASE SETUP")
    print("=" * 60)
    
    # Check which tables exist
    tables = ['tasks', 'projects', 'ideas', 'brain', 'logs', 'discussions', 'system_status']
    
    print("\nChecking existing tables...")
    existing = []
    missing = []
    
    for table in tables:
        if check_table_exists(table):
            existing.append(table)
            print(f"  [OK] {table} exists")
        else:
            missing.append(table)
            print(f"  [MISSING] {table} missing")
    
    if not missing:
        print("\n[OK] All tables already exist!")
        
        # Check if there's data
        print("\nChecking for sample data...")
        url = f"{SUPABASE_URL}/rest/v1/tasks?limit=1"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200 and response.json():
            print("  [OK] Sample data already present")
        else:
            print("  -> Tables exist but may be empty")
            
        return
    
    print(f"\n[MISSING] Missing tables: {', '.join(missing)}")
    print("\n[!] Tables need to be created via SQL Editor")
    print("\nPlease go to:")
    print("  https://app.supabase.com/project/vfximbrvzkmcsupqbkgq")
    print("\nAnd run the SQL from: D:\\Mayai\\web\\supabase_setup.sql")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
