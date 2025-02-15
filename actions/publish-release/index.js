const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  try {
    const version = core.getInput('version');

    // Publica a imagem
    exec('./gradlew publish', (error, stdout, stderr) => {
      if (error) {
        core.setFailed(`Publish failed: ${stderr}`);
      } else {
        core.info(stdout);

        // Cria o PR
        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
        octokit.rest.pulls.create({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          title: `Release ${version}`,
          head: github.context.ref,
          base: 'master',
          body: `Automated PR for release ${version}`,
        });
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();