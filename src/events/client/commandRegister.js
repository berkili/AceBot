const { stripIndents } = require('common-tags')

module.exports = (client, command, registry) => {
  var eventName = client.getFileName(__filename)
  client.log('info', stripIndents`
    ${client.shard ? `Shard ID: ${client.shard.id}` : ''}
  `, 'Command Register', `${command.memberName} (${command.groupID})`)

  // Webhook
  if (client.config.webhook.enabled) {
    if (client.config.webhook.clientEvents[eventName]) {
      client.webhook({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [{
          footer: { text: eventName },
          timestamp: new Date(),
          title: `Command Registered${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}`,
          description: `${command.memberName} \`(${command.groupID})\``,
          color: 0x00FFFF
        }]
      })
    }
  }
}
