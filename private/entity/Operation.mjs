var schema = {
    "name": "Operation", //Operation
    "columns": {
        "uuid": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "name": {
            "type": "text"
        },
        "parameters": {
            "type": "simple-json" // an array of options
        },
        "description": {
            "type": "text"
        },
        "stationUuid": { //relational
            "type": "text"
        }
    },
    "relations": {
      "Station": {
        "type": 'many-to-one',
        "target": 'Station',
        "joinColumn": true,
      },
    },
    
}

export { schema }