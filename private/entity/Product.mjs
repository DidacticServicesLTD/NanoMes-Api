var schema = {
    "name": "Product", //user
    "columns": {
        "uuid": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "name": {
            "type": "text"
        },
        "description": {
            "type": "text"
        },
        "sequence": {
            "type": "simple-json"
        }
    }
}

export { schema }