// Parameters 
let _global = {
  site : {
    title : "Boleyn_api",
    tagline : "The Headless CMS API",
    version : 0.1,
    docs : 'http://boleyn.io/docs'
  },
  author : {
    name : "Calum Knott",
    first_name : "Calum",
    last_name : "Knott",
    email : "calum@calumk.com"
  }
};


// node-modules
import { App } from '@tinyhttp/app'

// custom modules
import {routes as routes_api_v1} from './private/routes/api_v1.mjs';

const app = new App()

app.get('/',  async (req, res) => {
  res.send(_global)
});

w


app.use('/api/v1',routes_api_v1)

app.listen(1338, () => console.log(`Listening on http://localhost:1338`))