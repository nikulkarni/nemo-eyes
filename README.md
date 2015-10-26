# nemo-eyes
A [nemo](https://github.com/paypal/nemo) plugin for automated visual testing using [Applitools Eyes](https://applitools.com/).

## Installation

1. Add dependencies to package.json and install.

```javascript
	...
    "nemo": "^1.0.0",
    "nemo-eyes": "^0.0.4",
	...
```

2. Add `nemo-eyes` plugin to your nemo config JSON object. Also note `eyes` section under `data`

```javascript
{
  "driver": {
    ...
  },
  "plugins": {
    "eyes": {
      "module": "path:../",
      "arguments": [
        {
          "sdk": {
            "setApiKey": "env:applitools_api_key",
            "setBatch": "desktop",
            "setForceFullPageScreenshot": true
          },
          "viewport": {
            "width": 1200,
            "height": 600
          },
          "mock": "env:applitools_mock"
        }
      ]
    }
  }
}
```

## How to use
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

### Configuration

Configure nemo-eyes via the `arguments` section in the plugin configuration as above.

For any Eyes SDK method that can takes string arguments, you can program the Eyes SDK via the `sdk` section of the  `arguments` object.

If you supply `"mock": true` or `"mock": "true"` via the config (as shown above), you can run your scripts without having to 
duck-type around the eyes calls in your script. This is handy if you're working on other aspects of your script and do not want 
to incur cost or any latency associated with calling out to Applitools.

## Running a sample visual test using Applitools.
1. In order to run a test you need to have an [Applitools account](https://applitools.com/sign-up/) (free track is available).
1. Copy your API key from the [tutorial page](https://eyes.applitools.com/app/tutorial) (choose "Automated visual tests", then scroll down to step 4), and set it in nemo `examples/config/config.json` file.
1. go to the repository's root folder and run `node examples/eyesTest.js`

