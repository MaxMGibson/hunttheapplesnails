import './App.css';

import { useState, useEffect } from "react";

function Login({ onForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  function submit(e) {
    e.preventDefault();
    // For now we just display the entered values (don't log passwords in real apps)
    setInfo(`Submitted email: ${email}`);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
        </label>

        <button type="submit">Sign in</button>

        <p className="login-links">
          <a href="#/forgot" onClick={(e) => { e.preventDefault(); onForgot(); }}>
            Forgot Password?
          </a>
        </p>

        {info && <p className="login-info">{info}</p>}
      </form>
    </div>
  );
}

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");

  function submit(e) {
    e.preventDefault();
    // no backend call — just show a friendly message
    setInfo(`If an account exists for ${email}, you'll receive an email with reset instructions.`);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Forgot Password</h2>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>

        <button type="submit">Send</button>

        <p className="login-links">
          <a href="#/login" onClick={(e) => { e.preventDefault(); if (onBack) onBack(); }}>
            Back to Login
          </a>
        </p>

        {info && <p className="login-info">{info}</p>}
      </form>
    </div>
  );
}

function HomePlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Home</h2>
      <p>Placeholder home page (empty for now).</p>
    </div>
  );
}

function ApplyPlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Apply</h2>
      <p>Placeholder apply page (empty for now).</p>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="#/login">Login</a></li>
          <li><a href="#/home">Home</a></li>
          <li><a href="#/apply">Apply</a></li>
        </ul>
      </nav>
    </aside>
  );
}

function App() {
  // default to the login page
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || '/login');

  // simple hash navigation helper
  function navigate(to) {
    window.location.hash = to;
    setPage(to);
  }

  // keep sync if user manually changes hash
  useEffect(() => {
    function onHash() {
      setPage(window.location.hash.replace('#', '') || '/login');
    }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="app-root">
      <Sidebar />
      <main className="content">
        {(page === '/' || page === '/login') && <Login onForgot={() => navigate('/forgot')} />}
  {page === '/forgot' && <ForgotPassword onBack={() => navigate('/login')} />}
        {page === '/home' && <HomePlaceholder />}
        {page === '/apply' && <ApplyPlaceholder />}
      </main>
    </div>
  );
}

export default App;
