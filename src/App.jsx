import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

import { TransactionProvider } from "./context/TransactionContext";

import "./styles/App.css";

function App() {
  return (
    <TransactionProvider>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </TransactionProvider>
  );
}

export default App;