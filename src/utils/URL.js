// url
let Url = ''
if (process.env.NODE_ENV === "production") {
     Url = "https://searchtrack-demo.herokuapp.com"
} else {
    Url =  "http://127.0.0.1:8000"
}

export { Url };
