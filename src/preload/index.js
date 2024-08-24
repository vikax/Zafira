import { contextBridge } from "electron"

if(!contextIsolated){
  throw new Error('context not isolated')
}

try{
  contextBridge.exposeInMainWorld('context', {

  })
}catch(err){
  console.log(err)
}
