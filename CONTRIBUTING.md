# Contributing

Thanks for being willing to contribute!

Some basic house-keeping for contributions please: 
* Fork and review 
* Commitizen commit messages 
* Squash merge PRs to master


## Project setup

1. Fork and clone the repo
2. `$ yarn install` to install dependencies
3. `$ yarn start` to boot up the dev environment
4. Create a branch for your PR
5. Create a Pull Request to upstream/master when you're ready to merge 


## How to set up your upstream fork 

Get the pattern: 
`git remote -v`

1. `git remote set upstream git@git...`

Check it: 
`git remote -v`


## How to update Master on your fork

1. `git checkout master`
2. `git fetch upstream` 
3. `git pull upstream master`


## How to rebase your branch on your fork with upstream/master
 
1. Do "How to update Master on your fork"
2. `git checkout feat/my-branch`
3. `git rebase upstream/master`
