let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
    if (!text) throw `Harap masukan judulnya\n\n\nContoh : .xnxx segs brutal`
    let res = await fetch(`https://api.lolhuman.xyz/api/xnxxsearch?apikey=HitomiBot&query=${text}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let keqing = json.result.map((v, i) => `#${i + 1}. \n*Title:* ${v.title}\n*Info:* ${v.info}\n*Link:* ${v.link}\n==============\n`).join('\n') 
    if (json.status) m.reply(keqing)
    else throw json
}

handler.command = /^(xnxx)$/i

handler.private = true
handler.premium = true
handler.limit = 6

module.exports = handler
