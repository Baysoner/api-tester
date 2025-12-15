function RequestHistory({ history, onSelect }) {
  if (!history.length) {
    return (
      <div className="history">
        <h2>History</h2>
        <p>No saved requests yet</p>
      </div>
    )
  }

  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            <button onClick={() => onSelect(item)}>
              <strong>{item.method}</strong> — {item.url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestHistory