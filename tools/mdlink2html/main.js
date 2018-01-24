window.onload = () => {
   const convertMd2Html = (mdtext)=> {
    const lines = mdtext.split(/\n/);
    let buf="<ul>";
    for(const line of lines) {
      
      const htmlparts = line.match(/\- \[(.*?)\]\((.*?)\)/);
      if(htmlparts && htmlparts.length>1) {
        buf = buf + `\n<li><a href="${htmlparts[2]}">${htmlparts[1]}</a></li>`
      }
      //buf = buf + "\n" + line;
    }
    return buf + "\n</ul>";
  };
  const btn = document.getElementById("executeBtn");
  btn.addEventListener("click",()=>{
    const inMdElm = document.getElementById("inMd");
    const inMd = inMdElm.value;
    const result = convertMd2Html(inMd);
    const outHtmlElm = document.getElementById("outHtml");
    outHtmlElm.value = result;
    outHtmlElm.style.display = "block";
  });
};
