function ResponseView({ loading, error, response }) {
  return (
    <div className="response">
      <h2>Response</h2>

      {loading && <p>Loading...</p>}

      {error && !loading && (
        <div className="response-error">
          Error: {error}
        </div>
      )}

      {response && !loading && (
        <div className="response-data">
          <div className="response-status">
            Status: {response.status} {response.statusText}
          </div>

          <div className="response-headers">
            <h3>Headers</h3>
            <pre>{JSON.stringify(response.headers, null, 2)}</pre>
          </div>

          <div className="response-body">
            <h3>Body</h3>
            <pre>{JSON.stringify(response.body, null, 2)}</pre>
          </div>
        </div>
      )}

      {!response && !error && !loading && (
        <p>No response yet. Click "Send"</p>
      )}
    </div>
  )
}

export default ResponseView