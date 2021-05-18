import { _global } from './private/_global.mjs';

// node-modules
import { App } from '@tinyhttp/app'

import nodeCleanup from 'node-cleanup'
 


// custom modules
import {api as http_api_v1} from './private/routes/http_api_v1.mjs';
import {api as udp_api_v1} from './private/routes/udp_api_v1.mjs';

const app = new App()



app.get('/',  async (req, res) => {
  res.send(_global)
});

app.use('/api/v1',http_api_v1)
app.listen(1338, () => console.log(`HTTP is listening on : 1338`))


app.use(udp_api_v1)
udp_api_v1.on('listening', () => { console.log(`UDP is listening on : 1339` )})



nodeCleanup(function (exitCode, signal) {
  // release resources here before node exits
  console.log(" ")
  console.log("Closing!")
  console.log(" ")
  console.log("Closing UDP Server")
  console.log(" ")
  udp_api_v1.close()
  console.log(" ")
  console.log("Closing HTTP Server")
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log(" ")
  console.log("Goodbye")
  console.log(" ")

});