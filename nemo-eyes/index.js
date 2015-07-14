/**
 * Created by nikulkarni on 5/20/15.
 */
'use strict';
var EyesSelenium = require('eyes.selenium');
var Eyes = EyesSelenium.Eyes;
var LogHandler = EyesSelenium.ConsoleLogHandler;

module.exports = {

    "setup": function (nemo, callback) {
        nemo.eyes = new Eyes();
        nemo.eyes.setApiKey(nemo.data.eyes.apiKey);
        if (nemo.data.eyes.log) {
            nemo.eyes.setLogHandler(new LogHandler(true));
        }

        /**
         * A wrapper function for {@code eyes.open} to allow parameters to be set in {@code nemo.data}.
         * @param {string} appName The name of the application under test.
         * @param {string} testName The test's name.
         * @returns {Promsie} A promise which resolves when open is done.
         */
        nemo.eyes.open = function (appName, testName) {
            return this.constructor.prototype.open.call(this, nemo.driver, appName, testName,
                {width: nemo.data.eyes.width, height: nemo.data.eyes.height});
        };

        /**
         * A wrapper function for {@code eyes.close} to avoid throwing an exception on test failure by default.
         * @param {boolean} [shouldThrowEx=false] Whether or not close should throw an exception if the test fails.
         * @returns {Promise} A promise which resolves to the test's results.
         */
        nemo.eyes.close = function (shouldThrowEx) {
            return this.constructor.prototype.close.call(this, !!shouldThrowEx);
        };

        callback(null);
    }
};
