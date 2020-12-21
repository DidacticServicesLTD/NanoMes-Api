// node-modules
import { App } from '@tinyhttp/app'
import { urlencoded } from 'milliparsec'

// models
import { users as db_users } from '../models/models.mjs';

import { boelyn_schemas as db_boelyn_schemas} from '../models/models.mjs';

import {test_schemas as db_test_schemas} from '../models/models.mjs';


const routes = new App()
routes.use(urlencoded())


//
// Users
//

// Generic base response
routes.get('/users',  async (req, res) => {
  var response = await db_users.find()
  res.send(response)
});

// Get - returns single user, based on ID, or emal if NAN
routes.get('/users/:param',  async (req, res) => {
  var response;
  if (!isNaN(req.params.param)){
    response = await db_users.findOne({id : req.params.param})
  }else{
    response = await db_users.findOne({name : req.params.param})
  }
  res.send(response)
});

// Post
// NA


// Schema
routes.get('/schemas',  async (req, res) => {
  console.log("Running!")
  var response = await db_boelyn_schemas.find()
  res.send(response)
});

// Get - Returns the schema based on ID
routes.get('/schemas/:id',  async (req, res) => {
  console.log("Running!")
  var response = await db_boelyn_schemas.find({id:req.params.id})
  res.send(response)
});

// Post - updateOrCreates based on the Schema
routes.post('/schemas/:slug', async (req, res) => {

  var rowsAffected = await db_boelyn_schemas.updateOrCreate(
    { slug: req.params.slug },
    { 
      name : req.body.name,
      description : req.body.description,
      json_schema : JSON.parse(req.body.json_schema)
     }
  )
  res.send('createdOrUpdated ' + rowsAffected )
});

// Post - updateOrCreates based on the Schema
routes.delete('/schemas/:slug', async (req, res) => {

  var rowsAffected = await db_boelyn_schemas.remove(
    { slug: req.params.slug }
  )
  res.send('deleted ' + req.params.slug )
});




// Schema
routes.get('/schemas',  async (req, res) => {
  console.log("Running!")
  var response = await db_test_schemas.find()
  res.send(response)
});

// Get - Returns the schema based on ID
routes.get('/schemas/:id',  async (req, res) => {
  console.log("Running!")
  var response = await db_test_schemas.find({id:req.params.id})
  res.send(response)
});

// Post - updateOrCreates based on the Schema
routes.post('/schemas/:slug', async (req, res) => {

  var rowsAffected = await db_test_schemas.updateOrCreate(
    { slug: req.params.slug },
    { 
      name : req.body.name,
      description : req.body.description,
      json_schema : JSON.parse(req.body.json_schema)
     }
  )
  res.send('createdOrUpdated ' + rowsAffected )
});

// Post - updateOrCreates based on the Schema
routes.delete('/schemas/:slug', async (req, res) => {

  var rowsAffected = await db_test_schemas.remove(
    { slug: req.params.slug }
  )
  res.send('deleted ' + req.params.slug )
});




























routes.get('/test',  async (req, res) => {
  var response = await db_boelyn_schemas.get('json_schema', {name : 'D'})
  res.send(response)
});






routes.get('/posts',  async (req, res) => {
  var response = await db_posts.find()
  res.send(response)
});

routes.get('/posts/make',  async (req, res) => {

  var response = await db_posts.create({
    title : "This is cool",
    post : "Yes it is!",
    author : 12
  })
  res.send('done')
});





export { routes };
