const core = require('@actions/core');
const fs = require('fs');

function run() {
  try {
    const gradleProperties = fs.readFileSync('gradle.properties', 'utf8');
    const version = gradleProperties.match(/version=(.*)/)[1];
    core.setOutput('version', version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();