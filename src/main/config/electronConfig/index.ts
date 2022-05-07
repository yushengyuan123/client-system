import type {
  BrowserWindowConstructorOptions
} from "electron"
import * as is from "electron-is"
import * as path from "path"

const electronConfig: BrowserWindowConstructorOptions = {
  width: 838,
  height: 768,
  backgroundColor: is.macOS() ? '#00000000' : '#FFF',
  webPreferences: {
    // preload: path.join(__dirname, 'renderPreload.ts'),
    contextIsolation: false,
    webSecurity: !is.dev()
  },
  titleBarStyle: 'hiddenInset',
}

export default electronConfig