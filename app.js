/** @format */

const fastify = require('fastify')()
const config = require('config')

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: `mongodb://${config.mongo.server}/${config.mongo.db}`,
})

const { ObjectId } = require('fastify-mongodb')

fastify.get('/find/:id', function (req, reply) {
  const coll = this.mongo.db.collection(config.mongo.collection)

  console.log(`looking for ${req.params.id}`)

  coll.findOne({ _id: new ObjectId(req.params.id) }, (err, record) => {
    if (err) {
      reply.send(err)
      return
    }
    reply.send(record)
  })
})

fastify.get('/latest', async function (req, reply) {
  const coll = this.mongo.db.collection(config.mongo.collection)

  let records = await coll.find({}, { sort: { _id: -1 }, limit: 1 })
  let lastRecord
  await records.forEach((x) => {
    lastRecord = x
  })
  reply.send(lastRecord)
})

fastify.post('/update', async function (req, reply) {
  const coll = this.mongo.db.collection(config.mongo.collection)
  coll.insertOne(req.body[0], (err, res) => {
    if (err) {
      console.error(err)
      reply.send(err)
      return
    }
    reply.send({ insertedId: res.insertedId })
  })
})

fastify.listen(config.server.port, config.server.ip, (err) => {
  if (err) throw err
  console.log(`Server started on port ${config.server.port}`)
})
