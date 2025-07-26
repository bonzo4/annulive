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
            raise ValueError("Request body must be a JSON object")
        
        user_id = body.get("user_id")
        name = body.get("name")
        picture = body.get("picture")
        
        if not user_id:
            raise ValueError('User ID is required')
        
        if not name and not picture:
            raise ValueError('At least one field (name or picture) must be provided for update')
        
        update_data = {}
        if name:
            update_data['name'] = name
        if picture:
            update_data['picture'] = picture
        
        return {
            'user_id': user_id,
            'update_data': update_data
        }
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)
