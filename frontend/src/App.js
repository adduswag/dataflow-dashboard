import { useEffect, useState } from "react";

function App() {
  const [datasets, setDatasets] = useState([]);
  const totalRecords = datasets.reduce((sum,d)=> sum + d.records,0);
  const [name, setName] = useState("");
  const [records, setRecords] = useState("");
  const [editingId, setEditingId] = useState(null);

  // GET data
  const fetchData = () => {
    fetch("http://localhost:8080/datasets")
        .then((res) => res.json())
        .then((data) => setDatasets(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // POST data
  const addDataset = (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      records: parseInt(records),
    };

    // IF editing → UPDATE
    if (editingId) {
      fetch(`http://localhost:8080/datasets/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(() => {
        setEditingId(null);
        setName("");
        setRecords("");
        fetchData();
      });

    }
    // ELSE → CREATE
    else {
      fetch("http://localhost:8080/datasets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(() => {
        setName("");
        setRecords("");
        fetchData();
      });
    }
  };

  return (
      <div style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f5f7fb",
        minHeight: "100vh"
      }}>
        <h1 style={{ marginBottom: "20px" }}>📊 Data Dashboard</h1>
        <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>

          <div style={{
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "200px"
          }}>
            <h4>Total Datasets</h4>
            <h2>{datasets.length}</h2>
          </div>

          <div style={{
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "200px"
          }}>
            <h4>Total Records</h4>
            <h2>{datasets.reduce((sum, d) => sum + d.records, 0)}</h2>
          </div>

        </div>

        {/* FORM */}
        <form onSubmit={addDataset} style={{
          marginBottom: "25px",
          display: "flex",
          gap: "10px"
        }}>
          <input
              type="text"
              placeholder="Dataset name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
          />

          <input
              type="number"
              placeholder="Records"
              value={records}
              onChange={(e) => setRecords(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
          />

          <button
              type="submit"
              style={{
                padding: "10px 15px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#4f46e5",
                color: "white",
                cursor: "pointer"
              }}
          >
            {editingId ? "Update Dataset" : "Add Dataset"}
          </button>
        </form>

        {/* TABLE */}
        <h3>Total Datasets: {datasets.length}</h3>

        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <thead>
          <tr>
            <th style={{ padding: "12px", background: "#f0f0f0" }}>ID</th>
            <th style={{ padding: "12px", background: "#f0f0f0" }}>Name</th>
            <th style={{ padding: "12px", background: "#f0f0f0" }}>Records</th>
            <th style={{ padding: "12px", background: "#f0f0f0" }}>Action</th>
          </tr>
          </thead>
          <tbody>
          {datasets.map((d) => (
              <tr key={d.id}>
                <td style={{ padding: "10px", textAlign: "center" }}>{d.id}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{d.name}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{d.records}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button
                      onClick={() => {
                        fetch(`http://localhost:8080/datasets/${d.id}`, {
                          method: "DELETE",
                        }).then(() => {
                          // refresh table after delete
                          setDatasets(datasets.filter((item) => item.id !== d.id));
                        });
                      }}
                  >
                    Delete
                  </button>
                  <button
                      onClick={() => {
                        setEditingId(d.id);
                        setName(d.name);
                        setRecords(d.records);
                      }}
                      style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;