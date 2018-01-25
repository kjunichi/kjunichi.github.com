window.onload = () => {
    const escapeHtml = (text) => {
        let out = "";
        out = out.replace("&", "&amp;");
        out = text.replace("<", "&lt;");
        out = out.replace(">", "&gt;");
        out = out.replace("\"", "&quot;");
        out = out.replace("'", "&#039;");

        return out;
    };

    const convertMd2Html = (mdtext) => {
        const lines = mdtext.split(/\n/);
        let buf = "<ul>";
        for (const line of lines) {
            const htmlparts = line.match(/\- \[(.*?)\]\((.*?)\)/);
            if (htmlparts && htmlparts.length > 1) {
                const link = escapeHtml(htmlparts[1]);
                buf = buf + `\n<li><a href="${htmlparts[2]}">${link}</a></li>`
            }
        }
        return buf + "\n</ul>";
    };
    const btn = document.getElementById("executeBtn");
    btn.addEventListener("click", () => {
        const inMdElm = document.getElementById("inMd");
        const inMd = inMdElm.value;
        const result = convertMd2Html(inMd);
        const outHtmlElm = document.getElementById("outHtml");
        outHtmlElm.value = result;
        outHtmlElm.style.display = "block";
    });
};
