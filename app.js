var UpnpControlPoint = require("./lib/upnp-controlpoint").UpnpControlPoint
  , wemo = require("./lib/wemo");

var handleDevice = function(device) {
	console.log("device type: " + device.deviceType + " location: " + device.location);

	switch(device.deviceType) {

	case wemo.WemoControllee.deviceType:
		var wemoCoffee = new wemo.WemoControllee(device);
		wemoCoffee.on("BinaryState", function(value) {
			console.log("wemo coffee maker state change: " + value);
		});

        setTimeout(function() {
			wemoCoffee.setBinaryState(true);
		}, 10000);
		break;

	}
};

var cp = new UpnpControlPoint();

cp.on("device", handleDevice);

cp.search();
