// hatebu.js
function doMyFunc(inText) {
	
    var parser = new DOMParser();
    var dom = parser.parseFromString(inText, "text/xml");
    var entries = dom.getElementsByTagName("entry");
    var savedIssuedDate = "";
    var ul = "";
    for(var i = 0; i < entries.length; i++) {
    	var barVal = i/entries.length*100;
    	$('#hateprogressBar').css("width",barVal+"%");
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
	    $('#hatebu').append('<div class="date">'
                         + '<p><span class="year">'+tmp[0]+'”N</span>'
                         +'<span class="month">' + tmp[1] + 'ŒŽ</span>'
                         +'<span class="day">'+tmp[2] + '“ú</span></p>'
                         + '</div>');
	    ul = $('<ul/>');
	    savedIssuedDate = issuedDate;
	}
	$('<li/>').html('<a href="'+linkurl+'">' + title +'</a>').appendTo(ul);
    }
    if(ul !== "") {
		$('#hatebu').append(ul);
	    }
	    var elm = document.getElementById("hateprogress");
	elm.parentNode.removeChild(elm);
}

// forked from kjunichi's "”CˆÓ‚ÌURL‚ðGET‚·‚é" http://jsdo.it/kjunichi/A3vG
$(function(){
  
	var turl = "http://b.hatena.ne.jp/kjw_junichi/atomfeed?tag=%E3%81%82%E3%81%A8%E3%81%A7%E8%AA%AD%E3%82%80";
	$('#outHtml').text("Fetching...");
	jQuery.getJSON("http://kjunurl.appspot.com/mkly?url="+turl+"&callback=?", 
		       function(data) {
			   doMyFunc(data.html);
	});
	
    
});
