# Pet Adoption Platform

A full-stack Django + React application for pet adoption with user authentication, pet management, and adoption requests.

## Features

- **User Authentication**: JWT-based login/register system
- **Pet Management**: Add, view, update, and delete pets
- **Adoption System**: Request to adopt pets with status tracking
- **Image Upload**: Support for pet photos and gallery
- **Admin Dashboard**: Manage users, pets, and adoption requests
- **Responsive Design**: Mobile-friendly React frontend

## Tech Stack

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL (production) / SQLite (development)
- JWT Authentication
- WhiteNoise for static files

### Frontend
- React 18+
- Axios for API calls
- React Router for navigation
- CSS3 for styling

## Prerequisites

- Python 3.8+
- Node.js 14+
- Git (for deployment)
- PostgreSQL (for production)

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd pet-adoption-platform
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp ../.env.example .env
# Edit .env with your settings

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp ../.env.example .env.local
# Edit .env.local with your settings

# Start development server
npm start
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secure-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env.local)
```
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

## Deployment

This app is configured for deployment on Railway. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## API Endpoints

- `POST /api/token/` - Login
- `POST /api/register/` - User registration
- `GET /api/pets/` - List all pets
- `POST /api/pets/` - Add new pet
- `GET /api/pets/{id}/` - Get pet details
- `POST /api/adoption-requests/` - Create adoption request

## Project Structure

```
├── backend/           # Django backend
│   ├── api/          # Main app with models, views, serializers
│   ├── backend/      # Project settings
│   └── manage.py
├── frontend/         # React frontend
│   ├── src/
│   │   ├── api/      # API configuration
│   │   ├── components/ # React components
│   │   └── pages/    # Page components
└── deployment/       # Deployment configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


