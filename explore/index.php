<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
		<link rel="manifest" href="/icons/site.webmanifest">
		<link rel="shortcut icon" href="/icons/favicon.ico">
		<meta name="msapplication-TileColor" content="#2b5797">
		<meta name="msapplication-config" content="/icons/browserconfig.xml">
		<meta name="theme-color" content="#ffffff">
    <title>Explore</title>
    <link rel="stylesheet" href="explore.css"/>
    <link rel="stylesheet" href="/style.css"/>
</head>
<body>
    <div id="image-bg-container">
        <div class="image-background"></div>
    </div>
    <?php
        system("python3 pythonproject2/main.py ".$_GET["p1"]." ".$_GET["p2"]);
    ?>
    <script src="/nav-menu.js"></script>
    <script src="/main.js"></script>
    <script>
        //Format punctuation and words
        document.body.innerHTML = document.body.innerHTML.replace(/\>\n\[\]\n\[\]\n\<|\>,\s?\</g,"><")
            .replace(/(<h3 class="media-heading"(?:.|\n)*?<\/p>)/g,'<div class="meteor-card">'+'$&'+'</div>')
            .replace(/Next period of activity:|(\d+)to/gi,function(m0,m1){return m1?m1+" &ndash; ":""});
        //Scrolling and Calc nearest
        window.addEventListener("scroll",function(){
            //const screenCenter = window.innerHeight/2;
            const closestDistance = document.querySelectorAll(".meteor-card").repeatEach(card=>{
                const cardPos = card.getBoundingClientRect();
                const distToCenter = Math.abs(cardPos.y + cardPos.height/2 - window.innerHeight/2);
                return distToCenter;
            }).sort((a,b)=>a-b)[0];
            document.querySelectorAll(".meteor-card").repeatEach(card=>{
                const cardPos = card.getBoundingClientRect();
                if (Math.abs(closestDistance - Math.abs(cardPos.y + cardPos.height/2 - window.innerHeight/2)) < 5) changeImage(card.querySelector('h3').innerText);
            })
        });
        //Images
        var imageUrlList = [];
        if(!getCookie('explore-image-urls')) {
            XHR.makeRequest("GET","https://enieg5flfilebgv.m.pipedream.net/images/get?image_id=explore_list", function(r,s){
                imageUrlList = JSON.parse(r);
                setCookie('explore-image-urls', r, 0.5);
            }, 0)
        } else {
            imageUrlList = JSON.parse(getCookie('explore-image-urls'));
        }
        var currentImgName = "";
        function changeImage(name) {
            if (currentImgName == name) return;
            currentImgName = name;
            let url = imageUrlList[['Lyrids','eta Aquariids','Southern delta Aquariids','alpha Capricornids','Perseids','Orionids','Southern Taurids','Northern Taurids','Leonids','Geminids','Ursids','Quadrantids','Solar Eclipse'].indexOf(name)];
            let imgElm = document.createElement("div");
            imgElm.className = "image-background";
            imgElm.style.backgroundImage = `url("${url}")`;
            document.getElementById("image-bg-container").querySelector("*:last-child").style.animationName = "fade-out";
            document.getElementById("image-bg-container").querySelector("*:last-child").addEventListener("animationend",function(e){e.target.parentNode.removeChild(e.target)});
            document.getElementById("image-bg-container").querySelector("*:last-child").addEventListener("webkitAnimationEnd",function(e){e.target.parentNode.removeChild(e.target)});
            document.getElementById("image-bg-container").appendChild(imgElm);
        }
        //Reorder by Date
        var orderedEventsArray = Array.from(document.querySelectorAll('.meteor-card')).sort((a,b)=>{
            a = a.querySelector('.shower_acti'), b = b.querySelector('.shower_acti');
            return new Date(a.innerText.replace(/ \u2013 .*$/g,"").replace(/(\d)(?:th|rd|nd|st)/g,"$1")).getTime()
                 - new Date(b.innerText.replace(/ \u2013 .*$/g,"").replace(/(\d)(?:th|rd|nd|st)/g,"$1")).getTime();
        }).filter(item=>{return new Date(item.querySelector('.shower_acti').innerText.replace(/ \u2013 .*$/g,"").replace(/(\d)(?:th|rd|nd|st)/g,"$1")).getTime() - Date.now() > 0}).map(i=>i.outerHTML);
        document.querySelectorAll(".meteor-card").forEach(card=>{
            card.parentNode.removeChild(card);
        })
    </script>
    <script defer>
        document.body.innerHTML += orderedEventsArray.join('');
    </script>
</body>
</html>