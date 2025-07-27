import json

def parse_event(event, expected_fields=None, validation_rules=None):
    """
    Universal event parser for all services.
    
    Args:
        event: The event to parse (string or dict)
        expected_fields: List of required field names in the body
        validation_rules: Dict of field_name -> validation_function pairs
    
    Returns:
        Parsed data based on the expected fields
    """
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
        
        if not expected_fields:
            return body
        
        result = {}
        for field in expected_fields:
            if field not in body:
                raise ValueError(f'{field} is required')
            
            field_data = body[field]
            
            if isinstance(field_data, str):
                try:
                    field_data = json.loads(field_data)
                except json.JSONDecodeError:
                    pass
            
            result[field] = field_data
        
        if validation_rules:
            for field, validator in validation_rules.items():
                if field in result:
                    result[field] = validator(result[field])
        
        if len(expected_fields) == 1:
            return result[expected_fields[0]]
        else:
            return tuple(result[field] for field in expected_fields)
        
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Invalid JSON in event: {str(e)}", e.doc, e.pos)
