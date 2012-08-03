/**
 * @author pulasthi
 */
 function getJsonData(url){
	  var params = {};
      params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON;
      gadgets.io.makeRequest(url, response, params);
}

function response(obj){
	
	
}
function hello(){
  			alert("asd");
  		}