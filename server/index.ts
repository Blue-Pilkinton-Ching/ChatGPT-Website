import { httpServer } from './server' // Adjust the import to a named import
import 'dotenv/config'

const port = process.env.PORT || 3000

httpServer.listen(port, function () {
  console.log('Listening on port', port) // Removed eslint-disable-line for brevity
})
