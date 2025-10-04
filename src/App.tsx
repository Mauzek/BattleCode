import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>
        <h1>Hello, BattelCode!</h1>
        <p>Welcome to your React + TypeScript + Vite project.</p>
      </div>} />
    </Routes>
  )
}

export default App
