const pluralize = require('pluralize')

module.exports = async (client) => {
  await client.log.info(`Logged in as ${client.user.tag} (${client.user.id})`, 'Discord')
  await client.user.setStatus(client.config.loginConfig.defaultStatus)
  await client.user.setActivity(`${client.config.startConfig.commandPrefix}help | ${pluralize('Guild', client.guilds.size, true)} | ${pluralize('User', client.users.size, true)}${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}`)
  await setInterval(function () {
    client.user.setStatus(client.lastSetStatus).then(
      client.user.setActivity(`${client.config.startConfig.commandPrefix}help | ${pluralize('Guild', client.guilds.size, true)} | ${pluralize('User', client.users.size, true)}${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}`)
    )
  }, 600000)
  await client.log.info(client.shard ? `Shard ${client.shard.id} ready!` : 'Client ready!', 'Client', 'bgGreen')

  // Webhook
  if (client.config.webhookConfig.enabled) {
    if (client.config.webhookConfig.clientEvents.ready) {
      client.webhook({
        content: '',
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [{
          author: { name: client.user.tag, icon_url: client.user.displayAvatarURL() },
          footer: { text: 'ready' },
          timestamp: new Date(),
          title: `ready${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}`,
          description: `${client.shard ? `Shard ${client.shard.id}` : 'Master'} is ready!`,
          color: 0x00AA00
        }]
      })
    }
  }
}
