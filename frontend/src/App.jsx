import { useState, useEffect, useRef } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import * as EditorModule from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-python"
import axios from 'axios'
import './App.css'

const Editor = EditorModule.default?.default || EditorModule.default || EditorModule

function App() {
  const [code, setCode] = useState(`def sum_numbers():
    return 1 + 1`)
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(false)

  const editorScrollRef = useRef(null)
  const lineNumbersRef = useRef(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  // keep line-number gutter in sync with editor's scroll position
  function handleEditorScroll(e) {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop
    }
  }

  const lineCount = code.split('\n').length

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/review`,
        { code }
      )
      setReview(response.data)
    } catch (error) {
      console.error("Error fetching review:", error)
      setReview({
        status: "error",
        errors: [{ message: "Could not reach the backend. Is it running?", line: null }],
        warnings: [],
        suggestions: [],
        ai_prediction: null
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
            <div className="line-numbers" ref={lineNumbersRef}>
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} className="line-number">{i + 1}</div>
              ))}
            </div>

            <div
              className="editor-scroll"
              ref={editorScrollRef}
              onScroll={handleEditorScroll}
            >
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.python, "python")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  lineHeight: '24px',
                  minHeight: '100%',
                  width: '100%'
                }}
              />
            </div>
          </div>
          <div onClick={reviewCode} className='review'>
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className='right'>
          {!review && <p className="placeholder">Click "Review" to analyze your code.</p>}

          {review && (
            <>
              <h1 className={`status-badge ${review.status}`}>
                {review.status === "success" ? "✅" : "❌"} Review status: {review.status}
              </h1>

              {review.errors?.length > 0 && (
                <>
                  <h2>Errors</h2>
                  <ul className="error-list">
                    {review.errors.map((e, i) => (
                      <li key={i}>
                        {e.line ? <strong>Line {e.line}:</strong> : null} {e.message}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {review.ai_prediction && (
                <>
                  <h2>AI Prediction</h2>
                  <p><strong>{review.ai_prediction}</strong></p>
                </>
              )}

              {review.warnings?.length > 0 && (
                <>
                  <h2>Warnings</h2>
                  <ul>
                    {review.warnings.map((w, i) => (
                      <li key={i}><strong>Line {w.line}:</strong> {w.message}</li>
                    ))}
                  </ul>
                </>
              )}

              {review.suggestions?.length > 0 && (
                <>
                  <h2>Suggestions</h2>
                  <ul>
                    {review.suggestions.map((s, i) => (
                      <li key={i}><strong>Line {s.line}:</strong> {s.message}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default App
