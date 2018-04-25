let index;

// functions 
const getKey = (h) => {
    console.dir(index);
    for (const item of index.pagetitles) {
        if (item.date === h) {
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

const writeTodayArticle = (cb, elm) => {
    const dateStr = getDateStr();
    document.title = `Today(${dateStr})`;

    fetch('./data/today.json').then((res) => {
        return res.json();
    }).then((json) => {
        index = json;

        const key = getKey(dateStr);
        document._write = document.write;
        const contents = [];
        document.write = (s) => {
            contents.push(s);
        };

        if (key) {
            const scriptElm = document.createElement("script");
            scriptElm.src = `https://gist.github.com/kjunichi/${key}.js`
            scriptElm.onload = () => {
                let elm2;
                if (!elm) {
                    elm2 = document.createElement("div");
                } else {
                    elm2 = elm;
                }
                elm2.innerHTML = contents.join("");
                if (!elm) {
                    document.body.appendChild(elm2);
                }
                cb();
            };
            document.body.appendChild(scriptElm);
        }
    });

};
// main
