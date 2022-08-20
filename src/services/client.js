import { useState, useEffect } from 'react'

export const useWeather = (city = 'Dalcahue') => {
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
  const API_ID = '&appid=49db267b8509f095b2d836d7f44d00c5&units=metric'

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mssError, setMssError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}${city}${API_ID}`)
      .then(res => res.json())
      .then(res => {
        // console.log('data', res.weather[0].icon)
        setData({
          name: res.name,
          temp: res.main.temp,
          temp_min: res.main.temp_min,
          temp_max: res.main.temp_max,
          icon: res.weather[0].icon,
        })
        setLoading(false)
        setMssError(null)
      })
      .catch(err => {
        setData(null)
        setLoading(false)
        setMssError(err)
      })
  }, [city])

  return [data, loading, mssError]
}
