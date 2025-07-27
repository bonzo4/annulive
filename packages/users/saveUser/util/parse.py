import sys
import os

from packages.shared.util.parse import parse_event
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'shared'))

def validate_user_data(user_data):
    """Validation function for user data"""
    if not isinstance(user_data, dict):
        raise ValueError("userData must be a JSON object")
    
    if 'id' not in user_data:
        raise ValueError('User ID is required')
    
    picture = user_data.get('picture', '')
    if not picture or picture.startswith('https://s.gravatar.com'):
        user_data['picture'] = 'https://annulive-content.tor1.cdn.digitaloceanspaces.com/app-images/annulive-logo.png'
    
    return user_data

def parse_user_event(event):
    """Parse event for user service"""
    return parse_event(
        event, 
        expected_fields=['userData'],
        validation_rules={'userData': validate_user_data}
    )
