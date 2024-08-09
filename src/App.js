import { useState } from 'react'
import './App.css';


function App() {
  const [balance, updBalance] = useState('')
  const [risk, updRisk] = useState('')
  const [pips, updPips] = useState('')
  const [leavarage, updLeavarage] = useState(100)
  const [price, updPrice] = useState('')
  const [rewardRatio, updReward] = useState('')
  const [result, updResult] = useState({ lotSize: 'NA', riskAmount: 'NA', marginRequired: 'NA', priceOfPipChange: 'NA', reward: 'NA' })
  const [isResult, updisResult] = useState(false)

  const caluculate = (event) => {
    event.preventDefault()
    const riskAmount = balance * (risk / 100)
    const lotSize = riskAmount / (pips * 10)
    const marginRequired = (lotSize * 100000) / leavarage
    const priceOfPipChange = 10 * lotSize
    const reward = riskAmount * rewardRatio

    if (balance !== '' & risk !== '' & pips !== '' & price !== '') {
      updisResult(true)
      updResult({ lotSize, riskAmount, marginRequired, priceOfPipChange, reward })
    }

  }

  const close = () => {
    updisResult(false)
    updBalance('')
    updRisk('')
    updPips('')
    updPrice('')
    updReward('')
  }

  const renderResult = () => {
    const { lotSize, riskAmount, marginRequired, priceOfPipChange, reward } = result
    return (
      <div className='result'>
        <p className='title'>Result</p>
        <hr />
        <p className='p'>Amount At Risk : ${riskAmount} USD</p>
        <p className='p'>Position Size(Standard Lot) : {lotSize} Lots</p>
        <p className='p'>Required Margin : {marginRequired} USD</p>
        <p className='p'>Price Movement per pip : {priceOfPipChange} USD</p>
        <p className='p'>Profit On Trade Win : {Math.round(reward)} USD</p>
        <button className='butt' onClick={close}>Clear</button>
      </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading'>----Position Size Caluculator----</h1>
      </header>
      <div className='body'>
        <form className='form-element' onSubmit={caluculate}>
          <div className='form-item-con'>
            <div className='input-con'>
              <label className='label'>Account Blance*</label>
              <input type='text' value={balance} className='input-bar' onChange={event => updBalance(event.target.value)}></input>
            </div>

            <div className='input-con'>
              <label className='label'>Risk(%)*</label>
              <input type='text' value={risk} className='input-bar' onChange={event => updRisk(event.target.value)}></input>
            </div>

            <div className='input-con'>
              <label className='label'>StopLoss(Pips)*</label>
              <input type='text' value={pips} className='input-bar' onChange={event => updPips(event.target.value)}></input>
            </div>
          </div>

          <div className='form-item-con'>
            <div className='input-con'>
              <label className='label'>Leavarage(1:?)</label>
              <input type='text' value={leavarage} className='input-bar' onChange={event => updLeavarage(event.target.value)}></input>
            </div>

            <div className='input-con'>
              <label className='label'>Currency-price*</label>
              <input type='text' value={price} className='input-bar' onChange={event => updPrice(event.target.value)}></input>
            </div>

            <div className='input-con'>
              <label className='label'>Risk/Riward Ratio*</label>
              <input type='text' value={rewardRatio} className='input-bar' onChange={event => updReward(event.target.value)}></input>
            </div>
          </div>
          <button className='btn' type="submit">Caluculate</button>
        </form>
        <div className={`result-cont ${isResult ? 'width' : ''}`}>
          {isResult && <>{renderResult()}</>}
        </div>
      </div>
    </div>
  );
}

export default App;
