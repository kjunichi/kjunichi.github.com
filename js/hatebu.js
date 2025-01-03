// hatebu.js
let t = 0;
let timerId;

function doMyFunc(inText) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(inText, "text/xml");
    const entries = dom.getElementsByTagName("item");
    let savedIssuedDate = "";
    let ul = "";
    for (let i = 0; i < entries.length; i++) {
        const issued = entries[i].getElementsByTagName("dc:date")[0].textContent;
        const issuedDate = issued.split("T")[0];
        const title = entries[i].getElementsByTagName("title")[0].textContent;
        const linkUrls = entries[i].getElementsByTagName("link");
        let linkurl = "";
        for (let j = 0; j < linkUrls.length; j++) {
            linkurl = linkUrls[j].textContent;
        }
        if (savedIssuedDate != issuedDate) {
            if (ul !== "") {
                $('#hatebu').append(ul);
            }
            const tmp = issuedDate.split('-');
            $('#hatebu').append(`<div class="date"><p><span class="year">${tmp[0]}年</span>` +
                `<span class="month">${tmp[1]}月</span><span class="day">${tmp[2]}日</span></p></div>`);
            ul = $('<ul/>');
            savedIssuedDate = issuedDate;
        }
        $('<li/>').html(`<a href="${linkurl}">${title}</a>`).appendTo(ul);
    }
    if (ul !== "") {
        $('#hatebu').append(ul);
    }
    clearInterval(timerId);
    $('#hateprogressBar').css("width", "100%");
    const elm = document.getElementById("hateprogress");
    elm.parentNode.removeChild(elm);
}

function cb(data) {
    doMyFunc(data.html);
}

// forked from kjunichi's "任意のURLをGETする" http://jsdo.it/kjunichi/A3vG
$(function() {
    const turl = "http://b.hatena.ne.jp/kjw_junichi/rss?tag=あとで読む";
    $('#outHtml').text("Fetching...");
    timerId = setInterval(() => {
        // プログレスバーの長さの更新処理
        t = t + 0.2;
        const r = (1 - 1 / (t + 1)) * 100;
        $('#hateprogressBar').css("width", `${r}%`);
    }, 300);
    const s = document.createElement("script");
    s.src = "https://kjunurl2015.appspot.com/gethtml?t=1&url=" + encodeURIComponent(turl) + "&callback=cb";
    document.body.appendChild(s);
});
