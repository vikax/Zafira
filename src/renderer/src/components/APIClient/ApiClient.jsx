import { createRoot } from 'react-dom/client'
import RequestBody from './RequestBody'
import RequestHeader from './RequestHeader'
import { getTableValues } from './RequestHeader'
import { getBody } from './RequestBody'
import './apiclient.css'
import $ from 'jquery'
import { accepts } from 'mongodb-language-model'
import assert from 'assert'
import { useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import FolderHierarchy from './FolderHierarchy'

let container = null
var editorRef = null

const options = {
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'none',
    autoIndent: 'none',
    minimap: {
        enabled: false,
    },
    scrollbar: {
        horizontalSliderSize: 4,
        verticalSliderSize: 10,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: true,
    cursorStyle: 'line',
    automaticLayout: true,
};


function ApiClientPage() {

    var httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

    const [resp, setResp] = useState("{'id': 'uniqueId'}")
    editorRef = useRef(null);

    var cachedResponse = localStorage.getItem('httpresponse')
    var cachedUrl = localStorage.getItem('httprequest')

    useEffect(() => {
        setResp(cachedResponse)
        console.log("react use effect")
    })


    return (
        <div className="api-landing-page-container">
            <div className="api-left-child-container"><FolderHierarchy /></div>
            <div className='api-right-child-container'>
                <div className="api-details-container">
                    <div className="http-methods-elem-container">
                        <select id="select-http" aria-label='select-http'>
                            {
                                httpMethods.map((item) =>
                                    <option>{item}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="api-tag-elem">
                        <input id="search-area" type="text" size="60" aria-label="search-area" defaultValue={cachedUrl}></input>
                    </div>
                    <div className="api-search-btn-container">
                        <button id="search-btn" onClick={sendrequest}>Send</button>
                    </div>
                </div>
                <div className="body-headers-container">
                    <button id="body-btn" className="buttons-body" onClick={requestPlaceholder}>Body</button>
                    <button id="headers-btn" className="buttons-body" onClick={requestPlaceholder}>Headers</button>
                    <button id="notes-btn" className="buttons-body" onClick={requestPlaceholder}>Notes</button>
                </div>
                <div id="http-placeholder" className="placeholder-container">
                    <RequestBody />
                </div>
                <div className="response-container">
                    <p>Response</p>
                    <p id="http-status"></p>
                    <div id='editor-response'>
                        <Editor id="monaco-response" theme="vs-dark" height="48vh" options={options} defaultLanguage='json' onMount={editorDidMount} value={resp}></Editor>
                    </div>
                </div>
            </div>
        </div>
    )
}


function editorDidMount(editor, monaco) {
    editorRef.current = editor
}

function setReponse(data) {
    console.log("set response triggered")
    console.log(editorRef.current)
    editorRef.current.setValue(data)
    console.log(editorRef.current.getValue())
}

function requestPlaceholder(e) {

    /*
<Editor id="monaco-response" height="48vh" options={options} value={cachedResponse} defaultLanguage='json'></Editor>
    */

    console.log("jquery triggerd")
    $('button').removeClass('active')
    $(e.target).addClass('active')
    console.log("button clicked")
    console.log(e.target)
    var tag = e.target.innerHTML
    console.log(tag)

    if (!container) {
        container = createRoot(document.getElementById('http-placeholder'))
    }

    if (tag == "Body") {
        container.render(
            <>
                <RequestBody />
            </>
        )
    }

    if (tag == "Headers") {
        container.render(
            <>
                <RequestHeader />
            </>
        )
    }
}

async function sendrequest() {
    try {

        var url = $('#search-area').val()
        var httpBody = getBody()

        console.log(httpBody)

        // to check the mongo query validity
        // only to be used in node js code, it is not supported in browser
        // assert.ok(accepts('{"foo" : "one

        // read headers
        var table = getTableValues()
        console.log("table contents")
        console.log(table)
        var headers = new Headers()

        if (table) {
            table.forEach(item => headers.append(item.Key, item.Value))
            console.log(headers)
        }

        //console.log("url is: " + url)

        const resp = await fetch(url, headers)

        //var elem = document.querySelector('view-lines monaco-mouse-cursor-text')
        //var responseContainer = document.querySelector('.monaco-editor-container')
        var statuselem = document.getElementById('http-status')

        console.log(statuselem)
        // var monacoEd = document.createElement('Editor')
        // monacoEd.setAttribute('height', '48vh')
        // monacoEd.setAttribute('options', options)
        // monacoEd.setAttribute('language', 'json')

        statuselem.innerHTML = resp.status + "  " + resp.statusText
        if (resp.status != 200 && resp.status != 204 && resp.status != 201) {
            // error occured
            elem.innerHTML = ""
            return
        }




        const respjson = await resp.json()
        var jsonstr = JSON.stringify(respjson, null, 4)

        //monacoEd.setAttribute('value', jsonstr)
        //responseContainer.appendChild(monacoEd)
        //elem.innerHTML = jsonstr

        //console.log(jsonstr)
        // document.querySelector('#editor-response').innerHTML = ""
        // var responseEditor = monaco.editor.create(document.querySelector('#editor-response'), {
        //     value: jsonstr,
        //     language: 'json',
        // })

        // cache the data in local storage
        localStorage.setItem("httpresponse", jsonstr)
        localStorage.setItem('httprequest', url)
        localStorage.setItem('httpheaders', JSON.stringify(table, null, 4))
        if (httpBody)
            localStorage.setItem("httpbody", httpBody)
        setReponse(jsonstr)
    } catch (error) {
        console.log(error)
    }
}

export default ApiClientPage
