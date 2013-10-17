#Any.tv Dashboard Project

Conversion of multiple services into AnyTV-native services

##Notes:

- It is highly advisable that you have a Linux-based development machine
- This documentation is created by @fskreuz which, at the time of creation, only had less than 24-hours of experience with Meteor and package development. If there are mistakes made, please file an issue to get it corrected.
- I think a Wiki should be made for this... soon.

##Quick start

	// Install meteor (may need root powers and password)
	curl https://install.meteor.com | /bin/sh

	// Install meteorite
	sudo -H npm install -g meteorite

	// Clone the repo
	git clone https://bitbucket.org/fskreuz/anytv-dashboard.git

	// Update the meteor used
	meteor update

	// Run meteor
	meteor

#Workflow

The typical fork-dev-pull will be used. A `stable`, `beta` and `dev` branch will be created soon.

- `stable` - The "clone, run and never be bothered by bugs" branch
- `beta` - The "10-3-3" branch, usable with bugs.
- `dev` - Will contain "hot-code", hot off the press. 

##Development

Development will be modular in the form of meteor packages (maybe including the API as well). Explore the sample `anytv-data-hasoffers` for the tentative implementation of packages.

The current sample includes:

- `smart.json` - Package information
- `package.js` - Package initializations
- `lib/` - directory for all implementations
- `tests/` - directory for all unit tests

There will be a skeleton package created soon, or a Yeoman generator if time permits its creation.

##Creating a package

The sample `anytv-data-hasoffers` should be self-explanatory and should cover the basics of package creation. You can explore more complex implementations and testing of packages with the built-in `iron-router` package.

Packages don't install themselves (compared to WordPress plugins). To make them recognized by your installation, do:

    meteor add PACKAGE_NAME

##Testing a package

The `tests` directory shall contain all client-server testing code. Subdirectories called `client` and `server` are in place for client-only and server-only tests respectively.

##Tips on package creation

- Make it as cross-platform as possible, meaning make it usable in both client and server.
- Sensitive algorithms and routines (like API calls with API keys) should be constrained only to the server. There should be a `Meteor.call` to call server-code from the client-side.

##Research

Meteor is highly undocumented. It is advisable that you clone the [Meteor Repository](https://github.com/meteor/meteor) and crawl over the code, especially the ones under the `packages` directory.