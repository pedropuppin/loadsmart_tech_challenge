# Loadsmart Tech Challenge

This project is a fleet management system that allows users to manage trucks, drivers, 
and assignments. It provides a REST API built with Django and Django REST Framework, 
and a React-based front end.

## Features

- Manage drivers and trucks.
- Assign drivers to trucks on specific dates.
- Enforce business rules, such as license compatibility and unique daily assignments.

## BackEnd Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/yourusername/loadsmart_tech_challenge.git

  # main folder
  cd loadsmart_tech_challenge
  ```

2. **Create a virtual environment and activate it:**

```python
  python -m venv venv
  
  # Bash (Linux/macOS)
  source venv/bin/activate

  # PowerShell (Windows)
  venv\Scripts\activate
```
  
3. **Install dependencies:**
```bash
  # Backend folder
  cd backend
  pip install -r requirements.txt
```
  
4. **Create a .env file in the backend folder:**
```ini
  # variables values
  DEBUG=True
  SECRET_KEY=your-secret-key
  ALLOWED_HOSTS=localhost,127.0.0.1
```
  
5. **Run migrations:**
```bash 
  # from the truck_management folder  
  python manage.py makemigrations
  python manage.py migrate
```

6. **Create a superuser:**
```bash 
  python manage.py createsuperuser
```

7. **Populate the DB with Sample Data:**
```bash 
  # from the truck_management folder.
  # You can tweek with the drivers and trucks values as you like
  python manage.py seed_db --drivers 20 --trucks 10
```

8. **Run the development server:**
```bash 
  python manage.py runserver
```

## FrontEnd Installation

