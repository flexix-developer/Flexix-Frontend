pipeline:
  agent:
    any

  environment:
    PATH: "$PATH:/path/to/node/bin"

  stages:
    - stage: Checkout
      steps:
        - checkout

    - stage: Build
      steps:
        - script:
            npm install
            npm run build

    - stage: Run
      steps:
        - script:
            npm start
