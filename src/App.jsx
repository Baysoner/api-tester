import { useState } from 'react'
import './App.css'
import RequestForm from './components/RequestForm.jsx'
import ResponseView from './components/ResponseView.jsx'
import RequestHistory from './components/RequestHistory.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.jsx'

function App() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1')
  const [method, setMethod] = useState('GET')
  const [headersText, setHeadersText] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useLocalStorage('api-history', [])

  const parseHeaders = (raw) => {
    const result = {}
    raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const [key, ...rest] = line.split(':')
        if (!key || !rest.length) return
        result[key.trim()] = rest.join(':').trim()
      })
    return result
  }

  const handleSend = async () => {
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const headers = parseHeaders(headersText)
      const hasBody = !['GET', 'HEAD'].includes(method)
      const bodyPayload = hasBody && bodyText.trim() ? bodyText : undefined

      if (bodyPayload && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
      }

      const res = await fetch(url, {
        method,
        headers,
        body: bodyPayload,
      })
      const text = await res.text()

      let data
      try {
        data = JSON.parse(text)
      } catch {
        data = text
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: data,
      })
    } catch (err) {
      setError(err.message || 'Request error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!url.trim()) return
    setHistory((prev) => {
      const next = [{ method, url, headersText, bodyText }, ...prev]
      return next.slice(0, 20)
    })
  }

  const handleSelectHistory = (item) => {
    setMethod(item.method)
    setUrl(item.url)
    setHeadersText(item.headersText || '')
    setBodyText(item.bodyText || '')
  }

  return (
    <div className="app">
      <h1>API Tester</h1>

      <RequestForm
        method={method}
        url={url}
        headersText={headersText}
        bodyText={bodyText}
        loading={loading}
        onMethodChange={setMethod}
        onUrlChange={setUrl}
        onHeadersChange={setHeadersText}
        onBodyChange={setBodyText}
        onSend={handleSend}
        onSave={handleSave}
      />

      <ResponseView
        loading={loading}
        error={error}
        response={response}
      />

      <RequestHistory
        history={history}
        onSelect={handleSelectHistory}
      />
    </div>
  )
}

export default App