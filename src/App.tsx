import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home Page</div>}/>
      </Routes>
    </Layout>
  );
}

export default App;
