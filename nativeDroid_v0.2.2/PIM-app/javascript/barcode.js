 function onBodyLoad()
            {
                document.addEventListener("deviceready", onDeviceReady, false);
            }
			
$('#scan').submit(function () {
	scan();
	return false;
});

        function success(resultArray) {

       // alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);

                // NOTE: Scandit SDK Phonegap Plugin Versions 1.* for iOS report
                // the scanning result as a concatenated string.
                // Starting with version 2.0.0, the Scandit SDK Phonegap
                // Plugin for iOS reports the result as an array
                // identical to the way the Scandit SDK plugin for Android reports results.

                // If you are running the Scandit SDK Phonegap Plugin Version 1.* for iOS,
                // use the following approach to generate a result array from the string result returned:
                // resultArray = result.split("|");
        	$("#result").append("Results<br>");
			$("#result").append("Barcode : "+resultArray[0]);
			$('#result').listview('refresh');
			console.log("Request Complete : Scan Successful "+resultArray[0]);
			alert(resultArray[0]);

            }

            function failure(error) {
                alert("Failed: " + error);
            }

            function scan() {
                // See below for all available options. 
                cordova.exec(success, failure, "ScanditSDK", "scan",
                             ["nY/NqK7cEeObR7AuWZwCByZjtjxSLm8nXY5sBPPwevI",
                              {"beep": true,
                              "1DScanning" : true,
                              "2DScanning" : true}]);
            }
            app.initialize();