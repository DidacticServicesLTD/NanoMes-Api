var schema = {
    "name": "Station", //stations
    "columns": {
        "uuid": {
            "primary": true,
            "type": "text",
            "generated": "uuid"
        },
        "name": {
            "type": "text"
        },
        "ip_address": {
            "type": "text"
        },
        "port": {
            "type": "text"
        },
        "status": {
            "type": "integer"
        },
        "description": {
            "type": "text"
        }
    },
    "relations": {
        "Operation": {
          "type": 'one-to-many',
          "target": 'Operation',
          "inverseSide": 'Station'
        },
      },
}

export { schema }