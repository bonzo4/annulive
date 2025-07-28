import os

def validate_api_key_auth(event):
    api_key = os.environ.get("SERVICE_SECRET")
    if not api_key:
        raise ValueError("SERVICE_SECRET not configured")
    
    auth_header = event.get('http', {}).get('headers', {}).get("authorization", "")
    
    if not auth_header:
        raise ValueError("Missing authorization header")
    
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    else:
        token = auth_header
    
    if token != api_key:
        raise ValueError("Invalid authorization token")
