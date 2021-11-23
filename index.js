const core = require('@actions/core')
const github = require('@actions/github')

try {
  const nameToGreet = core.getInput('name')
  const time = new Date().toTimeString()
  const eventPayload = JSON.stringify(github.context.payload, undefined, 2)

  core.setOutput('time', time)
  console.log(`Hello ${nameToGreet}`)
  console.log(`The event payload: ${eventPayload}`)
} catch (error) {
  console.setFailed(error.message)
}
