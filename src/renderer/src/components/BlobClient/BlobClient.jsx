import { Editor } from "@monaco-editor/react"
import './blobclient.css'
import { autoCloseTags } from "@codemirror/lang-javascript";

function BlobClient() {
    const options = {
        contextmenu: true,
        hideCursorInOverviewRuler: true,
        fontSize: 20,
        lineSize: 20,
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
        autoCloseTags: false,
        autoClosingBrackets: true,
        tabSize: 4,
        renderWhiteSpace: true,
    };



    return (
        <Editor height='80vh' theme="vs-dark" language="json" options={options}></Editor>
    )
}

export default BlobClient