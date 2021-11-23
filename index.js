const core = require('@actions/core')
const github = require('@actions/github')

try {
  const token = core.getInput('token')
  const username = core.getInput('username')
  const packagename = core.getInput('packagename')

  const octokit = github.getOctokit(token)

  const response = await octokit.request('GET /users/{username}/packages/{package_type}/{package_name}/versions', {
    package_type: 'container',
    package_name: packagename,
    username: username
  })

  console.log(response)
} catch (error) {
  console.setFailed(error.message)
}
