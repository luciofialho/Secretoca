cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-networkinterface/www/networkinterface.js",
        "id": "cordova-plugin-networkinterface.networkinterface",
        "pluginId": "cordova-plugin-networkinterface",
        "clobbers": [
            "window.networkinterface"
        ]
    },
    {
        "file": "plugins/cordova-plugin-networkinterface/src/browser/networkinterfaceProxy.js",
        "id": "cordova-plugin-networkinterface.networkinterfaceProxy",
        "pluginId": "cordova-plugin-networkinterface",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-networkinterface": "1.2.0"
}
// BOTTOM OF METADATA
});