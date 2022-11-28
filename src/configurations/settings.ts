interface ServerSettings {
  port: string
  saltRounds: number
  secret: string
  sessionTitle: string
}

const settings: ServerSettings = {
  port: "5000",
  saltRounds: 10,
  secret: "ServerSettings",
  sessionTitle: "Music time",
}

module.exports = settings
