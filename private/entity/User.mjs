var schema = {
    "name": "User", //user
    "columns": {
        "id": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "name": {
            "type": "text"
        },
        "email": {
            "type": "text"
        },
        "pin": {
            "type": "text"
        },
        "requests": {
            "type": "simple-json"
        }
    }
}

export { schema }