module.exports = async (bot, member) => {
  if(member.guild.id === "491920833690861579") {
    let role = member.guild.roles.get(`491972749242269707`)
    member.addRole(role)
  }
}
