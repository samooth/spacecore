const Spacecore = require('../')

start()

async function start () {
  const core = new Spacecore('/tmp/basic')
  await core.append(['Hello', 'World'])
  console.log(core)
  await core.close()
}
