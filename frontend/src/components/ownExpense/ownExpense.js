import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import './ownExpenseCss.css';

function OwnExpense(){
    const [name,setName] = useState("");
    const [amount,setAmount] = useState("");
    const [date,setDate] = useState("");
    const [list,setList] = useState("");
    const URL = "http://88.200.63.148:5555/"
    const navigate = useNavigate();
    async function addExpense(e){
        e.preventDefault();
        if(amount<=0){
            alert("Please add a positive amount!");
            return;
        }
        const response = await fetch(`${URL}expense/add`,{ method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({
                store_id:'3',
                amount:amount,
                storename:"Own Expense",
                description:name,
                date_time:date,
                list: list
            })
        })
        const result = await response.json();
        alert("Expense added!");
        console.log(result);
        navigate("/bank");
    }

    return(
    <div className={"container"}>
      <form className={"form"} onSubmit={addExpense}>
        <div className="welcome">
          <h1>Add your own Expense:</h1>
        </div>

        <input
          className={"input"}
          type="text"
          placeholder="Name your expense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="date"
          placeholder="Add a date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="text"
          placeholder="List your items"
          value={list}
          onChange={(e) => setList(e.target.value)}
          required
        />

        

        <button className={"button"} type="submit">
          Add expense
        </button>

        <button
          className={"button"}
          type="button"
          onClick={() => navigate("/bank")}
        >
          Back to Bank Page
        </button>
      </form>
    </div>




    )
}

export default OwnExpense;