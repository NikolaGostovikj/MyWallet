import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/login/login.js";
import Register from "./components/register/register.js";
import Bank from "./components/bank/bank.js";
import Income from "./components/income/incomePage.js";
import AllIncomes from "./components/allIncomes/allIncomes.js";
import Goal from "./components/goal/goal.js";
import GoalPage from "./components/goalPage/goalPage.js";
import ShowGoals from "./components/showGoals/showGoals.js";
import ExpensePage from "./components/expense/expensePage.js";
import AllExpenses from './components/allExpenses/allExpenses.js'
import Lidl from './components/lidl/lidl.js';
import Mercator from "./components/mercator/mercator.js";
import DeleteGoal from "./components/deleteGoal/deleteGoal.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/income" element={<Income />} />
        <Route path="/allIncomes" element={<AllIncomes />} />
        <Route path="/goal" element={<Goal/>}/>
        <Route path="/goalPage" element={<GoalPage/>}/>
        <Route path="/showGoals" element={<ShowGoals/>}/>
        <Route path="/expensePage" element={<ExpensePage/>}/>
        <Route path="/allExpenses" element={<AllExpenses/>}/>
        <Route path="/lidl" element={<Lidl/>}/>
        <Route path="/mercator" element={<Mercator/>}/>
        <Route path="/deleteGoal" element={<DeleteGoal/>}/>
        

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;