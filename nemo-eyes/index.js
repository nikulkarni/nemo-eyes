/**
 * Created by nikulkarni on 5/20/15.
 */
'use strict';
var Eyes = require('eyes.selenium').Eyes;

module.exports = {

  "setup": function (nemo, callback) {
    var eyes = new Eyes();
    eyes.setApiKey(nemo.data.eyes.apiKey);

    nemo.eyesHandler = {

      eyes: eyes,

      open: function (appName, testName) {
        return eyes.open(nemo.driver, appName, testName, {width: nemo.data.eyes.width, height: nemo.data.eyes.height});
      },
      checkWindow: function (windowName) {
        return eyes.checkWindow(windowName);
      },
      close: function () {
          return eyes.close(false/*DOESN'T THROW EXCEPTION*/);
      }

    };
    callback(null);
  }
};
