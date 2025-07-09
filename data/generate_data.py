import pandas as pd
import numpy as np
import random
import os

# Roles in hierarchy
roles = {
    "CEO": 1,
    "CFO": 1,
    "COO": 1,
    "Vice President": 7,
    "Director": 30,
    "Manager": 100,
    "Software Engineer": 220,
    "Product Manager": 120,
    "Data Scientist": 120,
    "HR Specialist": 200,
    "Sales Rep": 200
}

locations = ["New York", "San Francisco", "Austin", "Chicago", "Remote"]

salary_base = {
    "CEO": 350000,
    "CFO": 300000,
    "COO": 300000,
    "Vice President": 220000,
    "Director": 160000,
    "Manager": 130000,
    "Software Engineer": 110000,
    "Product Manager": 120000,
    "Data Scientist": 115000,
    "HR Specialist": 70000,
    "Sales Rep": 80000
}

location_adjustment = {
    "New York": 1.15,
    "San Francisco": 1.20,
    "Austin": 1.00,
    "Chicago": 1.05,
    "Remote": 0.95
}

def generate_salary(role, loc):
    base = salary_base[role] * location_adjustment[loc]
    return round(np.random.normal(base, 10000), 2)

def generate_unique_ids(count, digits=5):
    return random.sample(range(10**(digits-1), 10**digits), count)

def generate_unique_phone_numbers(count):
    phones = set()
    while len(phones) < count:
        area = random.randint(200, 999)
        middle = random.randint(200, 999)
        last = random.randint(1000, 9999)
        phones.add(f"{area}-{middle}-{last}")
    return list(phones)

# Prepare base
total_employees = sum(roles.values())
employee_ids = generate_unique_ids(total_employees)
phone_numbers = generate_unique_phone_numbers(total_employees)

employees = []
id_role_map = {}
role_id_pool = {role: [] for role in roles}
id_index = 0

# Generate employees by role, in hierarchy order
for role in roles:
    count = roles[role]
    for _ in range(count):
        emp_id = employee_ids[id_index]
        phone = phone_numbers[id_index]
        name = f"Employee_{id_index}"
        location = random.choice(locations)
        salary = generate_salary(role, location)
        reports_to = None

        # Assign supervisor
        if role == "CFO" or role == "COO":
            reports_to = role_id_pool["CEO"][0]
        elif role == "Vice President":
            reports_to = random.choice(role_id_pool["CFO"] + role_id_pool["COO"])
        elif role == "Director":
            # Most to VP, a few to CFO/COO
            if random.random() < 0.85:
                reports_to = random.choice(role_id_pool["Vice President"])
            else:
                reports_to = random.choice(role_id_pool["CFO"] + role_id_pool["COO"])
        elif role == "Manager":
            reports_to = random.choice(role_id_pool["Director"])
        elif role in ["Software Engineer", "Product Manager", "Data Scientist", "HR Specialist", "Sales Rep"]:
            reports_to = random.choice(role_id_pool["Manager"])

        # Add to employee list
        employees.append([emp_id, name, phone, role, location, salary, reports_to])
        id_role_map[emp_id] = role
        role_id_pool[role].append(emp_id)
        id_index += 1

# Final DataFrame
columns = ["employee_id", "name", "phone_number", "job_role", "location", "salary", "reports_to"]
df = pd.DataFrame(employees, columns=columns)

# Save to data/ folder
output_path = os.path.join(os.path.dirname(__file__), "employee_data.csv")
df["reports_to"] = df["reports_to"].apply(lambda x: str(int(x)) if pd.notnull(x) else "")
df.to_csv(output_path, index=False)

print(f"✅ Org chart with 1000 employees saved to: {output_path}")
