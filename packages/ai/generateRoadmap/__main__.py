import json

from util.parse import parse
from util.ask_ai import ask_ai

def main(event):
    try:
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
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Invalid JSON: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Internal error: {str(e)}'})
        }