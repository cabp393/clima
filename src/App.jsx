import React, { useState } from 'react'
import { useWeather } from './services/client.js'
import './components/spinner.css'

export default function App() {
  const [input, setInput] = useState('Dalcahue')
  const [data, loading, mssError] = useWeather(input)

  console.log('->', data, loading, mssError)

  function handleChange(e) {
    setInput(e.target.value)
  }

  return (
    <div className="card">
      <input onChange={handleChange} type="text" />
      {loading && (
        <div>
          <div className="lds-dual-ring"></div>
        </div>
      )}
      {mssError && (
        <div>
          <p>Error al solicitar los datos.</p>
        </div>
      )}
      {data && (
        <div>
          <h1>{data.name}</h1>
          <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} />
          <p>Temp actual: {data.temp}°</p>
          <p>Temp mínima: {data.temp_min}°</p>
          <p>Temp máxima: {data.temp_max}°</p>
        </div>
      )}
    </div>
  )
}
