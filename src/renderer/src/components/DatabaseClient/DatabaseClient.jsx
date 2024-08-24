import { json } from '@codemirror/lang-json';
import { Compartment, EditorState } from '@codemirror/state';
import { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

function DatabaseClient() {
    const parentEditor = useRef(null)
    let language = new Compartment
    let tabSize = new Compartment

    useEffect(() => {
        if (parentEditor.current) {
            console.log("codemirror")
            const initalState = EditorState.create({
                doc: "",
                extensions: [basicSetup, json()],
            })

            const view = new EditorView({
                parent: parentEditor.current,
                state: initalState,
                lineNumbers: false,
            })

            parentEditor.view = view

            return () => {
                view.destroy()
            }
        }
    })


    return (
        <>
            <div id='editor' ref={parentEditor}></div>
        </>
    )

    /*
    const editor = useRef(null)
    const { setContainer } = useCodeMirror({
        container: editor.current,
        value: "const val='some value'",
        extensions: [basicSetup(), javascript(), dracula],
        width: "50vw",
        height: "60vh",
        readOnly: false,
        content: 'left',
        color: 'blue'
    })

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current)
        }
    })

    return (
        <>
            <div id='editor' ref={editor}></div>
        </>
    )
        */

}

function changeToCodeEditor() {
    console.log("codemirror")
    var state = EditorState.create({
        doc: "This is some line from code",
        extensions: [basicSetup],
    })

    var view = new EditorView({
        parent: document.getElementById('editor'),
        state: state,
    })
}

export default DatabaseClient