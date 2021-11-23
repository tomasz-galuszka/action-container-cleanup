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
      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    const containerListForRemoval = containersSortedList.filter((container) => {
      const tags = container.metadata.container.tags
      let isNotImportant = false
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        if (tag.includes('feature') || tag.includes('release')) {
          isNotImportant = true
          break
        }
      }
      return tags.length > 0 && isNotImportant
    })

    console.log(`All containers size: ${containersSortedList.length}`)
    console.log(`Containers to remove size: ${containerListForRemoval.length}`)

    containerListForRemoval.forEach(async (container) => {
      await octokit.rest.packages.deletePackageVersionForUser({
        package_type: 'container',
        package_name: core.getInput('packagename'),
        username: 'tomasz-galuszka',
        package_version_id: container.id
      })
      console.log(`Deleted ${core.getInput('packagename')} with id: ${container.id}, tags ${container.metadata.container.tags}`)
    })
  } catch (error) {
    console.log('Error occurred')
    console.log(error.message)
  }
}
run()
