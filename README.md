# nemo-eyes
A [nemo](https://github.com/paypal/nemo) plugin for automated visual testing using [Applitools Eyes](https://applitools.com/).

### Installation instructions
1. Clone this repository.
1. Run `npm install`.
1. `cd` into internal `nemo-eyes` directory and run `npm install`.

### Runing a visual test.
1. In order to run a test you need to have an [Applitools account](https://applitools.com/sign-up/) (free track is available).
1. Copy your API key from the [tutorial page](https://eyes.applitools.com/app/tutorial) (choose "Automated visual tests", then scroll down to step 4), and set it in the `config/config.json` file.
1. go to the repository's root folder and run `node eyesTest.js`

