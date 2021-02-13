(function(){
	let navPages = [
		{
			"title": "Home",
			"icon": "fa-home", //FontAwesome Icon
			"url": "/"
		},
		{
			"title": "Explore",
			"url": "/explore/",
            "icon": "fa-search"
			/*"subpages": [
				{
					"title": "Sample Item",
					"icon": "fa-group",
					"url": "/explore/nothing.html"
				}
			]*/
		},
		{
			"title": "Register",
            "icon": "fa-pen",
			"url": "/register/"
		}
	];
	let topnav = document.createElement("div");
	topnav.classList.add("navbar");
	//Logo and Menu Button
	topnav.innerHTML = `<span class="small-screen">
            <span id="open-sidenav-btn">
                <i class="fa fa-bars fa-fw" style="margin: 8px 8px 8px 12px;"></i>
            </span>
            <a href="/">
                <span style="background-image:url(/icons/android-icon-48x48.png);background-size:cover;width:25px;height:25px;margin:0 4px 0 -4px;">⁣</span>
                <b style="color:black;height:25px;">Star Seeker</b>
            </a>
        </span>
        <a href="/" class="large-screen" style="margin-right:auto">
            <img id="logo" alt="logo" src="/icons/apple-icon-72x72.png">
        </a>`;
	let sidenav = document.createElement("ul");
	sidenav.classList.add("sidenav");
	sidenav.innerHTML = '<li id="close-sidenav-btn" style="position:absolute;width:244px;background-color:#e0e0e0;z-index:1;top:0;left:0;"><a><i class="fa fa-fw fa-close" style="margin: 8px 4px;"></i>Close Menu</a></li><br/><br/>';
	navPages.forEach(page=>{
		if (page.subpages) {
			topnav.innerHTML += `<div><a href="${page.url}" class="menu-item">${page.title}</a><div class="submenu">${
				page.subpages.repeatEach(subpage=>{return '<a href="'+subpage.url+'">'+subpage.title+'</a>'}).join('<br/>')
			}</div></div>`;
			let index = navPages.indexOf(page);
			sidenav.innerHTML += `<li><a href="javascript:void(0)" onmousedown="event.preventDefault()" onclick="sidenav.subsection('${index}')"><i id="c${index}" class="fa fa-fw fa-caret-down"></i></a><a href="${page.url}">${page.title}</a></li>
			<ul id="g${index}">${
				page.subpages.repeatEach(subpage=>{return '<li><a href="'+subpage.url+'"><i class="fa fa-fw '+subpage.icon+'"></i>'+subpage.title+'</a></li>'}).join('')
			}</ul>`
		} else {
			topnav.innerHTML += `<a href="${page.url}" class="menu-item">${page.title}</a>`;
			sidenav.innerHTML += `<li><a href="${page.url}"><i class="fa fa-fw ${page.icon}"></i>${page.title}</a></li>`;
		}
	});
	sidenav.innerHTML += "<br/><br/><br/>";
	let overlay = document.createElement("div");
	overlay.classList.add("overlay");
	document.body.insertBefore(overlay, document.body.querySelector("*"));
	document.body.insertBefore(sidenav, overlay);
	document.body.insertBefore(topnav, sidenav);
})();
//Responsive Navigation
const	openNavBtn = document.getElementById("open-sidenav-btn"),
		overlayElm = document.querySelector(".overlay"),
		closeBtn = document.getElementById("close-sidenav-btn");
openNavBtn.addEventListener("click",function(){
	document.querySelector(".sidenav").style.left = "0";
	document.querySelector(".overlay").style.display = "block";
	setTimeout(function(){document.querySelector(".overlay").style.opacity = "0.75";},12);
	//Disable Body Scrolling
		document.body.style.overflow = "hidden";
		document.body.style.touchAction = "none";
		document.body.ontouchmove = (e) => {if(!document.querySelector(".sidenav").contains(e.target))e.preventDefault()};
});
overlayElm.onclick = overlayElm.ontouchend = closeBtn.onclick = function() {
	document.querySelector(".sidenav").style.left = "-250px";
	document.querySelector(".overlay").style.opacity = "0";
	setTimeout(function(){document.querySelector(".overlay").style.display = "none";},500);
	//Enable Body Scrolling
		document.body.style.overflow = "";
		document.body.style.touchAction = "";
		document.body.ontouchmove = (e) => {void(0);};
};
var sidenav = {
	subsection: function (id){
		let cid = "c" + id,
			gid = "g" + id,
			caret = document.getElementById(cid),
			group = document.getElementById(gid);
		if (group.hidden){
			group.hidden = false;
			caret.classList.add('fa-caret-down');
			caret.classList.remove('fa-caret-right');
		} else {
			group.hidden = true;
			caret.classList.add('fa-caret-right');
			caret.classList.remove('fa-caret-down');
		}
	}
};
let mgGlobalVars = {
	screenTouched: false
}
document.body.addEventListener("touchstart", function() {mgGlobalVars.screenTouched = true;});
document.body.addEventListener("touchend", function() {setTimeout(function(){mgGlobalVars.screenTouched = false;},10)});
function resizeOuterDivs(event) {
	document.querySelectorAll(".navbar > div").forEach(div=>{
		let anchorStyle = getComputedStyle(div.querySelector("a"));
		div.style.width = Math.ceil(Number(anchorStyle.width.replace(/px/,"")) + Number(anchorStyle.paddingLeft.replace(/px/,""))*2) + "px";
	});
}
resizeOuterDivs();
document.querySelector(".navbar").addEventListener("mouseenter", resizeOuterDivs);

document.querySelectorAll(".navbar > div a").forEach(elm=>{
	elm.addEventListener("mouseenter",function(event){
		elm.onclick = function(e) {
			resizeOuterDivs();
			if (mgGlobalVars.screenTouched && e.timeStamp - event.timeStamp < 1) e.preventDefault();
		}
	});
});
