/**
 * provides Viskit support for local storage and session storage
 * @author pulasthi@wso2.com
 **/


/**
 * generates an unique string name for each chart for local storage to be used as the key based on the url chart type and chart div
 * @param value string that contains the chart type and chart div
 * @return path returns the generated string
 */

Viskit.util.genaratekey = function(value){
	var path = document.location.href;
	
	var startindex = 0;
	var endindex = 0;
		if(path.indexOf('http://') !== -1){
			startindex = path.indexOf('http://') + 7;
		}else if(path.indexOf('https://') != -1){
			startindex = path.indexOf('http://') + 8;
		}
		
		if(path.lastIndexOf('.') > path.lastIndexOf('/')){
			endindex = path.lastIndexOf('.') +1;
		}
		if(endindex == 0){
			path = path.substring(startindex);
		}else{
			path = path.substring(startindex,endindex);
		}
		path = path.replace(new RegExp('/', 'g'),'.')
		
		if((path.lastIndexOf('.')+1) === path.length){
			path = path + value;
		}else{
			path = path + '.' + value;	
		}
		
	return path;
}

/**
 * manges the local storage this clears the local storage according to the time specified
 * by the user and deletes ant data that is older than the specified time limit
 * @param time the time limit to keep data in the local storage
 * @param name the key to the local storage
 */
Viskit.util.localStorage.manageStore = function(time,name){
	var jsonString = Viskit.util.localStorage.getItem(name);
	var dataHistory = JSON.parse(jsonString);
	var starttime = 0;
	var starttimenext = 0;
	var endtime = 0;
	var hasNext = ture;
	if(dataHistory != null){
		starttime = dataHistory[0][0][0];
		endtime = dataHistory[0][dataHistory[0].length-1][0]
	}
	while(time <= (endtime-starttime)){
		for(var i=0;i<dataHistory.length;i++){
			dataHistory[i].shift();
		}
		if(typeof(dataHistory[0][0][0]) != 'undefined'){
			starttime = dataHistory[0][0][0];
		}else{
			break;
		}
	}
	var jsonData = JSON.stringify(dataHistory);
	
	Viskit.util.localStorage.setItem(name,jsonData);
	
}

/**
 * clears all the data in the local storage
 * @return returns true if successful
 */

Viskit.util.localStorage.clearAll = function(){
	localStorage.clear();	
	return true;
	
}

/**
 * clears data in the local storage specified by the key
 * @param item the key to the local storage
 * @return returns true if successful
 */
Viskit.util.localStorage.clear = function(item){
	localStorage.removeItem(item);
	return true;
}

/**
 * set an item into the local storage with the given value and key
 * if an item already exists for that key the value will be overridden
 * @param key the key that is used to store the data in the local storage
 * @param value  the string value to be stored
 * @return returns true if there was no value by the key and false if the key exists
 */
Viskit.util.localStorage.setItem = function(key,value){
	if(localStorage.getItem(key) != null){
		Viskit.util.localStorage.clear(key);
		localStorage.setItem(key,value);
		return false;
	} else{
		localStorage.setItem(key,value);
		return true;
	}
		
}

/**
 * retrieves the value for the given key
 * @param key the key to the local storage
 * @return returns the value specified by the key and null if no such key exists
 */
Viskit.util.localStorage.getItem = function(key){
	if(localStorage.getItem(key) != null){
		return localStorage.getItem(key) ;
	}else{
		return null;
	}
}

/**
 * @return returns the length of the local storage
 */
Viskit.util.localStorage.length = function(){
	return localStorage.length	;
}

/**
 * checks whether the given key exists in the local storage
 * @param key the key to the local storage
 * @returns  true if the key exists and false if there is no such key in the local storage
 */
Viskit.util.localStorage.getKey = function(key){
	return  localStorage.key(key);
}

/**
 * checks whether there is a key at the specified location and returns the 
 * key if it exists
 * @param index the index value of the key
 * @returns the key if there is a key present at the given location and null
 * if the index is greater than equal to the number of keys
 */
Viskit.util.localStorage.exsists = function(index){
	if(localStorage.getItem(key) != null){
		return true;
	}else{
		return false;
	}
}


/*
* SessionStorage allows the user to use the storage as in a session the database will deleted 
* session is finished
*
*/

/**
 * manges the local storage this clears the local storage according to the time specified
 * by the user and deletes ant data that is older than the specified time limit
 * @param time the time limit to keep data in the local storage
 * @param name the key to the local storage
 */
Viskit.util.sessionStorage.manageStore = function(time,name){
	var jsonString = Viskit.util.sessionStorage.getItem(name);
	var dataHistory = JSON.parse(jsonString);
	var starttime = 0;
	var endtime = 0;
	if(dataHistory != null){
		starttime = dataHistory[0][0][0];
		endtime = dataHistory[0][dataHistory[0].length-1][0]
	}
	while(time <= (endtime-starttime)){
		for(var i=0;i<dataHistory.length;i++){
			dataHistory[i].shift();
		}
		if(typeof(dataHistory[0][0][0]) != 'undefined'){
			starttime = dataHistory[0][0][0];
		}else{
			break;	
		}
	}
	
	var jsonData = JSON.stringify(dataHistory);
	
	Viskit.util.sessionStorage.setItem(name,jsonData);
	
}

/**
 * clears all the data in the local storage
 * @return returns true if successful
 */
Viskit.util.sessionStorage.clearAll = function(){
	sessionStorage.clear();	
	return true;
	
}

/**
 * clears data in the local storage specified by the key
 * @param item the key to the local storage
 * @return returns true if successful
 */
Viskit.util.sessionStorage.clear = function(item){
	sessionStorage.removeItem(item);
	return true;
}

/**
 * set an item into the local storage with the given value and key
 * if an item already exists for that key the value will be overridden
 * @param key the key that is used to store the data in the local storage
 * @param value  the string value to be stored
 * @return returns true if there was no value by the key and false if the key exists
 */
Viskit.util.sessionStorage.setItem = function(key,value){
	if(sessionStorage.getItem(key) != null){
		Viskit.util.sessionStorage.clear(key);
		sessionStorage.setItem(key,value);
		return false;
	} else{
		sessionStorage.setItem(key,value);
		return true;
	}
		
}

/**
 * retrieves the value for the given key
 * @param key the key to the local storage
 * @return returns the value specified by the key and null if no such key exists
 */
Viskit.util.sessionStorage.getItem = function(key){
	if(sessionStorage.getItem(key) != null){
		return sessionStorage.getItem(key) ;
	}else{
		return null;
	}
}

/**
 * @return returns the length of the local storage
 */
Viskit.util.sessionStorage.length = function(){
	return sessionStorage.length	;
}

/**
 * checks whether the given key exists in the local storage
 * @param key the key to the local storage
 * @returns  true if the key exists and false if there is no such key in the local storage
 */
Viskit.util.sessionStorage.getKey = function(key){
	return  sessionStorage.key(key);
}

/**
 * checks whether the given key exists in the local storage
 * @param key the key to the local storage
 * @returns  true if the key exists and false if there is no such key in the local storage
 */
Viskit.util.sessionStorage.exsists = function(key){
	if(sessionStorage.getItem(key) != null){
		return true;
	}else{
		return false;
	}
}