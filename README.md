# nemo-eyes
A [nemo](https://github.com/paypal/nemo) plugin for automated visual testing using [Applitools Eyes](https://applitools.com/).

### Installation

1. Add dependencies to package.json and install.

```javascript
	...
    "nemo": "^1.0.0",
    "nemo-eyes": "^0.0.1",
	...
```

2. Add `nemo-eyes` plugin to your nemo config JSON object. Also note `eyes` section under `data`

```javascript
{
  "driver": {
    ...
  },
  "plugins": {
    "view": {
      "module": "nemo-eyes"
    }
  },
  "data": {
    ...
     "eyes" : {
          "apiKey" : "yourAPIKey",      /* Required */
          "width" : 800,                /* Required */
          "height" : 600,               /* Required */
          "log" : true                  /* Optional */
     }
  }
}
```
### How to use
Once nemo-eyes plugin is registered, `eyes` namespace will be attached to `nemo` and methods for visual testing are exposed. Idea is to,
1. Initialize your application and test using `nemo.eyes.open('Sample Application','Homepage test');`
2. Trigger a visual check using `nemo.eyes.checkWindow("PayPal Home Page");`.
If base image for the window in question is present, new screenshot will be compared against it. Otherwise new screenshot will be saved as a base image
3. Close test and resolved promise will have corresponding results
```javascript
    nemo.eyes.close().then( function(testResults){
        console.log(testResults.isPassed);
        console.log(testResults.url);
    });
```
### Running a sample visual test using Applitools.
1. In order to run a test you need to have an [Applitools account](https://applitools.com/sign-up/) (free track is available).
1. Copy your API key from the [tutorial page](https://eyes.applitools.com/app/tutorial) (choose "Automated visual tests", then scroll down to step 4), and set it in nemo `config/config.json` file.
1. go to the repository's root folder and run `node examples/eyesTest.js`

