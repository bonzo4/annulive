import json

from util.parse import parse
from util.ask_ai import ask_ai
from util.auth import validate_api_key_auth

def main(event):
    try:
        
        validate_api_key_auth(event)
        
        skill, timeframe, resource_types = parse(event)
        
        response_content = ask_ai(skill, timeframe, resource_types)
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "ok": True,
                "content": response_content,
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    except ValueError as e:
        error_message = str(e)
        if "authorization" in error_message.lower() or "token" in error_message.lower():
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Unauthorized: ' + error_message}),
                'headers': {
                    "Content-Type": "application/json"
                }
            }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': str(e)}),
                'headers': {
                    "Content-Type": "application/json"
                }
            }
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Invalid JSON: {str(e)}'}),
            'headers': {
                "Content-Type": "application/json"
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Internal error: {str(e)}'}),
            'headers': {
                "Content-Type": "application/json"
            }
        }