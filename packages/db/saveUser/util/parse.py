import json

def parse(event):
    try:
        if isinstance(event, str):
            body = json.loads(event)
        elif isinstance(event, dict) and 'body' in event:
            body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        elif isinstance(event, dict):
            body = event
        else:
            raise ValueError(f"Invalid event format: expected string or dict, got {type(event)}")
        
        if not isinstance(body, dict):
            raise ValueError("Event body must be a JSON object")
        
        user_data = body.get('userData')
        if not user_data:
            raise ValueError('userData is required')
        
        if isinstance(user_data, str):
            user_data = json.loads(user_data)
        
        if not isinstance(user_data, dict):
            raise ValueError("userData must be a JSON object")
        
        if 'id' not in user_data:
            raise ValueError('User ID is required')
        
        return user_data
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)
