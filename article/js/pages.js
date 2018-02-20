let index;

// functions
const getKey = (h)=>{
  console.dir(index);
  for(const item of index.pagetitles) {
    if(item.title === h.toLowerCase()) {
      return item.key;
    }
  }
  return null;
};

// main
console.log(location.hash);
fetch('./data/page.json').then((res)=>{
  return res.json();
}).then((json)=>{
  index = json;
  if(location.hash) {
    const hash = location.hash.substring(1);
    const key = getKey(hash);
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
  }
});
