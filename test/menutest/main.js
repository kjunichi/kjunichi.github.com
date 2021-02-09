const getContents = async (out,url) => {
    fetch(url)
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
    getContents(o, "https://kjunichi.github.io/link.html")
    console.log(`test end`)
}, false)

const elm2 = document.getElementById("lnk2")

elm.addEventListener("click", () => {
    console.log(`test start`)
    const o = document.getElementById("out")
    getContents(o, "")
    console.log(`test end`)
}, false)

const elm3 = document.getElementById("lnk3")

elm.addEventListener("click", () => {
    console.log(`test start`)
    location.href = "test.html"
    console.log(`test end`)
}, false)