import {
  app,
  BrowserWindow
} from "electron"
import electronConfig from "../config/electronConfig"
import * as is from "electron-is"
type Pages = 'main'

type WindowsMap = Map<Pages, BrowserWindow>

export default class WindowManager {
  window!: BrowserWindow
  windows!: WindowsMap
  
  constructor() {
    this.windows = new Map()
    
    this.createWindows()
  }
  
  createWindows() {
    app.whenReady().then(() => {
      this.window = new BrowserWindow({
        ...electronConfig
      })
      
      this.windows.set('main', this.window)
      
      const debugAddress = 'http://localhost:2080/'
      
      if (is.dev()) {
        this.window.loadURL(debugAddress)
        this.window.webContents.openDevTools({
          mode: 'detach'
        })
      }
    })
  }
  
  getWindow() {
    return this.window
  }
  
  getWindows() {
    return this.windows
  }
  
  getWindowList() {
    const windowArr = []
    const windowsMap = this.getWindows()
    
    for (const [key, windowIns] of windowsMap) {
      windowArr.push(windowIns)
    }
    
    return windowArr
  }
}

