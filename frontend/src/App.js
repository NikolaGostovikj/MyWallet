import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/login/login.js";
import Register from "./components/register/register.js";
import Bank from "./components/bank/bank.js";
import Income from "./components/income/incomePage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/income" element={<Income />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;