import os

def validate_api_key_auth(event):
    api_key = os.environ.get("API_SECRET_KEY")
    if not api_key:
        raise ValueError("API_SECRET_KEY not configured")
    
    auth_header = event.get('http', {}).get('headers', {}).get("Authorization", "")
    
    if not auth_header:
        raise ValueError("Missing authorization header")
    
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    else:
        token = auth_header
    
    if token != api_key:
        raise ValueError("Invalid authorization token")
