import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg("Failed to Reach Backend"));
  }, []);

  return (
    <div style = {{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Hello, World!</h1>
      <p>Backend says: <strong>{msg}</strong></p>
    </div>
  );
}

export default App;
