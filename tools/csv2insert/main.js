"use strict";

( () => {
    const procMain = (data) => {
      
      const putInsert = (headers,items)=> {
        // 列名の取得
        const head = headers.trim().split("\t")
        
        const item = items.trim().split("\t")
        const out = []
        out.push( `insert into ${tableName} (`)
        for(let i = 0; i< head.length-1; i++) {
          out.push(`${head[i]},`)
        }
        out.push(`${head[head.length-1]}\n) values (\n`)
        
        for(let i = 0; i< item.length-1; i++) {
          const tmpItem = item[i]
          if(tmpItem.startsWith("TO_DATE(")) {
            // 日付項目の場合
            out.push(`${tmpItem},`)
          } else {
            out.push(`'${tmpItem}',`)
          }
        }
        const tmpItem = item[item.length-1];
        if(tmpItem.startsWith("TO_DATE(")) {
            // 日付項目の場合
            out.push(`${tmpItem}\n);`)
        } else {
            out.push(`'${tmpItem}'\n);`)
        }
        //out.push(`'${item[item.length-1]}'\n)`)
        
        return out.join("")
      } // end of putInsert
      
      let tableName = document.getElementById("tableName").value
      
      const lines = data.split("\n")
      
      // 1行目の列名を取得
      const headers = lines[0]
      //console.log(headers.split("\t"))
      
      const buf=[]
      for(let i = 1; i < lines.length; i++) {
        const items = lines[i]
        const item = items.split("\t")
        const outLine = putInsert(headers,items)
        buf.push(outLine)
      }
      const elm = document.getElementById("output")
      //elm.innerText = buf
      const aFileParts = []
      aFileParts.push(buf.join('\n'))
      aFileParts.push('\n')
      const outBlob = new Blob(aFileParts, {type: 'text/plain'})
      const sqlUrl = URL.createObjectURL(outBlob)
      const link = document.createElement('A')
      link.href=sqlUrl
      link.innerHTML = "Download"
      elm.appendChild(link)
      console.log("Done!")
    
    }
    
    const dropArea = document.getElementById('drop')
    
    dropArea.addEventListener('dragenter', (e) => {
    }, false)

    dropArea.addEventListener('dragover', (e) => {
        dropArea.style.backgroundColor="#229922";
    }, false);
    
    dropArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor="#88DD88";
    }, false);

    dropArea.addEventListener('drop', (e) => {
        console.log('Drop start');
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        // Fileの種類は
        // file.type で調べることが可能な模様

        const reader = new FileReader();
        reader.onload = (e) => {
            // ファイルの読み込み
            const data = e.target.result
            //console.log(data)
            // メイン処理開始
            procMain(data)
        };
        // ドロップされるファイルはテキストファイルとみなして処理する。
        reader.readAsText(file)
        dropArea.style.backgroundColor="#88DD88"
        console.log('Drop end')
    }, false)

    document.body.addEventListener('dragover', (e) => {
        e.preventDefault()
    }, false)

})()
