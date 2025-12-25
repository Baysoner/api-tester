function RequestSaved({ saved, onSelect, onDelete }) {
  if (!saved.length) {
    return (
      <div className="saved">
        <h2>Saved</h2>
        <p>No saved requests yet</p>
      </div>
    )
  }

  return (
    <div className="saved">
      <h2>Saved</h2>
      <ul>
        {saved.map((item, idx) => (
          <li key={idx} className="saved-item">
            <button onClick={() => onSelect(item)} className="saved-select">
              <strong>{item.method}</strong> - {item.url}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(idx)
              }}
              className="saved-delete"
              title="Delete"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequestSaved