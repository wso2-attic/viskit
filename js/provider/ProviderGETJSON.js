/**
* JSON provider this handles services that retrieve JSON strings
* @class ProviderGET
* @extends Provider
**/
Viskit.p.ProviderGETJSON = function(url, args, that) {
	Viskit.p.ProviderGET.call(this, url, args, that);
};

Viskit.extend(Viskit.p.ProviderGETJSON, Viskit.p.ProviderGET);

/**
 * parses the response JSON string to a JSON object
 * @param {String} response the JSON string that is received
 * @param {Object}[that]
 * @return { JSON } returns a the JSON object corresponding to the response string
 */
Viskit.p.ProviderGETJSON.prototype.parseResponse = function(response, that) {
    return JSON.parse(response);
};
/**
 * initialize the Provider
 */
Viskit.p.ProviderGETJSON.prototype.initialize = function() {
};
