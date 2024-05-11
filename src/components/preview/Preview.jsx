import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Preview.css';
// initially just run html and css 
const origContentSrcDoc = `<!DOCTYPE html>
<html>
  <head>
    <title>Preview</title>
  </head>
  <body>
  </body>
</html>`
const errorTracker = `<script>
window.onerror = function(message, url, lineNo, columnNo, error) {
  parent.postMessage({type: 'error', message, error: error.toString(), lineNo, columnNo}, '*');
}
</script>`

function Preview({ htmlContent, css, js, isRun }) {
    const [srcDoc, setSrcDoc] = useState(origContentSrcDoc)

    useEffect(() => {
      if(isRun)
      setSrcDoc(`<!DOCTYPE html>
      <html>
        <head>
          <title>Preview</title>
          <style> ${css} </style>
        </head>
        <body>
          ${htmlContent}
          ${errorTracker}
          <script>
              ${js}
          </script>
        </body>
      </html>`)
      else{
        
      }
    },[isRun, htmlContent, css , js])

    return (
        <div className="preview">
            <iframe
                title="Preveiw"
                style={{ width: '100%', height: '100%', background: '#24292e' }}
                srcDoc={srcDoc}
            />
        </div>
    )
}
Preview.propTypes = {
    htmlContent: PropTypes.string.isRequired,
}
export default Preview
