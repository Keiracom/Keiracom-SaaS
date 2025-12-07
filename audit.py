import os

# Define the critical paths that were marked 'DONE' in Phase III
critical_paths = [
    "src/utils/models.py",          # Task 3.5
    "src/engines/engine_03.py",     # Task 4.1
    "src/marketing/apollo_client.py", # Task 8.1 (Suspicious)
    "src/marketing/sales_flow.py",    # Task 8.2 (Suspicious)
    "src/api/main.py",                # Task 8.5
]

print(f"{'FILE PATH':<40} | {'STATUS':<10} | {'LINES':<10}")
print("-" * 65)

for file_path in critical_paths:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = len(f.readlines())
        status = "EXISTS"
        # If less than 20 lines, it's likely a shell/placeholder
        if lines < 20: 
            status = "SHELL?"
    else:
        status = "MISSING"
        lines = 0
    
    print(f"{file_path:<40} | {status:<10} | {lines:<10}")