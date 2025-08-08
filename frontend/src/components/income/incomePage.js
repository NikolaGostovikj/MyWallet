import React,{useState} from 'react';
import './incomeCss.css';

function Income(){
const [amount,setAmount] = useState("");
const [name,setName] = useState("");
const URL = "http://88.200.63.148:5550/";
async function addIncome(e){
    e.preventDefault();
    
    if(isNaN(amount) || amount<=0){
      alert('Please add a real number!');
      return;
    }

    const response = await fetch (`${URL}income/add`,{method:"POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body:JSON.stringify({amount:amount,name:name}),

    })
    const result = await response.json();
    console.log(result);

}
return (
    <div className="income">
      <form className='form' onSubmit={addIncome}>
        <label>
          Please name your income:
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Enter amount:
          <input
            type="text"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="€"
            required
          />
        </label>

        <button type="submit" className="button">Add Income</button>
      </form>
    </div>
  );

}

export default Income;