Viskit.util.genaratekey = function(value){
	var path = document.location.href;
	path = path.replace(new RegExp('/', 'g'),'.')
	var startindex = 0;
	alert(path.IndexOf('http://'));
		alert(path.IndexOf('http://'));
		if(path.IndexOf('http://') !== -1){
			alert(path.IndexOf('http://'));
		}else if(path.IndexOf('https://') != -1){
			alert(path.IndexOf('http://'));
		}
	return path;
}



Viskit.util.localStorage.clearAll = function(){
	localStorage.clear();	
	return true;
	
}

Viskit.util.localStorage.clear = function(item){
	localStorage.removeItem(item);
	return true;
}

Viskit.util.localStorage.setItem = function(key,value){
	if(localStorage.getItem(key) != null){
		return false;
	}else{
		localStorage.setItem(key,value);
		return true;
	}
		
}

Viskit.util.localStorage.getItem = function(key){
	if(localStorage.getItem(key) != null){
		return localStorage.getItem(key) ;
	}else{
		return null;
	}
}

Viskit.util.localStorage.length = function(){
	return localStorage.length	;
}

Viskit.util.localStorage.getKey = function(key){
	return  localStorage.key(key);
}

Viskit.util.localStorage.exsists = function(key){
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
Viskit.util.sessionStorage.clearAll = function(){
	sessionStorage.clear();	
	return true;
	
}

Viskit.util.sessionStorage.clear = function(item){
	sessionStorage.removeItem(item);
	return true;
}

Viskit.util.sessionStorage.setItem = function(key,value){
	if(sessionStorage.getItem(key) != null){
		return false;
	}else{
		sessionStorage.setItem(key,value);
		return true;
	}
		
}

Viskit.util.sessionStorage.getItem = function(key){
	if(sessionStorage.getItem(key) != null){
		return sessionStorage.getItem(key) ;
	}else{
		return null;
	}
}

Viskit.util.sessionStorage.length = function(){
	return sessionStorage.length	;
}

Viskit.util.sessionStorage.getKey = function(key){
	return  sessionStorage.key(key);
}

Viskit.util.sessionStorage.exsists = function(key){
	if(sessionStorage.getItem(key) != null){
		return true;
	}else{
		return false;
	}
}