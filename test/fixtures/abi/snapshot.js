// Generate an ABI snapshot for the current version of Spacecore.

const path = require('path')
const crypto = require('spacecore-crypto')
const b4a = require('b4a')
const Spacecore = require('../../../')

const { version } = require('../../../package.json')

const core = new Spacecore(path.join(__dirname, `v${version}`), {
  keyPair: crypto.keyPair() // Use an ephemeral key pair
})

core.ready().then(
  async () => {
    for (let i = 0; i < 1000; i++) {
      await core.append(b4a.from([i]))
    }
  },
  (err) => {
    console.error(err)
    process.exit(1)
  }
)
