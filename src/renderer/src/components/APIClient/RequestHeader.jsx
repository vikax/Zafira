import { createRoot } from 'react-dom/client'
import { React, useEffect } from 'react'
import $ from 'jquery'
import './requestheader.css'

let container = null
let headerContainer = null

function RequestHeader() {
    var requestHeaderElems = ['Add', 'DeleteAll', 'Refresh']

    useEffect(() => {
        console.log("header effect called")
    })

    var cachedHeaders = getDefaultTableRow()
    if (!cachedHeaders)
        cachedHeaders = []
    //console.log(defValue)
    return (
        <>
            <div className="header-options-container">
                {
                    requestHeaderElems.map((item) =>
                        <span className='header-options-span' onClick={addheader}>{item}</span>
                    )
                }
            </div>
            <div id="add-header" className="add-headers-container">
                <table>
                    <tbody id="headers-table">
                        <tr>
                            <td><input type='text' defaultValue='Content-Type' spellCheck="false" size='30'></input></td>
                            <td><input type='text' defaultValue='application/json' spellCheck="false" size='50'></input></td>
                            <td><button className="header-delete-button" onClick={deleterow}>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}


function populateHeadersTable() {
    var cachedHeaders = localStorage.getItem('httpheaders')
    httpHeaders = JSON.stringify(cachedHeaders)

    if (!cachedHeaders)
        cachedHeaders = []
    cachedHeaders.map((item) => {
        <tr>
            <td><input type='text' defaultValue={item.Key} size='30'></input></td>
            <td><input type='text' defaultValue={item.Value} size='50'></input></td>
            <button onClick={() => deleterow}>Delete</button>
        </tr>
    })
}

export function getDefaultTableRow() {

    // <tr>
    //                     <td><input type="text" placeholder='Key' size="30" defaultValue="Content-Type"></input></td>
    //                     <td><input type="text" placeholder='Value' size="50" defaultValue="application/json"></input></td>
    //                 </tr>
    var cachedHeaders = localStorage.getItem('httpheaders')
    console.log("cached local header")
    var headers = JSON.parse(cachedHeaders)

    return headers

    console.log(JSON.parse(cachedHeaders))
    console.log("length is: " + headers.length)

    var table = getTableElement(headers)
    //console.log(table)

    if (table) {
        var tt = document.createElement('table')
        var rr = document.createElement('tr')
        var tc1 = document.createElement('td')
        var tc2 = document.createElement('td')
        var inpKeyElem = document.createElement('input')
        var inpValueElem = document.createElement('input')
        var btn = document.createElement('button')

        tt.setAttribute('id', 'headers-table')

        inpKeyElem.setAttribute('size', "30")
        inpKeyElem.setAttribute('type', "text")
        inpKeyElem.setAttribute('defaultValue', "Content-Type")

        inpValueElem.setAttribute('size', "50")
        inpValueElem.setAttribute('type', "text")
        inpValueElem.setAttribute('defaultValue', 'application/json')

        tc1.appendChild(inpKeyElem)
        tc2.appendChild(inpValueElem)

        rr.appendChild(tc1)
        rr.appendChild(tc2)

        tt.appendChild(rr)


        btn.innerHTML = "Delete"

        /*
        return (
            <table id="headers-table">
                <tr>
                    <td><input type="text" placeholder='Key' size="30"></input></td>
                    <td><input type="text" placeholder='Value' size="50"></input></td>
                    <td><button>Delete</button></td>
                </tr>
            </table>
        )
            */

        return tt
    }
    return (table)

    /*
    return (
        <tr>
            <td><input type="text" placeholder='Key' size="30"></input></td>
            <td><input type="text" placeholder='Value' size="50"></input></td>
            <td><button>Delete</button></td>
        </tr>
    )
        */
}

function getTableElement(cachedHeaders) {
    //var table = document.getElementById('headers-table')
    console.log("length is: " + cachedHeaders.length)
    addRow(cachedHeaders)
}

function addRow(cachedHeaders) {

    var table = document.getElementById('headers-table')
    table.innerHTML = ""

    for (var i = 0; i < cachedHeaders.length; i++) {
        var row = table.insertRow(-1)
        var keycell = row.insertCell(0)
        var valuecell = row.insertCell(1)
        var btncell = row.insertCell(2)

        var keyelem = document.createElement('input')
        keyelem.setAttribute('type', 'text')
        keyelem.setAttribute('value', cachedHeaders[i].Key)
        keyelem.setAttribute('size', "30")

        var valueelem = document.createElement('input')
        valueelem.setAttribute('type', 'text')
        valueelem.setAttribute('value', cachedHeaders[i].Value)
        valueelem.setAttribute('size', "50")

        var btnelem = document.createElement('button')
        btnelem.innerText = "Delete"
        btnelem.addEventListener('click', deleterow, false)

        keycell.appendChild(keyelem)
        valuecell.appendChild(valueelem)
        btncell.appendChild(btnelem)
    }

}

function addheader(e) {
    var tag = e.target.innerHTML

    if (!container) {
        container = createRoot(document.getElementById('headers-table'))
    }
    if (tag == "Add") {
        var table = document.getElementById('headers-table')
        var row = table.insertRow(-1)
        var keycell = row.insertCell(0)
        var valuecell = row.insertCell(1)
        var btncell = row.insertCell(2)

        var keyelem = document.createElement('input')
        keyelem.setAttribute('type', 'text')
        keyelem.setAttribute('placeholder', 'Key')
        keyelem.setAttribute('size', "30")
        keyelem.setAttribute('spellcheck', false)

        var valueelem = document.createElement('input')
        valueelem.setAttribute('type', 'text')
        valueelem.setAttribute('placeholder', 'Value')
        valueelem.setAttribute('size', "50")
        valueelem.setAttribute('spellcheck', false)

        var btnelem = document.createElement('button')
        btnelem.innerText = "Delete"
        btnelem.addEventListener('click', deleterow, false)
        btnelem.setAttribute('class', 'header-delete-button')

        keycell.appendChild(keyelem)
        valuecell.appendChild(valueelem)
        btncell.appendChild(btnelem)
    }

    else if (tag == "DeleteAll") {
        container.render(
            <>
            </>
        )
    }

    else if (tag == "Refresh") {
        getTableElement(JSON.parse(localStorage.getItem('httpheaders')))
    }
}

function deleterow(e) {
    console.log("delete row")
    console.log(e.target)
    console.log(e.target.parentNode.parentNode)

    const index = e.target.rowIndex
    var parent = e.target.parentNode.parentNode
    parent.parentNode.removeChild(parent)
    console.log("index: " + index)
}

export function getTableValues() {
    var table = document.getElementById('headers-table')
    //console.log("getting table values")
    //console.log(table)

    var headers = []

    if (table) {
        var rowlen = table.rows.length
        for (var i = 0; i < rowlen; i++) {
            var cells = table.rows.item(i).cells
            var celllen = cells.length

            var key = cells.item(0).firstChild.value
            var val = cells.item(1).firstChild.value

            headers.push(
                {
                    "Key": key,
                    "Value": val
                }
            )

            //console.log(key)
            //console.log(val)



            /*
            for (var j = 0; j < celllen; j++) {
                var cellVal = cells.item(j)
                //console.log(cellVal)
                //console.log(cellVal.firstChild.value)
            }*/
        }
    }

    return headers
}

export default RequestHeader