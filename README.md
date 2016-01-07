# SPC-WEB-CLIENT - Client for Security-Privacy-Component (SPC) Server

This project is an application based on [AngularJS](http://angularjs.org/) web app and build
on a preconfigured angular project [angular-seed — the seed for AngularJS](https://github.com/angular/angular-seed)
The Client only works together with the [SPC-Server](https://github.com/tobistw/spc-server).

The Client contains a web frontend login-screen and protected resources. The login-screen provides different login
strategies like login with Google or LDAP.
Once you setup the configuration a user is able to login with a second factor (TOTP - Google Authenticator).
The Client handles and stores Access Tokens provided by the SPC-Server and processes public and private information for the Client.
Therefore the Client has to be registered in the SPC Database with its API Key.

You can use this project to quickly bootstrap your webapp projects with login strategies.


## Getting Started

To get you started you can simply clone the SPC-WEB-CLIENT repository and install the dependencies:

### Prerequisites

You need git to clone the SPC-WEB-CLIENT repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

There are also a number of node.js tools to initialize and test SPC-WEB-CLIENT. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).
The Build Framework Grunt is optional but manages the also the initialization and testing of the app.
```
npm install -g grunt-cli
```

### Clone spc-web-client

Clone the spc-web-client repository using [git][git]:

```
git clone https://github.com/tobistw/spc-web-client.git
cd spc-web-client
```

If you just want to start a new project without the spc-web-client commit history then you can do:

```bash
git clone --depth=1 https://github.com/tobistw/spc-web-client.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

There are two kinds of dependencies in this project: tools and angular framework code.  The tools helps
you to manage and test the application.

* You get the tools via `npm`, the [node package manager][npm].
* You get the angular code via `bower`, a [client-side code package manager][bower].

```
npm install
bower install
```

* `node_modules` - contains the npm packages for the tools
* `client/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
spc-web-client changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Configuring for SPC-SERVER and SPC-WEB-CLIENT

* setup the client on the server with its API Key and the project Id.
* edit the client/app/app.js file constants, example:

```
app.constant("spcServerUrl", "http://localhost:9000");
app.constant("apiKey", "secret-api-key");
app.constant("projectId", "001");
```

### Run the Application

The simplest way to start:
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8080`.

or use Grunt:

```
grunt serve
```


## Testing

There are two kinds of tests in the spc-web-client application: Unit tests and End to End tests.

### Running Unit Tests

The spc-web-client app comes preconfigured with unit tests. Note that these test are just a template for more testing and does
not cover the testing of the whole application. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. There is a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `... .specs.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

or for Grunt:

```
grunt test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The spc-web-client app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `test/protractor.conf.js`
* the end-to-end tests are found in `test/e2e/scenarios.js`

Note: the end-to-end test doesn't work yet and have to be implemented.

Protractor simulates interaction with our web app and verifies that the application responds
correctly.

In addition, since Protractor is built upon WebDriver you need to install this.  The spc-web-client
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using grunt:

```
grunt test
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating SPC-WEB-CLIENT

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.


### Running the App during Development

The spc-web-client project comes preconfigured with a local development webserver.  It is a node.js server.
You can start this webserver with `npm start` or:

```
grunt serve
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `client/` directory.


### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `client/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere they can be accessed by browsers.

Note, if the client and server runs on different domains to enable cross domain requests.


## Contact

Use the SPC-Server https://github.com/tobistw/spc-server

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[grunt]: http://gruntjs.com/
