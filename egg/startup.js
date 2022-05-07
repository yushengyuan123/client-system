const Command = require("egg-bin")

function startupEggServer() {
  console.log('http服务启动')
  process.argv[2] = 'dev'
  new Command().start()
}

startupEggServer()
