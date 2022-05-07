"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electronConfig_1 = __importDefault(require("../config/electronConfig"));
const is = __importStar(require("electron-is"));
const global_1 = require("../global");
var ResizeDirection;
(function (ResizeDirection) {
    ResizeDirection["Align"] = "Align";
    ResizeDirection["Justify"] = "Justify";
    ResizeDirection["Diagonal"] = "Diagonal";
})(ResizeDirection || (ResizeDirection = {}));
class WindowManager {
    window;
    windows;
    constructor() {
        this.windows = new Map();
        this.createWindows();
    }
    createWindows() {
        electron_1.app.whenReady().then(() => {
            this.window = new electron_1.BrowserWindow({
                ...electronConfig_1.default
            });
            this.windows.set('main', this.window);
            const debugAddress = 'http://localhost:1337/';
            if (is.dev()) {
                this.window.loadURL(debugAddress);
                this.window.webContents.openDevTools({
                    mode: 'detach'
                });
            }
            this.window.on('will-resize', (event, newBounds) => {
                event.preventDefault();
                // 0表示宽度 1表示高度
                const curSize = this.window.getSize();
                const curWidth = curSize[0];
                const curHeight = curSize[1];
                let resizeDirection;
                if (curWidth !== newBounds.width &&
                    curHeight !== newBounds.height) {
                    resizeDirection = ResizeDirection.Diagonal;
                }
                else if (curWidth !== newBounds.width) {
                    resizeDirection = ResizeDirection.Justify;
                }
                else {
                    resizeDirection = ResizeDirection.Align;
                }
                switch (resizeDirection) {
                    // 拉伸高度
                    case ResizeDirection.Align: {
                        this.window.setContentSize(~~(newBounds.height * global_1.AspectRatio.SixteenToNine), newBounds.height);
                        break;
                    }
                    // 拉伸宽度
                    case ResizeDirection.Justify: {
                        this.window.setContentSize(newBounds.width, ~~(newBounds.width / global_1.AspectRatio.SixteenToNine));
                        break;
                    }
                    case ResizeDirection.Diagonal: {
                        this.window.setContentSize(newBounds.width, newBounds.height);
                        break;
                    }
                }
            });
        });
    }
    getWindow() {
        return this.window;
    }
    getWindows() {
        return this.windows;
    }
    getWindowList() {
        const windowArr = [];
        const windowsMap = this.getWindows();
        for (const [key, windowIns] of windowsMap) {
            windowArr.push(windowIns);
        }
        return windowArr;
    }
    sendCommandTo(window, channel, ...args) {
        if (!window) {
            return;
        }
        console.log(args);
        window.webContents.send(channel, ...args);
    }
}
exports.default = WindowManager;
//# sourceMappingURL=index.js.map