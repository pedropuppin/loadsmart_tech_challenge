# Loadsmart Tech Challenge

This project is a fleet management system that allows users to manage trucks, drivers, and assignments. It provides a 
REST API built with Django and Django REST Framework, and a React-based front end.

## Features

- Manage drivers and trucks.
- Assign drivers to trucks on specific dates.
- Enforce business rules, such as license compatibility and unique daily assignments.

## Installation

1. **Clone the repository:**

  git clone https://github.com/yourusername/loadsmart_tech_challenge.git
  cd loadsmart_tech_challenge
   
2. **Create a virtual environment and activate it:**
  python -m venv venv
  source venv/bin/activate
  
3. **Install dependencies:**
  pip install -r requirements.txt
  
4. **Create a .env file in the project root:**
  DEBUG=True
  SECRET_KEY=your-secret-key
  ALLOWED_HOSTS=localhost,127.0.0.1
  
5. **Run migrations:**
  python manage.py makemigrations
  python manage.py migrate
  
6. **Run the development server:**
  python manage.py runserver

  