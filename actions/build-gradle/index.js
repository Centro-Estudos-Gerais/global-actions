const { exec } = require('child_process');
const core = require('@actions/core');

function run() {
  try {
    exec('./gradlew build -x test', (error, stdout, stderr) => {
      if (error) {
        core.setFailed(`Build failed: ${stderr}`);
      } else {
        core.info(stdout);
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();