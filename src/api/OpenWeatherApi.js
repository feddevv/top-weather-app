export default class OpenWeatherApi {
  #API_KEY = '8bdaac437edf6b913c8a7e41d3528a88'

  getCurrentWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.#API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`The error occurred! Status code: ${response.status}`)
    }

    const data = await response.json()

    console.log(data)
    return data
  }
}
