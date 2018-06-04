( () => {
    const procMain = (data) => {
      let tableName = document.getElementById("tableName").value
      const putInsert = (headers,items)=> {
        const head = headers.trim().split("\t")
        const item = items.trim().split("\t")
        
        let out = `insert into ${tableName} (`
        for(let i = 0; i< head.length-1; i++) {
          out += `${head[i]},`
          
        }
        out += `${head[head.length-1]}) values (`
        for(let i = 0; i< item.length-1; i++) {
          out += `'${item[i]}',`
          
        }
        out += `'${item[item.length-1]}')`
        return out
      }
    
      const lines = data.split("\n")
      const headers = lines[0]
      console.log(headers.split("\t"))
      let buf=""
      for(let i = 1; i < lines.length; i++) {
        const items = lines[i]
        const item = items.split("\t")
        const outLine = putInsert(headers,items)
        buf += outLine + "\n"
      }
      const elm = document.getElementById("output")
      //elm.innerText = buf
      const aFileParts = []
      aFileParts[0]=buf
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
            var data = e.target.result
            //console.log(data)
            procMain(data)
        };
        //reader.readAsArrayBuffer(file);
        reader.readAsText(file)
        dropArea.style.backgroundColor="#88DD88"
        console.log('Drop end')
    }, false)

    document.body.addEventListener('dragover', (e) => {
        e.preventDefault()
    }, false)

})()
