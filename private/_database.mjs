import * as typeorm from "typeorm";

// load our schemas
import { schema as entity__User } from "../private/entity/User.mjs";
import { schema as entity__Station } from "../private/entity/Station.mjs";
import { schema as entity__Operation } from "../private/entity/Operation.mjs";
import { schema as entity__Product } from "../private/entity/Product.mjs";
import { schema as entity__Order } from "../private/entity/Order.mjs";
import { schema as entity__Log } from "../private/entity/Log.mjs";


// make the database connection
var dbOptions = {
  type: "sqlite",
  database: `nanomes_db.db`,
  entities: [
      new typeorm.EntitySchema(entity__User),
      new typeorm.EntitySchema(entity__Station),
      new typeorm.EntitySchema(entity__Operation),
      new typeorm.EntitySchema(entity__Product),
      new typeorm.EntitySchema(entity__Order),
      new typeorm.EntitySchema(entity__Log),
  ],
  // logging: true
}

// configure the _database object
var _database = {}
const db = await typeorm.createConnection(dbOptions)

_database._Users = db.getRepository("User");
_database._Stations = db.getRepository("Station");
_database._Operations = db.getRepository("Operation");
_database._Products = db.getRepository("Product");
_database._Orders = db.getRepository("Order");
_database._Logs = db.getRepository("Log");


export { _database }