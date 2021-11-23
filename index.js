const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  const token = core.getInput('token')
  const packagename = core.getInput('packagename')
  const octokit = github.getOctokit(token)

  const response = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
    package_type: 'container',
    package_name: packagename
  })

  console.log(response)
}
run()
