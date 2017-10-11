// hatebu.js
var t=0;
let timerId;
function doMyFunc(inText) {
	
    const parser = new DOMParser();
    var dom = parser.parseFromString(inText, "text/xml");
    var entries = dom.getElementsByTagName("entry");
    var savedIssuedDate = "";
    var ul = "";
    for(let i = 0; i < entries.length; i++) {
	var issued = entries[i].getElementsByTagName("issued")[0].textContent;
	var issuedDate = issued.split("T")[0];
	var title = entries[i].getElementsByTagName("title")[0].textContent;
	var linkUrls = entries[i].getElementsByTagName("link");
	var linkurl = "";
	for(var j = 0; j < linkUrls.length; j++) {
	    if(linkUrls[j].getAttribute("rel") == "related") {
		linkurl = linkUrls[j].getAttribute("href");
	    }
	}
	if(savedIssuedDate != issuedDate) {
	    if(ul !== "") {
		$('#hatebu').append(ul);
	    }
        var tmp = issuedDate.split('-');
	    $('#hatebu').append(`<div class="date"><p><span class="year">${tmp[0]}年</span>`
                         + `<span class="month">${tmp[1]}月</span><span class="day">${tmp[2]}日</span></p></div>`);
	    ul = $('<ul/>');
	    savedIssuedDate = issuedDate;
	}
	$('<li/>').html(`<a href="${linkurl}">${title}</a>`).appendTo(ul);
    }
    if(ul !== "") {
		$('#hatebu').append(ul);
	}
	clearInterval(timerId);
	$('#hateprogressBar').css("width","100%");
	const elm = document.getElementById("hateprogress");
	elm.parentNode.removeChild(elm);
}

function cb(data) {
  doMyFunc(data.html);
}

// forked from kjunichi's "任意のURLをGETする" http://jsdo.it/kjunichi/A3vG
$(function(){ 
	const turl = "http://b.hatena.ne.jp/kjw_junichi/atomfeed?tag=あとで読む";
	$('#outHtml').text("Fetching...");
	timerId = setInterval(function() {
		t=t+0.2;
		var r = (1-1/(t+1))*100;
		$('#hateprogressBar').css("width",r+"%");
	},300);
	const s = document.createElement("script");
	s.src="https://kjunurl2015.appspot.com/gethtml?t=1&url="+encodeURIComponent(turl)+"&callback=cb";
	document.body.appendChild(s);
});
