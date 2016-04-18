/**
 * Created by nikulkarni on 5/20/15.
 */
'use strict';
var EyesSelenium = require('eyes.selenium');
var Eyes = EyesSelenium.Eyes;
var LogHandler = EyesSelenium.ConsoleLogHandler;
module.exports = {

    "setup": function (config, nemo, callback) {
        if (config.mock && config.mock === "true") {
            var emptyPromise = function (val) {

                return function () {
                    return nemo.driver.controlFlow().execute(function () {
                        return nemo.wd.promise.fulfilled(val || 'fulfilled');
                    });

                }
            };
            nemo.eyes = {
                open: emptyPromise(),
                setBatch: function () {},
                close: emptyPromise({isPassed: true, url: 'Eyes in mock mode.. No URL'}),
                checkWindow: emptyPromise()
            };
            return callback(null);
        }

        var eyes = nemo.eyes = new Eyes();
        if (!config.sdk && config.sdk.setApiKey) {
            return callback(new Error('nemo-eyes: apiKey is required'));
        }
        Object.keys(config.sdk).forEach(function (key) {
            if (!nemo.eyes[key]) {
                return;
            }
            if (config.sdk[key].constructor !== Array) {
                return nemo.eyes[key](config.sdk[key]);
            }
            nemo.eyes[key].apply(config.sdk[key]);
        });
        if (config.log && config.log === "true" || config.log === true) {
            nemo.eyes.setLogHandler(new LogHandler(true));
        }
        var viewPort = {
            'width': (config.viewport && config.viewport.width) ? config.viewport.width : 1024,
            'height': (config.viewport && config.viewport.height) ? config.viewport.height : 768,
        };

        /**
         * A wrapper function for {@code eyes.open} to allow parameters to be set in {@code nemo.data}.
         * @param {string} appName The name of the application under test.
         * @param {string} testName The test's name.
         * @returns {Promise} A promise which resolves when open is done.
         */
        nemo.eyes.open = function (appName, testName) {
            //return this.constructor.prototype.open.call(this, nemo.driver, appName, testName,
            return this.constructor.prototype.open.call(this, nemo.driver, appName, testName,
                viewPort);
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
