cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.sqlite/www/SQLitePlugin.js",
        "id": "com.phonegap.plugins.sqlite.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.mirasense.scanditsdk.plugin": "1.1.0",
    "com.phonegap.plugins.sqlite": "1.0.0",
    "org.apache.cordova.console": "0.2.9-dev"
}
// BOTTOM OF METADATA
});