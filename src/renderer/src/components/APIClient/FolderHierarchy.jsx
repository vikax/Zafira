import { useEffect } from 'react'
import './folderhierarchy.css'

let counter = 0
let idCounter = 1
let lengthLimit = 11
let savedFiles = []
const cachedFiles = localStorage.getItem('savedFiles')
if (cachedFiles) {
    const filess = JSON.parse(cachedFiles)
    savedFiles = filess
}

function FolderHierarchy() {

    useEffect(() => {
        console.log("use effect for rendering files")
        renderSavedFiles()
    })

    return (
        <div className="folder-container">
            <div className='folder-top-container'>
                <p id='saved-reuests'>Saved Requests</p>
                <input id="file-search" type='text' placeholder='Filter' onChange={searchFile}></input>
                <span id="custom-add-button" onClick={addRequestFile}>+</span>
            </div>
            <div className="http-request-saved-files-container">
            </div>


        </div>
    )
}

function searchFile(e) {
    const fileToFind = e.target.value;
    console.log(fileToFind)
}

function renameRequest(e) {
    console.log(e.target)
    console.log(e.target.parentNode)

    var input = e.target.parentNode
    var inpval = input.querySelector('#popup-input').value
    //console.log(inpval)
    //console.log(e.target.parentNode.parentNode)
    console.log(e.target.parentNode.parentNode.parentNode)

    if (!inpval) {
        alert("Please enter valid name or cancel renaming")
        return
    }

    const len = inpval.length
    const originalInputVal = inpval

    if (len > lengthLimit) {
        var substr = inpval.substring(0, lengthLimit + 1)
        console.log(substr)
        substr = substr + '..'
        inpval = substr
    }
    console.log(inpval)

    var parentContainer = e.target.parentNode.parentNode.parentNode;
    const pID = parentContainer.getAttribute('id')
    console.log(pID)
    var existingName = e.target.parentNode.parentNode.parentNode.querySelector('.span-request')
    const originalStr = existingName
    existingName.innerHTML = inpval

    var popup = e.target.parentNode.parentNode
    popup.style.display = 'none'

    //var existingFile = savedFiles.find(item => item.Id == pID)
    //console.log(existingFile)

    //savedFiles = savedFiles.filter(item => item.Id != pID)

    for (var i = 0; i < savedFiles.length; i++) {
        if (savedFiles[i].Id == pID) {
            savedFiles[i].NewName = originalInputVal
        }
    }

    /*
const { v4: uuidv4 } = require('uuid');
const random_uuid = uuidv4();
console.log(random_uuid);
    */

    console.log(savedFiles)
    localStorage.removeItem('savedFiles', savedFiles)


    localStorage.setItem('savedFiles', JSON.stringify(savedFiles, null, 4))

}


function showPopup(parent) {
    console.log(parent.parentNode)
    var popup = parent.parentNode
    var pWindow = popup.querySelector('.popup-window')
    pWindow.style.display = 'initial'
}

function hidePopup(parent) {
    console.log(parent.parentNode)
    var popup = parent.parentNode
    var pWindow = popup.querySelector('.popup-window')
    pWindow.style.display = 'none'
}

function cancelRequest(e) {
    console.log(e.target)
    console.log(e.target.parentNode)
    console.log(e.target.parentNode.parentNode)

    var popup = e.target.parentNode.parentNode
    popup.style.display = 'none'
}

function deleteFile(e) {
    console.log(e.target.parentNode)
    var menuParent = e.target.parentNode
    var topParent = menuParent.parentNode.parentNode
    topParent.removeChild(menuParent.parentNode)
}

function renameFile(e) {
    console.log(e.target.parentNode)
    var parent = e.target.parentNode
    if (parent) {
        showPopup(parent)
        parent.style.display = 'none'
    }

}

function cancelFile(e) {
    console.log(e.target)
    console.log(e.target.parentNode)

    if (e.target.parentNode) {
        e.target.parentNode.style.display = 'none'
    }
}

function hideMenu() {
    var menu = document.querySelector('.menu')
    menu.style.display = 'none'
}

function showOptions(e) {
    console.log(e.target)
    console.log(e.target.nextSibling)

    var nextNode = e.target.nextSibling
    if (nextNode) {
        if (nextNode.style.display == 'none') {
            nextNode.style.display = 'initial'
        }
        else {
            nextNode.style.display = 'none'
        }
    }

}


function removeRequest(e) {
    //console.log(e.target.parentNode)
    var tableBody = document.querySelector('.http-request-saved-files-container')

    tableBody.removeChild(e.target.parentNode)
}

function showOptionIcon(e) {
    console.log('inside show options')
    console.log(e.target)
    if (e.target.childNodes[2]) {

        console.log(e.target.childNodes[2])

        var iconElem = e.target.childNodes[2]
        iconElem.style.display = 'initial'
    }
}

function hideOptionIcon(e) {
    console.log('inside hide options')
    console.log(e.target)
    if (e.target.childNodes[2]) {
        var iconElem = e.target.childNodes[2]
        iconElem.style.display = 'none'
    }
}

function renderSavedFiles() {
    var parentContainer = document.querySelector('.http-request-saved-files-container')
    parentContainer.innerHTML = ""
    console.log(savedFiles)
    if (savedFiles && savedFiles.length > 0) {
        savedFiles.map((item) =>
            addNewFile(parentContainer, item.Method, item.NewName, item.Id)
        )
    }

}

function addNewFile(parentContainer, fMethod, qName, fId) {
    var divElem = document.createElement('div')
    var spanMethod = document.createElement('span')
    var spanReq = document.createElement('span')
    var icon = document.createElement('i')

    // Create drpdown menu
    var menu = document.createElement('ul')
    menu.setAttribute('id', 'file-menu')
    menu.setAttribute('class', 'menu')

    var renameOption = document.createElement('li')
    var deleteOption = document.createElement('li')
    var cancelOption = document.createElement('li')
    renameOption.innerHTML = 'Rename'
    deleteOption.innerHTML = 'Delete'
    cancelOption.innerHTML = 'Cancel'
    renameOption.addEventListener('click', renameFile, false)
    deleteOption.addEventListener('click', deleteFile, false)
    cancelOption.addEventListener('click', cancelFile, false)

    menu.appendChild(renameOption)
    menu.appendChild(deleteOption)
    menu.appendChild(cancelOption)

    // Create popup for rename
    var renamePopup = document.createElement('div')
    var renameIntro = document.createElement('p')
    var renameArea = document.createElement('div')
    var renameInput = document.createElement('input')
    var renameButton = document.createElement('button')
    var cancelButton = document.createElement('button')

    renamePopup.setAttribute('class', 'popup-window')
    renameIntro.setAttribute('id', 'rename-intro')
    renameIntro.appendChild(document.createTextNode('Enter new file name'))
    renameArea.setAttribute('class', 'rename-area')
    renameInput.setAttribute('id', 'popup-input')
    renameInput.setAttribute('size', '60')
    renameInput.setAttribute('placeholder', 'enter file name')
    renameButton.setAttribute('id', 'rename-button')
    cancelButton.setAttribute('id', 'cancel-button')
    renameButton.innerHTML = 'Rename'
    cancelButton.innerHTML = 'Cancel'
    renameButton.addEventListener('click', renameRequest, false)
    cancelButton.addEventListener('click', cancelRequest, false)

    renameArea.appendChild(renameInput)
    renameArea.appendChild(renameButton)
    renameArea.appendChild(cancelButton)
    renamePopup.appendChild(renameIntro)
    renamePopup.appendChild(renameArea)

    const textNodeMethod = document.createTextNode(fMethod)
    console.log('name is ' + qName)
    var reqName = qName
    if (reqName.length > lengthLimit) {
        reqName = reqName.substring(0, lengthLimit + 1)
        reqName = reqName + ".."
    }

    const textNodeReq = document.createTextNode(reqName)

    spanMethod.appendChild(textNodeMethod)
    spanReq.appendChild(textNodeReq)
    spanMethod.setAttribute('class', 'span-method')
    spanReq.setAttribute('class', 'span-request')

    divElem.setAttribute('class', 'requests-container')
    //divElem.addEventListener('mouseover', showOptionIcon)
    //divElem.addEventListener('mouseout', hideOptionIcon)

    divElem.appendChild(spanMethod)
    divElem.appendChild(spanReq)

    icon.style.display = 'initial'
    icon.setAttribute('class', "shortcut-icons glyphicon glyphicon-option-vertical")
    icon.setAttribute('id', 'glyph-icon')
    icon.innerHTML = '...'
    icon.addEventListener('click', showMenu, false)
    divElem.appendChild(icon)

    parentContainer.appendChild(divElem)

    divElem.appendChild(menu)
    divElem.appendChild(renamePopup)
    divElem.setAttribute('id', fId)
}

function addRequestFile() {
    var tableBody = document.querySelector('.http-request-saved-files-container')
    var divElem = document.createElement('div')
    var spanMethod = document.createElement('span')
    var spanReq = document.createElement('span')
    var icon = document.createElement('i')

    // Create drpdown menu
    var menu = document.createElement('ul')
    menu.setAttribute('id', 'file-menu')
    menu.setAttribute('class', 'menu')

    var renameOption = document.createElement('li')
    var deleteOption = document.createElement('li')
    var cancelOption = document.createElement('li')
    renameOption.innerHTML = 'Rename'
    deleteOption.innerHTML = 'Delete'
    cancelOption.innerHTML = 'Cancel'
    renameOption.addEventListener('click', renameFile, false)
    deleteOption.addEventListener('click', deleteFile, false)
    cancelOption.addEventListener('click', cancelFile, false)

    menu.appendChild(renameOption)
    menu.appendChild(deleteOption)
    menu.appendChild(cancelOption)

    // Create popup for rename
    var renamePopup = document.createElement('div')
    var renameIntro = document.createElement('p')
    var renameArea = document.createElement('div')
    var renameInput = document.createElement('input')
    var renameButton = document.createElement('button')
    var cancelButton = document.createElement('button')

    renamePopup.setAttribute('class', 'popup-window')
    renameIntro.setAttribute('id', 'rename-intro')
    renameIntro.appendChild(document.createTextNode('Enter new file name'))
    renameArea.setAttribute('class', 'rename-area')
    renameInput.setAttribute('id', 'popup-input')
    renameInput.setAttribute('size', '60')
    renameInput.setAttribute('placeholder', 'enter file name')
    renameButton.setAttribute('id', 'rename-button')
    cancelButton.setAttribute('id', 'cancel-button')
    renameButton.innerHTML = 'Rename'
    cancelButton.innerHTML = 'Cancel'
    renameButton.addEventListener('click', renameRequest, false)
    cancelButton.addEventListener('click', cancelRequest, false)

    renameArea.appendChild(renameInput)
    renameArea.appendChild(renameButton)
    renameArea.appendChild(cancelButton)
    renamePopup.appendChild(renameIntro)
    renamePopup.appendChild(renameArea)


    // Create popup for delete
    // var deletePopup = document.createElement('div')
    // var deleteIntro = document.createElement('p')
    // var deleteArea = document.createElement('div')
    // var deleteInput = document.createElement('input')
    // var deleteButton = document.createElement('button')


    const textNodeMethod = document.createTextNode('GET ')
    var reqName = "NewRequest"
    if (reqName.length > lengthLimit) {
        reqName = reqName.substring(0, lengthLimit + 1)
        reqName = reqName + ".."
    }

    const textNodeReq = document.createTextNode(reqName)

    spanMethod.appendChild(textNodeMethod)
    spanReq.appendChild(textNodeReq)
    spanMethod.setAttribute('class', 'span-method')
    spanReq.setAttribute('class', 'span-request')

    divElem.setAttribute('class', 'requests-container')
    //divElem.addEventListener('mouseover', showOptionIcon)
    //divElem.addEventListener('mouseout', hideOptionIcon)

    divElem.appendChild(spanMethod)
    divElem.appendChild(spanReq)

    icon.style.display = 'initial'
    icon.setAttribute('class', "shortcut-icons glyphicon glyphicon-option-vertical")
    icon.setAttribute('id', 'glyph-icon')
    icon.innerHTML = '...'
    icon.addEventListener('click', showMenu, false)
    divElem.appendChild(icon)

    tableBody.appendChild(divElem)

    divElem.appendChild(menu)
    divElem.appendChild(renamePopup)

    const idd = "request_" + idCounter.toString()
    divElem.setAttribute('id', idd)
    idCounter = idCounter + 1
    savedFiles.push(
        {
            "Id": idd,
            "Method": "GET ",
            "NewName": "NewRequest",
            "PreName": "NewRequest"
        }
    )
    console.log(savedFiles)
    localStorage.setItem('savedFiles', JSON.stringify(savedFiles, null, 4))
}

function showMenu(e) {
    console.log(e.target)
    var menu = e.target.parentNode.querySelector(".menu")
    //var popWindow = e.target.parentNode.querySelector(".popup-window")
    menu.style.display = 'initial'
    //popWindow.style.display = 'initial'
    console.log('menu clicked')
}

export default FolderHierarchy
