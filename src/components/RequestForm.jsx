function RequestForm({
  method,
  url,
  headersText,
  bodyText,
  loading,
  onMethodChange,
  onUrlChange,
  onHeadersChange,
  onBodyChange,
  onSend,
  onSave,
}) {
  const methodHasBody = !['GET', 'HEAD'].includes(method)

  return (
    <div className="request-form">
      <div className="request-row">
        <label>
          Method:
          <select
            value={method}
            onChange={(e) => onMethodChange(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>

      <div className="request-row">
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://api.example.com/endpoint"
          />
        </label>
      </div>

      <div className="request-row">
        <label>
          Headers
          <textarea
            value={headersText}
            onChange={(e) => onHeadersChange(e.target.value)}
            placeholder={`Content-Type: application/json\nAuthorization: Bearer ...`}
          />
        </label>
      </div>

      {methodHasBody && (
        <div className="request-row">
          <label>
            Body
            <textarea
              value={bodyText}
              onChange={(e) => onBodyChange(e.target.value)}
              placeholder={`{\n  "title": "hello"\n}`}
            />
          </label>
        </div>
      )}

      <div className="request-row request-actions">
        <button onClick={onSend} disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
        <button type="button" onClick={onSave} disabled={loading}>
          Save
        </button>
      </div>
    </div>
  )
}

export default RequestForm