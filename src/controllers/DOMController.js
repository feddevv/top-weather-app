import { elements } from '../data/domElements.js'

export default class DOMController {
  initEventListeners(getCurrentWeather) {
    elements.searchButton.addEventListener('click', async (e) => {
      if (elements.searchField.value.trim() === '') return
      const data = await getCurrentWeather(elements.searchField.value)
      this.renderCurrentWeather(data)
    })

    window.addEventListener('load', async () => {
      const data = await getCurrentWeather('London')
      this.renderCurrentWeather(data)
    })
  }

  renderCurrentWeather(data) {
    elements.weather.date.textContent = data.date
    elements.weather.city.textContent = `${data.city}, ${data.country}`
    elements.weather.mainTemp.textContent = `${data.currentTemp}°`
    elements.weather.condition.textContent = data.weatherMain
    elements.weather.feelsLike.textContent = `Feels like ${data.feelsLike}°`
    elements.weather.wind.textContent = `${data.windSpeed} km/h`
    elements.weather.humidity.textContent = `${data.humidity}%`
    elements.weather.pressure.textContent = `${data.pressure} hPa`
  }
}
