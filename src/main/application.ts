import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import WindowManager from "./WindowManager"
import is from "electron-is"
import * as path from "path"

class Application extends EventEmitter {
  windowManager!: WindowManager
  
  constructor() {
    super()
    
    this.initEggServer()
    
    this.initWindowManager()
  }
  
  initWindowManager() {
    this.windowManager = new WindowManager()
  }
  
  initEggServer() {
    if (is.dev()) {
      const scriptPath = path.join(__dirname, '../../startup.sh')
      const server = spawn(`sh`, [scriptPath])
      
      server.stdout.on('data', (data: Buffer) => {
        console.log('[Egg Server]:', data.toString())
      })
      
      server.stderr.on('data', (data: Buffer) => {
        console.error('[Egg Server]: error', data.toString())
      })
      
      server.on('close', () => {
        console.error('http server close！')
      })
    }
  }
}

export default Application
