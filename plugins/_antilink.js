let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 ANTI LINK 」*\n\nDetected *${await conn.getName(m.sender)}* Kamu telah mengirim Link!\n\nSorry kamu akan ku kick di grup ini byee!`)
    if (isAdmin) return m.reply('*Eh sorry kamu admin, aku tdk akan mengekick mu. hehe..*')
    if (!isBotAdmin) return m.reply('*Bot blm jadi admin, Gimana cara ngekick membernya_-*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*「 ANTI LINK 」*\n\n Akses Di Tolak, Bot tdk akan mengekick mu\nKarena Tautan Yg Lu Kirim Adalah milik grup ini')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


