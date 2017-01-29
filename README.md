# Voting App

## Overview

This app allows users to vote anonomously on polls, login using social credentials, create polls of their own
and manage their polls. The client leverages Chart.js, Angular v2.x and Typescript tied to a Firebase real-time 
authentication engine and datastore using [AngularFire2](https://github.com/angular/angularfire2).

A demo version of this app is deployed at: [https://fcc-chadsheets-com.firebaseapp.com/av](https://fcc-chadsheets-com.firebaseapp.com/av)

![](src/assets/img/app-screenshot.png?raw=true)

Part of the [FreeCodeCamp](https://www.freecodecamp.com/cjsheets) curriculum based on the following user stories:

* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can share my polls with my friends.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Install

Clone this repository and install npm dependencies:

```
git clone git@github.com:cjsheets/angular-voting-app.git
cd angular-voting-app
npm install
```

## Run

First, from the [firebase console](https://console.firebase.google.com/) create a new project. To setup authentication,
database rules or hosting, see the [offical docs](https://firebase.google.com/docs/).

For client development, use angular-cli to launch the app:

```
ng serve
```

Navigate to `http://localhost:4200`



## Technology Stack

This package contains:

| Front-End | Back-End |
| ------- | ------- |
| Angular v2.x | Firebase Auth |
| AngularFire2 | Firebase Database |
| RxJS | Firebase Hosting |
| Charts.js | Firebase Test Lab |
| HTML5/CSS |  |
| Webpack | |

| Both | 
| ------- |
| Typescript |
| Karma/Protractor | 

### Testing

* *Work in progress*

#### unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### To-Do:

* Perform transactions when adding/removing polls
* Disable console log in production
* enforce no duplicate options, causes issues.
  * http://almerosteyn.com/2016/03/angular2-form-validation-component
* Add Pagination
* Improve transition effect when adding new poll
* Add Route Guards
* Check `viewing votes` when logged out in private browsing session
* set maximum width for page elements

### License

MIT License

[![Analytics](https://cjs-beacon.appspot.com/UA-10006093-3/github/cjsheets/angular-voting-app?pixel)](https://github.com/cjsheets/angular-voting-app)
