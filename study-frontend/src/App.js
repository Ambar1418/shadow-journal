import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    axios.get("http://localhost:8080/journal")
      .then(res => setEntries(res.data));
  };

  const saveEntry = () => {

    if(text === "" || mood === ""){
      alert("Write something and select mood");
      return;
    }

    axios.post("http://localhost:8080/journal", {
      text: text,
      mood: mood
    })
    .then(() => {
      fetchEntries();
      setText("");
      setMood("");
    });
  };

  const deleteEntry = (id) => {

    axios.delete(`http://localhost:8080/journal/${id}`)
      .then(fetchEntries);
  };

  const moodColor = (m) => {

    if(m === "happy") return "#00ffcc";
    if(m === "sad") return "#3399ff";
    if(m === "angry") return "#ff4d4d";
    if(m === "focus") return "#cc66ff";

    return "white";
  };

  return (

    <div style={{
      background:"#0f0f0f",
      color:"white",
      minHeight:"100vh",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1>🌙 Shadow Journal</h1>

      <textarea
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write your thoughts..."
        style={{
          width:"100%",
          height:"100px",
          background:"#1a1a1a",
          color:"white",
          border:"none",
          padding:"10px"
        }}
      />

      <div style={{marginTop:"10px"}}>

        <button onClick={()=>setMood("happy")}>😊 Happy</button>
        <button onClick={()=>setMood("sad")}>😢 Sad</button>
        <button onClick={()=>setMood("angry")}>😡 Angry</button>
        <button onClick={()=>setMood("focus")}>🎯 Focus</button>

      </div>

      <button
        onClick={saveEntry}
        style={{
          marginTop:"10px",
          padding:"10px",
          background:"#00ffcc",
          border:"none"
        }}
      >
        Save Entry
      </button>

      <h2>History</h2>

      {entries.map(e => (

        <div key={e.id}
          style={{
            background:"#1a1a1a",
            padding:"10px",
            margin:"10px 0"
          }}
        >

          <p>{e.text}</p>

          <span style={{color:moodColor(e.mood)}}>
            {e.mood}
          </span>

          <button
            onClick={()=>deleteEntry(e.id)}
            style={{marginLeft:"10px"}}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default App;
