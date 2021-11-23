const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const token = core.getInput('token')
    const params = {
      package_type: 'container',
      package_name: core.getInput('packagename'),
      username: 'tomasz-galuszka'
    }
    console.log(JSON.stringify(params, null, 2))

    const octokit = github.getOctokit(token)
    const response = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser(params)

    console.log(response)
  } catch (error) {
    console.log('Error occurred')
    console.log(error.message)
  }
}
run()
