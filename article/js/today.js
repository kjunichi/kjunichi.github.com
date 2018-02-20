let index;

const getKey = (h)=>{
  console.dir(index);
  for(const item of index.pagetitles) {
    if(item.date === h) {
      return item.key;
    }
  }
  return null;
};

const getDateStr = () => {
  const now = new Date(Date.now());
  const m = ("0" + (now.getMonth() + 1)).slice(-2);
  const d = ("0" + now.getDate()).slice(-2);
  return `${m}${d}`;
};

fetch('./data/today.json').then((res)=>{
  index = res.json();
  
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

});

