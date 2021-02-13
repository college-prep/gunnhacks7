//Access Cookies
function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for( var i = 0; i < ca.length; i++ ){
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
//For Each with output
Array.prototype.repeatEach = NodeList.prototype.repeatEach = HTMLCollection.prototype.repeatEach = function(fn) {
	var outputs = [];
	if (!(fn && typeof fn == 'function')) throw new TypeError(fn + ' is not a function');
	for(var i = 0; i < this.length; i++) {
		outputs.push( fn(this[i]) );
	}
	return outputs;
}

//Faster Requests
var XHR = {
	makeRequest: function(method, url, callback, proxy, data) {
		proxy = proxy || 0;
		let proxyUrls = ["", "all", "https://api.allorigins.win/get?t="+Date.now()+"&url=", /*"https://cors-anywhere.herokuapp.com/",*/ "https://api.codetabs.com/v1/proxy?quest=", "https://enw6yiuqc2jyb5w.m.pipedream.net/cors/"]
		if (proxy === 2 && method == "GET") method = "fetch";
		function sendRequest(url, cb){
			if (method == "fetch" || url.match(/^https:\/\/api.allorigins/)) {
				fetch(proxy > 1 ? proxyUrls[proxy] + url : url, {
					method: method == "fetch" ? "GET" : method,
					body: data
				}).then(response => {
						if (response.ok) return response.json();
						throw new Error('Network response was not ok.')
					})
					.then(data => cb(data.contents, data.status.http_code))
					.catch(() => cb(null, 521));
			} else {
				let xhr = new XMLHttpRequest();
				xhr.open(method, proxy > 2 ? proxyUrls[proxy] + url : url);
				xhr.onload = xhr.onerror = xhr.onabort = function(){cb(xhr.responseText, xhr.status)};
				xhr.send(data);
			}
		}
		if (proxy === 1) {
			sendRequest(proxyUrls[2]+url,(r,s)=>{s&&s!=521?callback(r,s,2):sendRequest(proxyUrls[3]+url,(r,s)=>{s&&s!=521?callback(r,s,3):sendRequest(proxyUrls[4]+url,(r,s)=>{s&&s!=521?callback(r,s,4):callback(null, 521)})})});
		} else {
			sendRequest(url, callback);
		}
	}
}