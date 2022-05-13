import "./App.css";
import CustomNavbar from "./component/CustomNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";
import { AppProvider } from "./store/AppProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandDetails from "./component/BrandDetails";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <CustomNavbar />

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Brand" element={<BrandDetails />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
