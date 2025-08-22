# Django REST Backend for Pet Adoption App

## Features
- User registration, login (JWT), profile
- Pet CRUD, user pets, adoption requests, gallery
- Admin endpoints for adoption requests
- CORS enabled for React frontend
- SQLite database, media uploads

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

3. **Create superuser (for admin):**
   ```bash
   python manage.py createsuperuser
   ```

4. **Run development server:**
   ```bash
   python manage.py runserver
   ```

5. **Media files:**
   - Uploaded images are stored in `media/`.

## API Endpoints
- See `api/urls.py` for all endpoints.
- All `/api/` endpoints require JWT token except register/login/profile.
- Use `Authorization: Bearer <token>` header for protected routes.

## Testing with Postman
- Register: `POST /api/register/` { username, password, ... }
- Login: `POST /api/login/` { username, password } → returns `access` token
- Use token in `Authorization` header for all other requests
- Test file uploads with `multipart/form-data`
- Admin endpoints require superuser

## CORS
- CORS is enabled for all origins (see `settings.py`).

## Troubleshooting
- 401/403: Check token and permissions
- 404: Check endpoint path
- 500: Check request data format

## Example Dummy Data
- Use Django admin or API endpoints to create pets, gallery images, etc.