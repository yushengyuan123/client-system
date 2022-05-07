const webpackMainConfig = require('./webpack.main.config')
const electron = require('electron')
const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')
const {
  logStats,
  electronRenderProcessLog,
  electronMainLog,
  greeting
} = require('./utils')
const {
  createServer
} = require('vite')


let electronProcess = null
let manualRestart = false

function startMainProcess() {
  return new Promise((resolve, reject) => {
    webpackMainConfig.mode = 'development'
    const compiler = webpack(webpackMainConfig)
    
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }
      
      logStats('Main', stats)
      
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()
        
        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
      
      resolve()
    })
  })
}

async function startRenderProcess() {
  const server = await createServer({
    configFile: path.join(__dirname, '../src/render/vite.config.ts'),
    root: path.join(__dirname, '../src/render'),
    server: {
      port: 2080
    }
  })
  
  await server.listen()
  server.printUrls()
}

function startElectron() {
  electronProcess = spawn(electron, [path.join(__dirname, '../dist/electron/main.js')])
  
  electronProcess.stdout.on('data', data => {
    electronMainLog(data, 'blue')
  })
  
  electronProcess.stderr.on('data', data => {
    electronMainLog(data, 'red')
  })
  
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function initProject() {
  greeting()
  
  Promise.all([startMainProcess(), startRenderProcess()])
    .then(() => {
      startElectron()
    })
}

initProject()
