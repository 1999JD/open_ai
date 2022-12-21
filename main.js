const fs = require('fs')
const https = require('http')
const certificate = fs.readFileSync('./ssl/server.crt', 'utf8')
const privateKey = fs.readFileSync('./ssl/server.key', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('public'))
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(3000)

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY
});
const openai = new OpenAIApi(configuration);


app.post(`/test`, async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.question,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    })
    res.json(response.data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
