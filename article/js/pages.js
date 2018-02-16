const index = {
pagetitles:[
{"title":"linux",
"key":"6374047"},
{"title":"macos",
"key":"6017741"}
]
};
const getKey = (h)=>{
  for(const item of index.pagetitles) {
    if(item.title === h.toLowerCase()) {
      return item.key;
    }
  }
  return null;
};

console.log(location.hash);
if(location.hash) {
  const hash = location.hash.substring(1);
  const key = getKey(hash);
  if(key) {
    const elm = document.createElement("script");
    elm.src=`https://gist.github.com/kjunichi/${key}.js`
    document.body.appendChild(elm);
  }
}
