export default class OpenWeatherApi {
  #API_KEY = '8bdaac437edf6b913c8a7e41d3528a88'

  getCurrentWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.#API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`The error occurred! Status code: ${response.status}`)
    }

    const data = await response.json()

    return this.formCurrentData(data)
  }

  getForecast = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.#API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`The error occurred! Status code: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)

    return this.formForecastData(data)
  }

  formCurrentData(data) {
    const currentDate = new Date()
    const formed = {
      city: data.name,
      country: data.sys.country,
      date: currentDate,
      currentTemp: Math.round(data.main.temp),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      feelsLike: Math.round(data.main.feels_like),
      weatherMain: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      weatherIcon: data.weather[0].icon,

      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
    }
    return formed
  }

  formForecastData(data) {
    const forecast = []

    data.list.forEach((el) => {
      const formed = {
        city: data.city.name,
        country: data.city.country,
        date: new Date(el.dt_txt),
        currentTemp: Math.round(el.main.temp),
        minTemp: Math.round(el.main.temp_min),
        maxTemp: Math.round(el.main.temp_max),
        feelsLike: Math.round(el.main.feels_like),
        weatherMain: el.weather[0].main,
        weatherDescription: el.weather[0].description,
        weatherIcon: el.weather[0].icon,

        humidity: el.main.humidity,
        windSpeed: el.wind.speed,
        pressure: el.main.pressure,
      }

      forecast.push(formed)
    })

    return forecast
  }
}
