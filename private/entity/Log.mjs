var schema = {
    "name": "Log", //Log
    "columns": {
        "uuid": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "stationUuid": { //relational
            "type": "text"
        },
        "msg": { 
            "type": "simple-json"
        },
        "time": { 
            "type": "text"
        },
        "status": { 
            "type": "text"
        },
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