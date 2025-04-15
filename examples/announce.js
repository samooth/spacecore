const Spacecore = require('../')
const Spaceswarm = require('../../spaceswarm')

const core = new Spacecore('./source')

start()

async function start () {
  await core.ready()
  while (core.length < 1000) {
    await core.append('block #' + core.length)
  }

  const swarm = new Spaceswarm()
  swarm.on('connection', socket => core.replicate(socket))
  swarm.join(core.discoveryKey, { server: true, client: false })

  console.log('Core:', core.key.toString('hex'))
}
