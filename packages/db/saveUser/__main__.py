import os

from pymongo import MongoClient

def main():
    return { 
            "statusCode": 200,
            "body": {
                "ok": True
            }
        } 
    # uri = os.environ.get("DATABASE_URL")
    # client = MongoClient(uri)
    
    # try:
    #     db = client["app"]
    #     collection = db["users"]
    #     collection.insert_one({
    #         "name": "Alonzo"
    #     })
    #     return { 
    #         "statusCode": 200,
    #         "body": {
    #             "ok": True
    #         }
    #     }
    # except Exception as e:
    #     print(e)
    #     return {
    #         "body": { "error": "There was a problem adding the email address to the database." },
    #         "statusCode": 400
    #     }
    # finally:
    #     client.close()