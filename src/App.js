import { useEffect, useState } from 'react'
import './App.css'
import Editor from './components/editor/JS/Editor-JS'
import ButtonBar from './components/button-bar/ButtonBar'
import { runCode } from './util'
import TabJavascript from './components/tabs/javascript/TabJavascript'
import Tabs from './core-components/tabs/Tabs'
import EditorHTMLCSS from './components/editor/HTML-CSS/EditorHTMLCSS'
import { defaultJSFileName } from './constants'

/*
TODOS: 
--------

Add Grid layout

once indexdb is being used for most file storage needs 
// is there a way to include cache

*/

function App() {
    const [code, setCode] = useState('')
    const [isCompilationError, setIsCompilationError] = useState(false)
    const [runtimeError, setRuntimeError] = useState(null)
    const [isRun, SetIsRun] = useState(false)

    useEffect(() => {
        if (isRun) {
            try {
                runCode(code)
            } catch (error) {
                setRuntimeError(error)
                console.error(`error occured after running code`, error)
            } finally {
                SetIsRun(false)
            }
        }
    }, [code, isRun])

    const handleRunClick = function () {
        if (!isCompilationError) {
            SetIsRun(true)
        }
    }
    function onCodeChange(__code, isError) {
        setCode(__code)
        setIsCompilationError(isError)
    }
    return (
        <div className="App">
            <ButtonBar
                {...{
                    disableRun: isCompilationError,
                    onRunButton: handleRunClick,
                }}
            />

            <TabJavascript {...{ onCodeChange, code, runtimeError }} />
        </div>
    )
}

export default App
