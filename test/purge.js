const test = require('brittle')
const tmp = require('test-tmp')
const fs = require('fs')
const Path = require('path')

const Spacecore = require('..')

test('basic purge', async function (t) {
  const dir = await tmp(t)
  const core = new Spacecore(dir)
  await core.append(['a', 'b', 'c'])

  const oplogLoc = Path.join(dir, 'oplog')
  const treeLoc = Path.join(dir, 'tree')
  const bitfieldLoc = Path.join(dir, 'bitfield')
  const dataLoc = Path.join(dir, 'data')

  t.is(fs.existsSync(oplogLoc), true)
  t.is(fs.existsSync(treeLoc), true)
  t.is(fs.existsSync(bitfieldLoc), true)
  t.is(fs.existsSync(dataLoc), true)
  t.is(fs.readdirSync(dir).length, 4) // Sanity check

  await core.purge()

  t.is(core.closed, true)
  t.is(fs.existsSync(oplogLoc), false)
  t.is(fs.existsSync(treeLoc), false)
  t.is(fs.existsSync(bitfieldLoc), false)
  t.is(fs.existsSync(dataLoc), false)
  t.is(fs.readdirSync(dir).length, 0) // Nothing remains
})

test('purge closes all sessions', async function (t) {
  const dir = await tmp(t)
  const core = new Spacecore(dir)
  await core.append(['a', 'b', 'c'])
  const otherSession = core.session()
  await otherSession.ready()

  await core.purge()

  t.is(core.closed, true)
  t.is(otherSession.closed, true)
})
