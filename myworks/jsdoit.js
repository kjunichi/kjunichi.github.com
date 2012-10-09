var parts_tmpl = "<div class=\"bpJsdoit\" style=\"text-align:center; width:465px;\"><iframe allowfullscreen=\"allowfullscreen\" scrolling=\"no\" src=\"http://jsdo.it/blogparts/<<NAME>>\" width=\"465\" height=\"546\" style=\"border:1px #CCC solid; width: 465px; margin: 0px;\"></iframe></div>";

function myCallBack(list) {
    console.dir(list);
    for(var i =0; i < list.works.length; i++) {
        console.log(list.works[i]);
        var tmpParts = parts_tmpl.replace("<<NAME>>",list.works[i]);
        $obj=$(tmpParts);
        $('#myworks').append($obj);
    }
}

function displayWorks(worksKind) {
    var myScript = document.createElement("script");
    myScript.type = "text/javascript";
    myScript.src = "http://jsdo.it/kjunichi/"+worksKind+"works/js";
    document.body.appendChild(myScript);
}

$(function () {
    var tmpWorks;  

    $('a[data-toggle="tab"]').on('shown', function (e) {
        var tabId = e.target.id;
        //alert(e.target.id); // activated tab
        
        if(e.relatedTarget) {
            //clear
            $('#myworks').empty();
        }
        if(tabId != "home" ) {
           displayWorks(tabId);
        }
        
    });
});
