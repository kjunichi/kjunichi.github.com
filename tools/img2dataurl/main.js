"use strict";

const con = document.getElementById("con");

con.innerHTML = "";

const image = new Image();
const myConv = (data) => {
    const myArray = data.split("");
    let counter = 0;
    let outStr = "";
    for (let i = 1; i <= myArray.length; i++) {
        outStr = outStr + myArray[i - 1];
        if (i % 76 === 0) {
            outStr = outStr + '\\' + "\n";
        }
    }
    return outStr;
};

image.onload = () => {
    const canvas = document.getElementById("world");
    const ctx = canvas.getContext("2d");

    //canvasのリサイズ
    canvas.width = 114;
    canvas.height = 114;

    ctx.drawImage(image, 0, 0, 114, 114);
    //ダウンロードリンクの作成

    const texta = document.getElementById("dataurl");
    const type = document.getElementById("imgType");
    texta.value = canvas.toDataURL(type.value);
};

//ドロップされるエリアの取得
const dropArea = document.getElementById('dropImg');
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
}, false);
dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
}, false);
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();

    con.innerText = "Drop start";
    const file = e.dataTransfer.files[0];
    if (!file.type.match(/image\/(jpeg|png|gif|svg)/)[1]) {
        // 指定したファイル以外の場合、処理を続行しない。
        e.stopPropagation();
        return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        con.innerText = 'Reader onload start';
        image.src = reader.result;
        con.innerText = 'Reader onload end';
    };

    reader.readAsDataURL(file);
    e.stopPropagation();
    con.innerText = "Drop end";
}, false);
