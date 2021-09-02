import React, { useState } from "react";
import { sendMoney } from "../helpers/wallet";
import "./Sender.css";

interface SenderProps {
  didSendMoney: () => void;
}

const Sender: React.FC<SenderProps> = ({ didSendMoney }) => {
  const [amount, setAmount] = useState(0); //1000
  const [address, setAddress] = useState("");
  const [timeA, setTime] = useState(0);

  const [intervals, setIntervals] = useState(0);

  const [performance, setPerformace] = useState(0);
  const amountStream = amount * 0.8; //800
  const amountPerformance = amount * 0.2; //200
  //10 = 200
  //1=20
  const performanceIntervalAmountTransfer = performance * (amountPerformance*0.1); 

  
  var timeforstop:number;
  var intervalsInMilSec: number;
  var timeInMil: number;
  timeforstop=0;

  timeInMil = timeA * 60000; //converting days into miliseconds
  intervalsInMilSec = timeInMil/intervals;

  const streamAmtPerInterval = (amountStream/timeInMil)*intervalsInMilSec;
  const performanceAmtPerInterval = (performanceIntervalAmountTransfer/timeInMil)*intervalsInMilSec;


  
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeTimeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };
//>>>.
  const onChangeIntervals = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntervals(e.target.value ? Number(e.target.value) : 0);
  };
//>>>


const onChangePerformace = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPerformace(e.target.value ? Number(e.target.value) : 0);
};

const onClickStop = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  timeforstop=1;
  e.preventDefault();
  

};

const onClickSendMoney = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();

  
    
  var varCounter = 0;
  var varName = async function(){
     
        
        if(varCounter < timeInMil && timeforstop!==1) {

           varCounter = varCounter+intervalsInMilSec;
           var moneyToTransfer = streamAmtPerInterval+performanceAmtPerInterval;
            await sendMoney(address, moneyToTransfer);
            didSendMoney();
        }
        else {
         clearInterval(intervalId);
        }
      
       
  };
  var intervalId = setInterval(varName, intervalsInMilSec);
  
};

  return (
    <form className="send-container">
      <div className="send-inputs">
        <div className="send-top-1">
          <label htmlFor="amount">Amount (Sol)</label>
        </div>
        <div className="send-top-2">
          <label htmlFor="address">Address</label>
        </div>
        <div className="send-top-3">
          <label htmlFor="address">Time</label>
        </div>
        <div className="send-top-4">
          <label htmlFor="address">Interval</label>
        </div>
        <div className="send-top-5">
          <label htmlFor="address">Performance</label>
        </div>

     
        <div className="send-side-1">
          <input type="text" value={amount} onChange={onChangeAmount} />
        </div>
        <div className="send-side-2">
          <input type="text" value={address} onChange={onChangeAddress} />
        </div>
        <div className="send-side-3">
          <input type="text" value={timeA} onChange={onChangeTimeA} />
        </div>
        <div className="send-side-4">
          <input type="text" value={intervals} onChange={onChangeIntervals} />
        </div>
        <div className="send-side-5">
          <input type="text" value={performance} onChange={onChangePerformace} />
        </div>
        <div className="send-side-6">
          <button className="send-buttons" onClick={onClickSendMoney}>
            Submit
          </button>
        </div>
        <div className="send-side-7">
        <button className="send-buttons" onClick={onClickStop}>
            Stop
          </button>
        </div>
        
      </div>
    </form>
  );
};

export default Sender;
