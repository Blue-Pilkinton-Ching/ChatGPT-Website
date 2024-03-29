import express from 'express'
import { createServer } from 'http'
import * as path from 'path'

const app = express()
const httpServer = createServer(app)

app.use(express.json())

// Uncomment if production

app.use(express.static(path.resolve('dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})

export { httpServer }
