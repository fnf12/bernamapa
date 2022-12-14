import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import Maps from "./Components/Mapas/Maps";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Home" exact element={<Home />} />
          <Route path="/Maps/:latitud/:longitud" element={<Maps />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
