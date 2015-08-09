# angular-firebase-cms

A content management system module for [AngularJS](https://angularjs.org/) for [Firebase](https://firebase.com) applications.

Downloads data from a Firebase location and immediately disconnects from that Firebase instance.

## Installation

#### Building from source

`git clone https://bitbucket.org/sbolel/angular-firebase-cms` - Clone repository.

`cd angular-firebase-cms` - Open cloned repository.

`npm install` - Install npm dependencies.

`bower install` - Install bower components.

`grunt build:src` - Build source files to `/dist`.

#### Launching the demo application

`grunt` - Build everything and launch demo application in Chome browser.

## Usage

#### Application setup

1. Add `firebaseCms` to AngularJS application dependencies

    ```js
      var myApp = angular.module('myApp', ['firebaseCms']);
    ```

2. Set content data URL in `app.config()`

    ```js
    demoApp.config(['$routeProvider', '$locationProvider', 'firebaseCmsProvider', function ($routeProvider, $locationProvider, firebaseCmsProvider) {

        // Set the Firebase URL from which application data will be downloaded
        firebaseCmsProvider.setContentUrl('https://<FIREBASE-APP>.firebaseio.com/app/content');
        
        // {...}
    }]);
    ```

## Roadmap

_coming soon_

## MIT License

```
The MIT License (MIT)

Copyright (c) 2015 Sinan Bolel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
