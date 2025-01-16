import { contextBridge, ipcRenderer } from "electron"

/*
if(!contextIsolation){
  throw new Error('context not isolated')
}
*/

try{
  contextBridge.exposeInMainWorld('elec', {
    sayHello: (message) => ipcRenderer.send('sayhello', message),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    sendRequest: (url) => ipcRenderer.invoke('sendRequest'),
    getDatabases: () => ipcRenderer.invoke('getDatabases')
  })
}catch(err){
  console.log(err)
}
