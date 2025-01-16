import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { FileSync } = require('lowdb/adapters/FileSync')
const { low } = require('lowdb')

async function openFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
  return filePaths[0]
  }
}


async function sendRequest(url){
  console.log(url)
  const resp = await fetch(url)
  const respJson = await resp.json()
  console.log(respJson)
}

async function getDatabases() {
    console.log('calling db inside main')

    var url = 'http://127.0.0.1:3000/databases'

    var resp = await fetch(url)
    const respJson = await resp.json()

    //console.log(respJson.databases)

    var list = []
    if (respJson.databases) {
        respJson.databases.forEach(item => {
            list.push(item.name)
        })
    }

    console.log(list)

    return list
}

async function createWindow() {
  try {
    const adapter =  new FileSync('db.json')
    const db = low(adapter)

    db.defaults({requestFiles: []}).write()


    const rFile =
    {
      'id': 1,
      'method': 'get',
      'fileName': 'imageUpload'
    }
    db.get('requestFiles').push(rFile).write()

    const rfiless = db.get('requestFiles')
    console.log(rfiless)
  } catch (error) {
    console.log(error)
  }
  console.log('loggin index html')
  console.log(join(__dirname, '../renderer/index.html'))
  //console.log(process.env)
  console.log(process.env['ELECTRON_RENDERER_URL'])
  console.log(join(__dirname, '../preload/index.js'))

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  //ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('sayhello', (event, message) => {
    console.log(message)
  })

  ipcMain.handle('dialog:openFile', openFile)

  ipcMain.handle('sendRequest', (event, url) => {
    sendRequest(url)
  })

  ipcMain.handle('getDatabases', async() => {
    getDatabases()
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
