const Spacecore = require('../')
const Spaceswarm = require('../../spaceswarm')

const core = new Spacecore('./clone', process.argv[2])

start()

async function start () {
  await core.ready()

  const swarm = new Spaceswarm()
  swarm.on('connection', socket => core.replicate(socket))
  swarm.join(core.discoveryKey, { server: false, client: true })

  console.log((await core.get(42)).toString())
  console.log((await core.get(142)).toString())
  console.log((await core.get(511)).toString())
  console.log((await core.get(512)).toString())
  console.log((await core.get(513)).toString())
}
