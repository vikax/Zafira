import { useEffect } from 'react'
import './requestbody.css'
import $ from 'jquery'
import { Editor } from "@monaco-editor/react"

function RequestBody() {
    /*
    <textarea id="http-body-area" rows="18" cols="111" defaultValue={cachedBody} spellCheck='false'></textarea>
    */

    useEffect(() => {
        console.log("body use effect called")
        //const doc = document.getElementById('http-body-area')
        //console.log(doc)
    })

    var cachedBody = localStorage.getItem('httpbody')
    const options = {
        autoIndent: 'full',
        contextmenu: true,
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 20,
        hideCursorInOverviewRuler: true,
        matchBrackets: 'always',
        minimap: {
            enabled: false,
        },
        scrollbar: {
            horizontalSliderSize: 4,
            verticalSliderSize: 18,
        },
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
    };
    return (
        <div className="monaco-editor-container">
            <Editor id='request-body-mon' height='48vh' theme="vs-dark" defaultLanguage="json" defaultValue={cachedBody} options={options}></Editor>
        </div>
    )
}

/*
https://youtu.be/AkIortwElAg
*/

export function getBody() {
    var httpBody = $('#http-body-area').val()
    return httpBody
}

export default RequestBody