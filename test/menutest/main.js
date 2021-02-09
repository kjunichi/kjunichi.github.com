const getContents = async (out) => {
    fetch('https://kjunichi.github.io/link.html')
        .then(async (response) => {
            response.text().then(text => {
                out.innerText = text
            })
            console.log(t)
        })
}

const elm = document.getElementById("lnk1")

elm.addEventListener("click", () => {
    console.log(`test start`)
    const o = document.getElementById("out")
    getContents(o)
    console.log(`test end`)
}, false)