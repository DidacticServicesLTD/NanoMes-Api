var schema = {
    "name": "Order", //Operation
    "columns": {
        "uuid": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "product_instance": {
            "type": "simple-json"
        },
        "time": {
            "type": "text"
        },
        "status": {
            "type": "text"
        },
        "rfid_id": {
            "type": "text"
        }
    },
    
    
}

export { schema }