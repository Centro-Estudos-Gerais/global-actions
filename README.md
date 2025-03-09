GitHub Actions Repository for the Organization

This repository centralizes the GitHub Actions files used by the organization to automate processes related to Quarkus (Java) projects. It contains actions to generate repositories, compile libraries, create Docker images, and manage project versions.

## Available Actions

### 1. `generate-repo`
This GitHub Actions workflow, called "Generate New Repository", is triggered manually via the `workflow_dispatch` event. It creates a new repository based on a specified template (either "app" or "lib") within the organization, updates the `artifactId` in the `gradle.properties` file, commits the changes, and provides a summary with the link to the new repository.


### 2. `publish-lib`
This workflow is triggered manually via `workflow_call`. It compiles the project, runs tests, and publishes the library. Additionally, it creates a Pull Request to merge the changes into the `master` branch.
```yaml
name: CI Pipeline
on:
  workflow_dispatch:
jobs:
  ci-pipeline:
    uses: Centro-Estudos-Gerais/global-actions/.github/workflows/publish-lib.yaml@master
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### 3. `create-release-branch`
This workflow is triggered manually via `workflow_call` and creates a new release branch based on the provided version. It validates the version format, checks if the branch already exists, creates the branch, and updates the version in the `gradle.properties` file.
#### Usage Example
```yaml
name: Create Release Branch
on:
  workflow_dispatch: 
    inputs:
      version:
        description: 'Semantic version number (e.g., 0.0.1)'
        required: true
        type: string
jobs:
  create-release-branch:
    uses: Centro-Estudos-Gerais/global-actions/.github/workflows/create-release-branch.yaml@master
    permissions:
      contents: write
    with:
      version: ${{ inputs.version }}
```

### 4. `create-release-tag`
This workflow is triggered manually via `workflow_call` and creates a new release tag based on the version specified in the `gradle.properties` file. It also generates a timestamp and adds a message to the tag.
#### Usage Example
```yaml
name: Create Release Tag
on:
    pull_request:
        types: [closed]
        branches: [master]        

jobs:
    create-release-tag:
        uses: Centro-Estudos-Gerais/global-actions/.github/workflows/create-release-tag.yaml@master
        permissions:
            contents: write
```

### 5. `publish-app`
This workflow is triggered manually via `workflow_call` and compiles the project, runs tests, generates a Docker image, and publishes it to the GitHub Container Registry. It can also tag the image as the latest version (`latest`) if specified.
#### Usage Example
```yaml
name: Publish App
on:
  workflow_dispatch:
    inputs:
      isLatestTag:
        description: 'Is this the last tag?'
        required: true
        type: boolean
        default: false
jobs:
    build-and-publish:
        uses: Centro-Estudos-Gerais/global-actions/.github/workflows/publish-app.yaml@master
        secrets:
            GH_TOKEN: ${{ secrets.GH_TOKEN }}
        with:
            isLatestTag: ${{ inputs.isLatestTag }}
```
