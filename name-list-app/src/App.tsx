import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
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

  const handleDelete = (index: number) => {
    const updated = [...names];
    updated.splice(index, 1);
    setNames(updated);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingValue(names[index]);
  };

  const handleSave = () => {
    if (editingIndex === null) return;
    const updated = [...names];
    updated[editingIndex] = editingValue.trim();
    setNames(updated);
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <div className="container">
      <h1>Name List Manager</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter names separated by commas"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  name
                )}
              </td>
              <td className="actions">
                {editingIndex === index ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
