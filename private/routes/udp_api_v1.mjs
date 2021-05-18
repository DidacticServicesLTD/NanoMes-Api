// node-modules
import { _global } from '../../private/_global.mjs';
import { _helpers } from '../../private/_helpers.mjs';

// This is where TypeORM exists
import { _database } from '../../private/_database.mjs';

// import { App } from '@tinyhttp/app'
// import { cors } from '@tinyhttp/cors'
// import { cookieParser } from '@tinyhttp/cookie-parser'
// import { json } from 'milliparsec' // body parser

// import { v4 as uuidv4 } from 'uuid';

// import jwt from 'jsonwebtoken';
// const { sign, verify } = jwt;
// const jwt_secret = "#divorcedbeheadeddieddivorcedbeheadedsurvived"

import udp from 'dgram'






function hasAllProperties(obj, props) {
  for (var i = 0; i < props.length; i++) {
      if (!obj.hasOwnProperty(props[i]))
          return false;
  }
  return true;
}





  // --------------------creating a udp server --------------------

  // creating a udp server
  var api = udp.createSocket('udp4');

  // emits when any error occurs
  api.on('error',function(error){
    console.log('Error: ' + error);
    server.close();
  });

  // emits on new datagram msg
  api.on('message',async function(msg,info){
    console.log(`Data received from ${info.address, info.port} : ${msg.toString()}`);
    // console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

    // parses the incoming message, generates json.
    // message Format
    // #command=getInfo#station_uuid=13e516d5-b496-4503-a55a-453d4daecfe5

    let msg_str = msg.toString()
    msg_str = msg_str.replace(/\s/g, '');
    let msg_arr = msg_str.split('#');
    let msg_json = {}
    msg_arr.shift(); // delete the first unused arr caused by the preceding hash
    for (let index = 0; index < msg_arr.length; index++) {
      let temp =  msg_arr[index].split('=')
      msg_json[temp[0]] = temp[1]
      
    }

    console.log("=== UDP Command Recieved ==")
    console.log(msg_json)

    let response = ""


    // echos back the msg
    // requires : "msg"
    if (msg_json.command == "echo") {
      
      try{
        if(!hasAllProperties(msg_json,["msg"])){
          throw "missing properties"
        }

        response += `#error=false`
        response += `#msg=${msg_json.msg}`

      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }






//   ____  _        _   _                 
//  / ___|| |_ __ _| |_(_) ___  _ __  ___ 
//  \___ \| __/ _` | __| |/ _ \| '_ \/ __|
//   ___) | || (_| | |_| | (_) | | | \__ \
//  |____/ \__\__,_|\__|_|\___/|_| |_|___/

    // gets {limited} station information
    // requires : "station_uuid"
    if (msg_json.command == "getStationInfo") {
      try{

        if(!hasAllProperties(msg_json,["station_uuid"])){
          throw "missing properties"
        }

        let station = await _database._Stations.findOne({ where : {uuid : msg_json.station_uuid }, relations: ['Operation']})
        response += `#error=false`
        response += `#station_name=${station.name}#station_ipaddress=${station.ip_address}#station_status=${station.status}` 

      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }




//   ___          _               
//  / _ \ _ __ __| | ___ _ __ ___ 
// | | | | '__/ _` |/ _ \ '__/ __|
// | |_| | | | (_| |  __/ |  \__ \
//  \___/|_|  \__,_|\___|_|  |___/


    // sets rfid data
    // requires : "station_uuid"
    if (msg_json.command == "setRfidForOrder") {
      try{

        if(!hasAllProperties(msg_json,["order_uuid", "rfid_id"])){
          throw "missing properties"
        }

        let order = await _database._Orders.findOne({uuid : msg_json.order_uuid});
        order.rfid_id = msg_json.rfid_id
        await _database._Orders.save(order);
        response += `#error=false`

      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }




    // requires : "station_uuid"
    if (msg_json.command == "setOrderStepStatus") {
      try{

        if(!hasAllProperties(msg_json,["order_uuid", "step_number", "step_status"])){
          throw "missing properties"
        }

        let order = await _database._Orders.findOne({uuid : msg_json.order_uuid});
        order.product_instance.sequence[parseInt(msg_json.step_number)].status = msg_json.step_status
        await _database._Orders.save(order);
        response += `#error=false`

      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }



    // requires : "station_uuid"
    if (msg_json.command == "setOrderStatus") {
      try{


        if(!hasAllProperties(msg_json,["order_uuid", "order_status"])){
          throw "missing properties"
        }
    

        let order = await _database._Orders.findOne({uuid : msg_json.order_uuid});
        order.status = msg_json.order_status
        await _database._Orders.save(order);
        response += `#error=false`

      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }



    // gets a single new order, if the station ID matches the first station ID in the new order
    // this is used to poll on the distribution station
    // requires : "station_uuid"
    if (msg_json.command == "getFirstOrderForStation") {
      let orders = await _database._Orders.find()

      try{
        if( orders[0].product_instance.sequence[0].station == msg_json.station_uuid ){

                let step = orders[0].product_instance.sequence[0];
                //EG:  #station_name=Distribution#station_ipaddress=172.21.0.1#station_status=1
                response += "#error=false"
                response += `#order_uuid=${orders[0].uuid}#operation=${step.operation}#parameter=${step.parameter}` 
        }
      }catch(err){
        response += `#error=true`
        response += `#error_msg=${err}`
      }
    }



    // gets a {step} information
    // requires : "station_uuid"
    // requires : "rfid_uuid"

    if (msg_json.command == "getStepInfo") {
      // let station = await _database._Stations.findOne({ where : {uuid : msg_json.station_uuid }, relations: ['Operation']})

      //EG:  #step_qty=0
      //EG:  #step_qty=1#step_opperation_uuid=a8a85ee8-0532-41f9-bb4c-d4962e6408ce#step_opperation_property=1

      response = `#step_qty=0` 
      // response = query.name
    }




    // Append the time to all responses!
    response += `#time=${Date.now()}`;
    // response = response + `#a=b`;

    api.send(response ,'1340', info.address, function(error){
      if(error){
        client.close();
      }else{

        console.log('Data sent to :  '+ info.address + " : " + '1340' + " ---- " + response);
      }

    });
  });



  //emits after the socket is closed using socket.close();
  api.on('close',function(){
    console.log('Socket is closed !');
  });

  api.bind(1339);

export { api }