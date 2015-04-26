#!/bin/bash
( cd dist
 git init
 git config user.name "skyfx-bot"
 git config user.email "chielkas+skyfx-bot@gmail.com"
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
