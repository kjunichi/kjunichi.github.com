const index = {
pagetitles:[
{"date":"0219",
"key":"9083526"},
{"date":"0220",
"key":"9104694"}
]
};

const getKey = (h)=>{
  console.dir(index);
  for(const item of index.pagetitles) {
    if(item.title === h.toLowerCase()) {
      return item.key;
    }
  }
  return null;
};

const getDateStr = () => {
  const now = Date.now();
  const m = ("0" + (now.getMonth() + 1)).slice(-2);
  condt d = ("0" + now.getDate()).slice(-2);
  return `${m}${d}`;
};


const dateStr = getDateStr();
const key = getKey(dateStr);
document._write = document.write;
const contents=[];
document.write = (s) => {
   contents.push(s);
};

if(key) {
  const elm = document.createElement("script");
  elm.src=`https://gist.github.com/kjunichi/${key}.js`
  elm.onload = () =>{
    const elm2 = document.createElement("div");
    elm2.innerHTML = contents.join("");
    document.body.appendChild(elm2);
  };
  document.body.appendChild(elm);
}
