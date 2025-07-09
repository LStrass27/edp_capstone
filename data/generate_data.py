import pandas as pd
import numpy as np
import random
import os

# Job roles and locations
job_roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'HR Specialist', 'Sales Rep']
locations = ['New York', 'San Francisco', 'Austin', 'Chicago', 'Remote']

salary_base = {
    'Software Engineer': 110000,
    'Product Manager': 120000,
    'Data Scientist': 115000,
    'HR Specialist': 70000,
    'Sales Rep': 80000
}

location_adjustment = {
    'New York': 1.15,
    'San Francisco': 1.20,
    'Austin': 1.00,
    'Chicago': 1.05,
    'Remote': 0.95
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
        phone = f"{area}-{middle}-{last}"
        phones.add(phone)
    return list(phones)

# Generate 1000 employees
num_employees = 1000
employee_ids = generate_unique_ids(num_employees)
phone_numbers = generate_unique_phone_numbers(num_employees)

data = []
for i in range(num_employees):
    emp_id = employee_ids[i]
    phone = phone_numbers[i]
    role = random.choice(job_roles)
    loc = random.choice(locations)
    salary = generate_salary(role, loc)
    name = f"Employee_{i}"
    data.append([emp_id, name, phone, role, loc, salary])

df = pd.DataFrame(data, columns=["employee_id", "name", "phone_number", "job_role", "location", "salary"])

# Save to CSV in same folder as script
output_path = os.path.join(os.path.dirname(__file__), "employee_data.csv")
df.to_csv(output_path, index=False)

print(f"✅ Dummy employee data saved to: {output_path}")
