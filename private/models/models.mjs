// model
import { connect } from 'trilogy'
const db = connect('./boleyn_db.db')


const users = await db.model('users', {
    id: 'increments',
    name: String,           
    email: String,
    pin : String
})

const boelyn_schemas = await db.model('boelyn_schemas', {
    id: 'increments',
    slug: String,
    name: String,  
    description: String,
    json_schema : 'json'
})

const test_schemas = await db.model('test_schemas', {
    id: 'increments',
    slug: String,
    name: String,  
    description: String,
    json_schema : 'json'
})

export {users, boelyn_schemas, test_schemas}