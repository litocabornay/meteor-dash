#Any.tv Dashboard Project

Conversion of multiple third-party services into AnyTV-native services

##Notes:

- It is highly advisable that you have a Linux-based development machine
- If there are mistakes made in this README, please file an issue to get it corrected.
- I think a Wiki should be made for this... soon.

##Quick start

	// Install ze Meteor
	curl https://install.meteor.com | /bin/sh

	// Install ze Meteorite
	sudo -H npm install -g meteorite

	// Clone ze Repo
	git clone https://bitbucket.org/fskreuz/anytv-dashboard.git

	// Update ze Meteor
	meteor update

	// Update ze Packages
	mrt install

	// Run ze Meteor
	meteor

	// Wait for the end of the world!!!

##Workflow

The typical fork-dev-pull will be followed. 

That is: 

- Fork the project to your account. 
- Implement your modules on your forl and commit. 
- Then do a pull request to the main repo and wait for further instructions.

##Branches

- `stable` - The "clone, run and never be bothered by bugs" branch
- `beta` - The "10-3-3" branch, usable with bugs.
- `dev` - Will contain "hot-code", hot off the press. 

##Development

System development will be modular in the form of meteor packages to easily manage dependencies and code visibility (client, server, client-server). If you are already familiar of how to use [CommonJS modules (like NodeJS)](http://nodejs.org/api/modules.html) or [AMD modules (like RequireJS)](http://requirejs.org/), then it should be somewhat similar. If not, try to familiarize yourself with these similar concepts. Also, explore the existing `anytv-*` packages for samples.

A package will include the following basic contents:

- `smart.json` - Package information
- `package.js` - Package initializations
- `lib/` - directory for all package code
- `tests/` - directory for all TinyTest unit tests

To add a package to the installation, do:

    meteor add PACKAGE_NAME

Don't forget to commit the `.meteor` directory so that package dependencies get reflected on the app.

##Testing a package

The `tests` directory shall contain all client-server testing code. Subdirectories called `client` and `server` are in place for client-only and server-only tests respectively. Tests use the [`TinyTest`](https://www.eventedmind.com/posts/meteor-testing-packages-with-tinytest) package that comes with Meteor. You can explore the test runner's code by cloning [Meteor](https://github.com/meteor/meteor) and checking the `packages/tinytest` package.

##Tips on package creation

- Sensitive algorithms and routines (like API calls with API keys) should be constrained only to the server. There should be a `Meteor.call` to call server-code from the client-side.

##Research

Meteor is highly undocumented. It is advisable that you clone the [Meteor Repository](https://github.com/meteor/meteor) and crawl over the code, especially the ones under the `packages` directory. Meteor also recommends [these resources](http://docs.meteor.com/#resources) as references for creating Meteor apps.