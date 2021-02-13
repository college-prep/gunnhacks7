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