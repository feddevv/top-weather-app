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
    console.log(data)

    return this.formData(data)
  }

  formData(data) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }
    const currentDate = new Date().toLocaleDateString('en-US', options)
    const formed = {
      city: data.name,
      country: data.sys.country,
      date: currentDate,
      currentTemp: Math.round(data.main.temp),
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      feelsLike: Math.round(data.main.feels_like),
      weatherMain: data.weather[0].main,
      weatherDescription: data.weather[0].description,

      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
    }
    console.log(formed)
    return formed
  }
}
