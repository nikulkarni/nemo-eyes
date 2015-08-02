/**
 * Created by nikulkarni on 5/20/15.
 */

var Nemo = require("nemo"),
    __dirname = process.cwd();

var nemo = Nemo(__dirname, function (err) {
    //always check for errors!
    if (!!err) {
        console.log('Error during Nemo setup', err);
    }
    nemo.driver.getCapabilities().
        then(function (caps) {
            console.info("Nemo successfully launched", caps.caps_.browserName);
        });

    nemo.driver.get(nemo.data.baseUrl);
    nemo.eyes.open('Sample Application','Homepage test');
    nemo.eyes.checkWindow("PayPal Home Page");
    nemo.eyes.close().then(function(testResults){
        console.dir(testResults);
    });
    nemo.driver.quit();
});
