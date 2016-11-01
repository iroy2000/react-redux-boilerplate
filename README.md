### Preface

While React Redux Boilerplate is a ready to use workflow boilerplate for frontend client development ( we welcomed pull request, please ),  __we are also using that for our recruiting purpose__. 

The technologies in this workflow boilerplate shows case a `subset of technologies` we are currently using within our team, and we are trying to give our candidates confidence that by working with us, they will be using decent technologies as well as stay relevant to the industry.  And that is what our team strongly believed in - __technology innovation and promoting developers' relevancy in the industry__.  

If you are interested in working with us, feel free to send a message to [iroy2000](https://www.linkedin.com/in/iroy2000).

__Note:__ This boilerplate is not to show case how to develop in React / Redux, it is a boilerplate that hook everything up for you that you can develop on, so you won't see complicated example here. 

---

# React Redux Boilerplate

`React Redux Boilerplate` is a workflow boilerplate that make life easier for developers by providing a virtual development environment and production ready build process framework out of the box.

`React Redux Boilerplate` is for developing client side application. So,  if you are looking for: 

* `Isomorphic (Universal) support`, feel free to add server side support to it, or you can use something like [react-server](https://github.com/redfin/react-server) or [electrode](http://www.electrode.io/)



### Features / Benefits

* React
* Redux
* Webpack
* Reselect
* ES6 
* ImmutableJS
* PostCSS ( it support CSS modules, but we also recommended B.E.M style )
* ESLint integrated
* Integrated with fancy cli dashboard
* Hot Module Reload during development
* CSS / HTML / JS minification / Image optimization when built
* JS code duplication removal during built
* Built-in process to deploy files directly to S3 ( optional )
* Built-in lightweight config system
* Built-in support for multiple device concurrent debugging and easy network sharing options with your peers from your laptop.
* When you build it, it will optimize JS, HTML and image assets ... etc, for you ( production quality )
* Build system functionality are powerful and easy to configure ( webpack )
* Minimal setup time and allow you to invest into things that matters
* Everything automatic, you just care about development, nothing else \o/ Yeah ?!

If you are interested, please read the `package.json` for all installed modules and plugins.

## Table of Contents

1. [Installation](#installation)
1. [Initialize your project](#initialize-your-project)
1. [Suggested Workflow](#suggested-workflow)
1. [Confiuration](#configuration)
1. [Developing Template](#developing-template)
1. [Integration Note](#integration-note)
1. [QA](#qa)
1. [Knowledge Base Reading](#knowledge-base-reading)
1. [How to Contribute](#how-to-contribute)

## Installation


### Prerequisite

You need to have Node.js installed.

### Post Installation

If you would like to have Redux debug capabilities, you can download this Chrome extension [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

![Redux DevTool](https://www.dropbox.com/s/wni425e3d4xiy85/redux-devtool.png?raw=1)


## Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

**That's it!**


### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 5 - 10 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:8080/`

If you see the landing page, it means you have set up everything successfully.


### List of NPM Commands


```sh
$ npm run dev    # build and watch, but javascript not minified
$ npm run build  # build a minified production version
$ npm run lint   # linting
$ npm run test   # run test
```


## Suggested Workflow


After you check out the repo, I will usually do the following :

0. Go to your project root in your host machine  ( e.g. your Mac )
1. Run `npm run dev`
2. Go to your browser and go to `localhost:8080`
3. Make code changes
4. Watch your code changes reflect on browser without refreshing
5. Repeat your development steps

That's very easy, isn't it?

### Production Preview

React Redux Boilerplate supports production preview, which means that you can run the production build job and see how it looks like in production.

1. Run `npm run build` and wait until it is done (it'll take awhile)
2. Go to the project `docroot`, you will see a `index.html`
3. Open that `index.html` in your browser, and that is the build version that just got generated

That's very easy, isn't it?


### Difference between `npm run dev` v.s. `npm run build`

`npn run dev` is best to do JS / CSS only changes, and it comes with live reload functionality

`npm run build` is for testing what happen if your frontend assets are optimized ( production level code )

Please let me know if you have better work flow suggestion!!

## Confiuration
React Redux Boilerplate has 2 flavors of configuration, one is for normal configuration, the other one is for sensitive information that you don't want other people to know. 

### Configuring your application

If you look at folder `config`, there are four files

`default.json` - all default configuration
`development.json` - when you run `npm run dev`, it will pull configuration from that file
`release.json` - when you run `npm run build:release`, it will use this configuration
`production.json` - when you run `npm run build`, it will use this configuration

We are using [node-config](https://github.com/lorenwest/node-config), they have a pretty easy to understand documentation.


And in your config file ( json config file ), whatever you put inside the `app`, it will be injected into the client application and you can access to your `app` config data by using `__CONFIG__` variables.

Let's say you have a config like the following 

```
{
  "app": {
    "apiURL": "http://foo.bar/"
  }
}

```

In your React application, you can access this variables

```
__CONFIG__.apiURL

```

### Configuring secret key/value pair

There are times you may want to put in `secret information` you don't want to check into the source code.  In this boilerplate, you just need to create a file called `.env` in your `PROJECT_ROOT`, and you can put your secret over there ( we have put that into `.gitignore` just in case ). For example, in order to use the feature to deploy to S3, you need to provide the following information. 

```
AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY
AWS_BUCKET=YOUR_AWS_BUCKET
AWS_CDN_URL=YOUR_AWS_CDN_URL

```

And your in node application or webpack config, those key/value pair will be injected into `process.env` .

__Note__: Using `.env` file is optional, it meant to keep secret and inject information into environment variables, if you are using Jenkin or alike type of tools, you can inject environment variables there. 

However, with `.env`, you can create a ready to use list of environment variables for your different environment.  You can even have another service to generate the `.env` file before building the project, but in terms of how to achieve that, it is out of scope of this documentation.

__Just remember__, `.env` file suppose to keep your secret, and prevent your from saving sensitive secret into source code repository \0/ !! 


We are using [dotenv](https://github.com/motdotla/dotenv) for the `.env` feature, they have pretty good documentation. 



## Developing Template

The `docroot/index.html` is a generated artifact. If look at our sample template at `src/assets/template/_default.html`, the `docroot/index.html` is generated from that file.

We are using [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin) to generate the `docroot/index.html`.

* If you are developing a single page application, you probably can reuse that file or customize it.
* If you are building multiple pages application, please read the [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin) documentation for template development and how to configure it.

**[Note]** - Most of the use case of the html template system so far is for testing purpose for your dev and build enviornment before you start integration.  If all you need is a static template, you are good; but if your application requires a server side processing, you will need to integrate the artifacts with the language of your choice. Please read `Diagrams` section for how to integrate with other server side language.

## Integration Note


### How to integrate with other server side framework ?

When you run `npm run build`, it will generate a meta data file `assets.json` with the list of generated frontend artifacts.  Think about that as a contract / interface for your server side framework.

And your framework just need to consume that meta information as integration point. 

And this boilerplate has a process integrated to upload artifacts ( assets.json and generated client ifacts ) to S3 / cloudfront.  One of the integration path is the `consumer` can query against s3 for the assets.json, and use the information in assets.json to get the artifacts which is uploaded to S3 / cdn.


## QA


* __How to activate S3 support ?__
	* S3 upload is optional here, but if you want to activate that, please go to your config and make `"s3Deploy": true` and fill up the `s3` config ( bucket, accessKey ... etc).  Remember that you can put the same config in different environment in case you want each one has different behavior. Below is an `example` in `config/default.json`
	
	
        ```
        ( STEP 1 )
        
        // Example in config/default.json
        // You can overwrite default using your other config file
        // ========================================================
        // default.json     - global
        // development.json - development   ( npm run dev )
        // release.json     - test/release  ( npm run build:release )
        // production.json  - production    ( npm run build )
        // ========================================================
        {
          "s3Deploy": true,
        }
        ```	
        
        And create a `.env` file and put in the following information.  Please read [Configuration](#configuration) section for more information.
        

        ```
        ( STEP 2 )
        
        AWS_ACCESS_KEY=blah...
        AWS_SECRET_KEY=blah...
        AWS_BUCKET=blah...
        AWS_CDN_URL=blah...
        ```


* __What is our standard to control our npm module dependencies ?__
    * We are using `^version`, it means "Compatible with version". The reason we are using `^version` is simply we want the ability for us to roll back to previous working version together with the source code.

* __How to add javascript unit test ?__
    * All React JS test are under \__tests__ directory and this tool will find all the test, you don't need to do anything besides putting your test in, but please use a structure that mimic your source location that you are testing, or it will create confusion.


* __What is B.E.M style  ?__
    * B.E.M is short for `Block, Element, Modifier` and is a naming convention for classes in HTML and CSS. Its goal is to help developers better understand the relationship between the HTML and CSS and make our code base more maintainable.


## Knowledge Base Reading


* [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
* [Redux](http://redux.js.org/)
* [redux-cli documentation](https://github.com/SpencerCDixon/redux-cli)
* [Lazy Loading and Code Split for React Route](https://github.com/webpack/react-proxy-loader)
* [Learning SASS](http://sass-lang.com/)
* [Learning PostCSS](https://github.com/postcss/postcss)
* [Jest = Awesome JS Testing Framework](https://facebook.github.io/jest/docs/tutorial-react.html)
* [Synchronization of props with state is an anti-pattern](https://github.com/JedWatson/react-select/issues/70)
* [B.E.M 101](https://css-tricks.com/bem-101/)
* [Isomorphic JavaScript, The Future of Web Apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)

## How to Contribute


We welcome anyone to send us __pull request__ to improve this boilerplate, the goal is to make it better from time to time and we all can learn from it.

This boilerplate will be maintained separately.  So please do not check in any business logic to it unless it is for example purpose. 

## License
In theory, knowledge should be free, so please visit [wtfpl](http://www.wtfpl.net/) for this boilerplate license if you really care. 

