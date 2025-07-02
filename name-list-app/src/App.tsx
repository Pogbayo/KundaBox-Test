import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [visibleNames, setVisibleNames] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleSubmit = () => {
    const newNames = input
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n);

    setNames((prev) => [...prev, ...newNames]);
    setInput("");
  };

  useEffect(() => {
    const newEntries = names.slice(visibleNames.length);

    if (newEntries.length === 0) return;

    let i = 0;

    const interval = setInterval(() => {
      const nextName = newEntries[i]?.trim();
      if (nextName) {
        setVisibleNames((prev) => [...prev, nextName]);
      }
      i++;
      if (i === newEntries.length) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, [names, visibleNames.length]);

  const handleDelete = (index: number) => {
    const updated = [...visibleNames];
    updated.splice(index, 1);
    setNames(updated);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingValue(visibleNames[index]);
  };

  const handleSave = () => {
    if (editingIndex === null) return;
    const updated = [...visibleNames];
    updated[editingIndex] = editingValue.trim();
    setNames(updated);
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="Enter names separated by commas"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <main className="table-section">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleNames.map((name, index) => (
              <tr key={index} className="fade-in-row">
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingValue}
                      className="input"
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                  ) : (
                    name
                  )}
                </td>
                <td className="actions">
                  {editingIndex === index ? (
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
