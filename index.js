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
    const containersSortedList = response.data.sort((a, b) => {
      return new Date(a.updated_at) - new Date(b.updated_at)
    })
    containersSortedList.splice(0, 2)
    console.log(containersSortedList)

    containersSortedList.forEach(async (container) => {
      const response = await octokit.rest.packages.deletePackageVersionForUser({
        package_type: 'container',
        package_name: core.getInput('packagename'),
        username: 'tomasz-galuszka',
        package_version_id: container.id
      })
      console.log(container)
      console.log(response)
    })
  } catch (error) {
    console.log('Error occurred')
    console.log(error.message)
  }
}
run()
