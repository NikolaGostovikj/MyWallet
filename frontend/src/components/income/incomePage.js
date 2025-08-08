import React,{useState} from 'react';
import './incomeCss.css';

function Income(){
const [amount,setAmount] = useState("");
const [name,setName] = useState("");

async function addIncome(e){
    e.preventDefault();

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