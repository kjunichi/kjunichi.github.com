(() => {
  const procMain = (data,maxCount) => {

    const incNum = (item, num) => {
       const getNumPos = (item) => {
        for (let i = 0; i < item.length; i++) {
          if (isFinite(item[i])) {
            return i;
          }
        }
      }
      const getNumLen = (item) => {
        const pos = getNumPos(item)
        return item.length - pos
      }

      const getNum = (item) => {
        return item.substr(getNumPos(item))
      }
      const getPrefix = (item) => {
        return item.substr(0, getNumPos(item) - 1)
      }
      const padNum = (num, len) => {
        let pd = ""
        for (let i = 0; i < len; i++) {
          pd = pd + "0"
        }
        return (pd + num).substr(-len)
      }
      
      if(/^[1-9].*/.test(item)) {
        return parseInt(item)+num
      } else {
        let id = item

        //console.log(getNumPos(id))
        //console.log(getNumLen(id))
        //console.log(getNum(id))
        //console.log(getPrefix(id))
        const prefix = getPrefix(id)
        let numPart = parseInt(getNum(id))

        
        numPart = parseInt(numPart) + num
        numPart = padNum(numPart, getNumLen(id))
        return `${prefix}${numPart}`
      }
    } // incNum

    // ファイルを行単位で処理していく
    const lines = data.split("\n")

    // 1行目の列名を取得
    const startValue = lines[0].split("\t")
    console.dir(startValue)

    // 2行目の増減フラグを取得
    const incFlg = (lines[1].trim()).split("\t")

    
    
    let buf=[]
    for (let i = 0; i < maxCount; i++) {
      // 列ごとに処理
      linebuf = []
      for (let j = 0; j < startValue.length; j++) {
        if (incFlg[j] === "-") {
          linebuf.push(startValue[j])
        } else if (incFlg[j] === "+") {
          linebuf.push(incNum(startValue[j], i))
        } else {
          console.log(` ${j}: not implement yet. flag = [${incFlg[j]}]`)
        }
      }
      buf.push(linebuf.join("\t"))
    }

    const elm = document.getElementById("output")

    const aFileParts = []
    aFileParts.push(buf.join("\n"))
    aFileParts.push("\n")
    const outBlob = new Blob(aFileParts, {
      type: 'text/plain'
    })
    const sqlUrl = URL.createObjectURL(outBlob)
    const link = document.createElement('A')
    link.href = sqlUrl
    link.innerHTML = "Download"
    elm.appendChild(link)
    console.log("Done!")

  }

  const dropArea = document.getElementById('drop')

  dropArea.addEventListener('dragenter', (e) => {}, false)

  dropArea.addEventListener('dragover', (e) => {
    dropArea.style.backgroundColor = "#229922";
  }, false);

  dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#88DD88";
  }, false);

  dropArea.addEventListener('drop', (e) => {
    console.log('Drop start')
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    // Fileの種類は
    // file.type で調べることが可能な模様

    const reader = new FileReader()
    reader.onload = (e) => {
      // ファイルの読み込み
      const data = e.target.result
      //console.log(data)
      const maxCount = document.getElementById("num").value
      procMain(data,maxCount)
    };
    //reader.readAsArrayBuffer(file)
    reader.readAsText(file)
    dropArea.style.backgroundColor = "#88DD88"
    console.log('Drop end')
  }, false)

  document.body.addEventListener('dragover', (e) => {
    e.preventDefault()
  }, false)

})()
