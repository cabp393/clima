import React, { useState } from 'react'
import { useWeather } from './services/client.js'
import './components/spinner.css'

export default function App() {
  const [input, setInput] = useState('Dalcahue')
  const [data, loading, mssError] = useWeather(input)

  function handleChange(e) {
    setInput(e.target.value)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="input-container">
          <input onChange={handleChange} type="text" spellcheck="false" />
        </div>
        {loading && (
          <div className="loading-spinner">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        {mssError && (
          <div>
            <p>Error al solicitar los datos.</p>
          </div>
        )}
        {data && (
          <div className="info">
            <div className="data">
              {/* <h1>{data.name}</h1> */}
              <div className="minmax">
                {Math.round(data.temp_max)}° day 🡅 · {Math.round(data.temp_min)}
                ° night 🡇
              </div>
              <div className="now">{Math.round(data.temp)}°</div>
              <div className="sens">Feels like {Math.round(data.sens)}°</div>
            </div>
            <div className="city">
              <div className="city-name">
                {data.name} <div className="sens"> {data.country}</div>
              </div>
              <div className="city-img">
                <img
                  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                />
              </div>
              <div className="sens">{capitalizeFirstLetter(data.des)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
