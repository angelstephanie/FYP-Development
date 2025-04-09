import { React } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Home from "./components/independent/Home.js";
import Dashboard from "./components/independent/Dashboard.js";
import Search from "./components/independent/Search.js";
import SelectAppointment from "./components/booking/SelectAppointment.js";
import BookAppointment from "./components/booking/BookAppointment.js";
import ConfirmAppointment from "./components/booking/ConfirmAppointment.js";
import ErrorBoundary from "./components/independent/ErrorBoundary.js";

import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/selectAppointment" element={<SelectAppointment />} />
          <Route path="/bookAppointment" element={<BookAppointment />} />
          <Route path="/confirmAppointment" element={<ConfirmAppointment />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
