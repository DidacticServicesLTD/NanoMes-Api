// node-modules
import { _global } from '../../private/_global.mjs';
import { _helpers } from '../../private/_helpers.mjs';

// This is where TypeORM exists
import { _database } from '../../private/_database.mjs';

import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import { cookieParser } from '@tinyhttp/cookie-parser'
import { json } from 'milliparsec' // body parser

import { v4 as uuidv4 } from 'uuid';

import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
const jwt_secret = "#divorcedbeheadeddieddivorcedbeheadedsurvived"







// required to allow the update of status of MES plc's
// ping each ip address every 2.5 seconds, may be replaced with a TCP or UDP message

import ping from 'ping';

setInterval(async () => {

    var query = await _database._Stations.find()
    query.forEach(function(station){
        ping.sys.probe(station.ip_address, async function(isAlive){
            var msg = isAlive ? `station ${station.name} ${station.ip_address} is alive` : `station ${ station.name} ${station.ip_address} is dead`;
            // console.log(msg);
            let station_update = await _database._Stations.findOne({uuid : station.uuid})
            if(isAlive){
              station_update.status = 1;
            }else{
              station_update.status = 666;
            }
            let query = await _database._Stations.save(station_update);
        });
    });

}, 2500);










const api = new App()

api.use(json());  // body parser
api.use(cookieParser());  // cookie parser
api.use(cors({
  "origin": "*",
  "methods": ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  "allowedHeaders" :  ['Origin, X-Requested-With, Content-Type, Accept, Authorization'],
  "preflightContinue" : true
})) // cors

/**
 * Require all options requests with a non-zero string to kill pre-flight errors
 * @access *
 * @returns {text} 
 */
api.options('/*', (req, res ) => {
  res.send(null)
})















/**
 * /
 * send the _global cariable back
 * @type {get}
 * @access *
 * @returns {json} 
 */
api.get('/', (req, res) => {
  res.send(_global)
});2

/**
 * /hello/
 * Test response, replies with a string
 * @type {get}
 * @access *
 * @returns {text} 
 */
api.get('/hello/',  (req, res) => {
  res.send({name : 'Hello', message : `Hello (api), NanoMes`});
});

/**
 * /hello/:name
 * Test response, replies with a string, containing the name parameter
 * 
 * @type {get}
 * @access *
 * @param {string} name
 * @returns {text} 
 */
api.get('/hello/:name',  (req, res) => {
  res.send({name : 'Hello', message : `Hello, ${req.params.name}`});
});








































//   ____  _        _   _                 
//  / ___|| |_ __ _| |_(_) ___  _ __  ___ 
//  \___ \| __/ _` | __| |/ _ \| '_ \/ __|
//   ___) | || (_| | |_| | (_) | | | \__ \
//  |____/ \__\__,_|\__|_|\___/|_| |_|___/
                                       

/**
 * /stations
 * supplies a list of all Stations
 * @type {get}
 * @access read
 * @returns {text} 
 */
api.get('/stations', async (req, res) => {
  let query = await _database._Stations.find({relations: ['Operation']})
  res.send(query);
});





/**
 * /stations/:uuid
 * supplies a list of all Users
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
 api.get('/stations_ultra/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  // console.log(req.params.uuid)
  try{
    let query = await _database._Stations.findOne({ where : {uuid : req.params.uuid }, relations: ['Operation']})
    res.send(query);
    // res.send("A");
  }
  catch{
    res.send({})
  }
});







/**
 * /stations/:uuid
 * supplies a list of all Users
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
api.get('/stations/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  // console.log(req.params.uuid)
  try{
    let query = await _database._Stations.findOne({ where : {uuid : req.params.uuid }, relations: ['Operation']})
    res.send(query);
    // res.send("A");
  }
  catch{
    res.send({})
  }
});




/**
 * /stations
 * Add a new station, or update an existing one
 * @type {post}
 * @access read, write
 * @returns {json} 
 */
api.post('/stations', async (req, res) => {
  console.log("updating or creating station")
  if(!(req.body.name && req.body.ip_address && req.body.port && req.body.description)){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }

  var props = {
    name : req.body.name,
    ip_address : req.body.ip_address,
    port : req.body.port,
    description : req.body.description
  }
  
  if(req.body.hasOwnProperty('uuid')){
      props.uuid = req.body.uuid
  }
  await _database._Stations.save(props);
  res.send({name : "success", message : "succsessfully updated or created", data : props});
});



/**
 * /operations
 * Delete a specific operation
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/stations', async (req, res) => {
  console.log("Deleteing station")
  console.log(req.body)
  if(!req.body.uuid){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }
  console.log("DE:ETE : ")
  console.log(req.body.uuid)
  try{
    let query = await _database._Stations.delete(req.body.uuid);
    console.log(query)
    res.send({name : "success", message : "succsessfully deleted"});
  }catch{
    console.log("eeeeeee")
    res.send({name : "error", message : "error deleteding"});
  }

});


















//   ___                       _   _                 
//  / _ \ _ __   ___ _ __ __ _| |_(_) ___  _ __  ___ 
// | | | | '_ \ / _ \ '__/ _` | __| |/ _ \| '_ \/ __|
// | |_| | |_) |  __/ | | (_| | |_| | (_) | | | \__ \
//  \___/| .__/ \___|_|  \__,_|\__|_|\___/|_| |_|___/
//       |_|                                         


/**
 * /operations
 * supplies a list of all operations
 * @type {get}
 * @access read
 * @returns {text} 
 */
 api.get('/operations', async (req, res) => {
  let query = await _database._Operations.find()
  res.send(query);
});



/**
 * /stations/:uuid
 * supplies a list of all Users
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
api.get('/operations/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  console.log(req.params.uuid)
  try{
    let query = await _database._Operations.findOne({uuid : req.params.uuid})
    res.send(query);
  }
  catch{
    res.send({})
  }
});




/**
 * /operations
 * Add a new operation, or update an existing one
 * @type {post}
 * @access read, write
 * @returns {json} 
 */
api.post('/operations', async (req, res) => {
  console.log("updating or creating operation")
  if(!(req.body.name && req.body.stationUuid && req.body.description)){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }

  var props = {
    name : req.body.name,
    stationUuid : req.body.stationUuid,
    description : req.body.description,
    parameters : req.body.parameters
  }
  
  if(req.body.hasOwnProperty('uuid')){
      props.uuid = req.body.uuid
  }
  await _database._Operations.save(props);
  res.send({name : "success", message : "succsessfully updated or created", data : props});
});


/**
 * /operations
 * Delete a specific operation
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/operations', async (req, res) => {
  console.log("Deleteing operation")
  console.log(req.body)
  if(!req.body.uuid){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }
  let query = await _database._Operations.delete(req.body.uuid);
  res.send({name : "success", message : "succsessfully deleted"});
});





















//  ____                _            _       
// |  _ \ _ __ ___   __| |_   _  ___| |_ ___ 
// | |_) | '__/ _ \ / _` | | | |/ __| __/ __|
// |  __/| | | (_) | (_| | |_| | (__| |_\__ \
// |_|   |_|  \___/ \__,_|\__,_|\___|\__|___/
//  

/**
 * /products
 * supplies a list of all operations
 * @type {get}
 * @access read
 * @returns {text} 
 */
 api.get('/products', async (req, res) => {
  let query = await _database._Products.find()
  res.send(query);
});



/**
 * /products/:uuid
 * supplies a list of all Products
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
api.get('/products/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  console.log(req.params.uuid)
  try{
    let query = await _database._Products.findOne({uuid : req.params.uuid})
    res.send(query);
  }
  catch{
    res.send({})
  }
});




/**
 * /products
 * Add a new operation, or update an existing one
 * @type {post}
 * @access read, write
 * @returns {json} 
 */
api.post('/products', async (req, res) => {
   
  console.log("updating or creating operation")
  console.log(req.body)
  if(!(req.body.name && req.body.description)){
    res.send({name : "missingProperties", message : "One or more property not set"});
    console.log({name : "missingProperties", message : "One or more property not set"})
    return
  }


  if(!req.body.hasOwnProperty("sequence")){
    req.body.sequence = [];
  }

  if( req.body.sequence.length == 0){
    req.body.sequence = [{"station":"13e516d5-b496-4503-a55a-453d4daecfe5","operation":"371ff7e4-3b3b-4657-ba77-2bbd22b9ffc2","parameter":1}]
  }




  var props = {
    name : req.body.name,
    uuid : req.body.uuid,
    description : req.body.description,
    sequence : req.body.sequence
  }
  
  if(req.body.hasOwnProperty('uuid')){
      props.uuid = req.body.uuid
  }
  await _database._Products.save(props);
  res.send({name : "success", message : "succsessfully updated or created", data : props});
});


/**
 * /operations
 * Delete a specific operation
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/products', async (req, res) => {
  console.log("Deleteing operation")
  console.log(req.body)
  if(!req.body.uuid){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }
  let query = await _database._Products.delete(req.body.uuid);
  res.send({name : "success", message : "succsessfully deleted"});
});





















//   ___          _               
//  / _ \ _ __ __| | ___ _ __ ___ 
// | | | | '__/ _` |/ _ \ '__/ __|
// | |_| | | | (_| |  __/ |  \__ \
//  \___/|_|  \__,_|\___|_|  |___/
                              




/**
 * /orders
 * supplies a list of all operations
 * @type {get}
 * @access read
 * @returns {text} 
 */
 api.get('/orders', async (req, res) => {
  let query = await _database._Orders.find()
  res.send(query);
  // res.send("hello")
});



/**
 * /orders/:uuid
 * supplies a list of all Products
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
api.get('/orders/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  console.log(req.params.uuid)
  try{
    let query = await _database._Orders.findOne({uuid : req.params.uuid})
    res.send(query);
  }
  catch{
    res.send({})
  }
});



/**
 * /orders
 * Add a new order, or update an existing one
 * @type {post}
 * @access read, write
 * @returns {json} 
 */
api.post('/orders', async (req, res) => {
  console.log("updating or creating order")
  console.log(req.body)
  if(!(req.body.uuid)){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }


  // uuid might be new or update
  var _uuid = ""

  // if it doenst exist, create it
  if(!req.body.hasOwnProperty("product_instance")){
    console.log("This is a new order - generate the prodct")
    req.body.product_instance = await _database._Products.findOne({uuid : req.body.uuid})
    req.body.product_instance.sequence.forEach(step => {
      step.status = 0
      step.uuid = uuidv4()
    });

    // new uuid
    _uuid = uuidv4()
  }else{
    console.log("This is an update order")
    _uuid = req.body.uuid
  }

  // if it isnt specified, create it at 0
  if(!req.body.hasOwnProperty("status")){
    req.body.status = 0
  }



  console.log(_uuid)
  var props = {
    // uuid : _uuid,
    product_instance : req.body.product_instance,
    time : Date.now(),
    status : req.body.status
  }
  
  console.log(props)
  console.log("Saving")
  let result = await _database._Orders.save(props);
  console.log(result)
  console.log("Saved")
  res.send({name : "success", message : "succsessfully updated or created", data : props});
});






/**
 * /orders
 * Delete a specific order
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/orders', async (req, res) => {
  console.log("Deleteing order")
  console.log(req.body)
  if(!req.body.uuid){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }
  let query = await _database._Orders.delete(req.body.uuid);
  res.send({name : "success", message : "succsessfully deleted"});
});















// _                    
// | |    ___   __ _ ___ 
// | |   / _ \ / _` / __|
// | |__| (_) | (_| \__ \
// |_____\___/ \__, |___/
//             |___/     



/**
 * /logs
 * supplies a list of all operations
 * @type {get}
 * @access read
 * @returns {text} 
 */
 api.get('/logs', async (req, res) => {
  let query = await _database._Logs.find({relations: ['Station']})
  query = query.reverse()
  res.send(query);
  // res.send("hello")
});



/**
 * /orders/:uuid
 * supplies a list of all Products
 * @type {get}
 * @access read
 * @param {string} uuid The slug
 * @returns {json} 
 */
api.get('/logs/:uuid', async (req, res) => {
  // let find = req.params.templateRef.length > 20  ? {id : req.params.templateRef} : {slug : req.params.templateRef}
  console.log(req.params.uuid)
  try{
    let query = await _database._logs.findOne({uuid : req.params.uuid})
    res.send(query);
  }
  catch{
    res.send({})
  }
});




/**
 * /logs
 * Add a new operation, or update an existing one
 * @type {post}
 * @access read, write
 * @returns {json} 
 */
api.post('/logs', async (req, res) => {
  console.log("updating or creating order")
  console.log(req.body)
  if(!(req.body.uuid)){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }


  // var props = {
  //   product_instance : product,
  //   time : Date.now(),
  //   status : 0
  // }
  

  // await _database._Orders.save(props);
  // res.send({name : "success", message : "succsessfully updated or created", data : props});
  res.send({name : "missingCode", message : "Not written"});
});


/**
 * /logs
 * Delete a specific operation
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/logs_all', async (req, res) => {
  console.log("Deleting all logs")
  let query = await _database._Logs.delete(true);
  res.send({name : "success", message : "succsessfully deleted all logs"});
});



/**
 * /orders
 * Delete a specific order
 * @type {delete}
 * @access read, write
 * @returns {json} 
 */
 api.delete('/logs', async (req, res) => {
  console.log("Deleteing log")
  console.log(req.body)
  if(!req.body.uuid){
    res.send({name : "missingProperties", message : "One or more property not set"});
    return
  }
  let query = await _database._Logs.delete(req.body.uuid);
  res.send({name : "success", message : "succsessfully deleted"});
});









export { api }

