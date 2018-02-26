const { oneLine } = require('common-tags')

module.exports = (client) => {
  client.log.warn(oneLine`
    You are being rate limited!
    ${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}
  `)

  // Webhook
  if (client.config.webhook.enabled) {
    if (client.config.webhook.clientEvents.rateLimit) {
      client.webhook({
        content: '',
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [{
          author: { name: client.user.tag, icon_url: client.user.displayAvatarURL() },
          footer: { text: 'rateLimit' },
          timestamp: new Date(),
          title: `rateLimit${client.shard ? ` | Shard ID: ${client.shard.id}` : ''}`,
          description: `You are being rate limited!`,
          color: 0xFFFF00
        }]
      })
    }
  }
}
