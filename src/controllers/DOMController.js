import { elements } from '../data/domElements.js'
import { removeHidden, addHidden } from '../utils/hiddenToggle.js'
import { icons } from '../data/icons.js'

export default class DOMController {
  initEventListeners(getCurrentWeather) {
    elements.searchButton.addEventListener('click', async (e) => {
      try {
        if (elements.searchField.value.trim() === '') return
        this.showLoad()

        const data = await getCurrentWeather(elements.searchField.value)
        this.renderCurrentWeather(data)
      } catch (err) {
        console.log(err)
      } finally {
        this.hideLoad()
      }
    })

    window.addEventListener('load', async () => {
      try {
        this.showLoad()
        const data = await getCurrentWeather('London')
        this.renderCurrentWeather(data)
      } catch (err) {
        console.log(err)
      } finally {
        this.hideLoad()
      }
    })
  }

  renderCurrentWeather(data) {
    elements.weather.date.textContent = data.date
    elements.weather.city.textContent = `${data.city}, ${data.country}`
    elements.weather.icon.src = `./icons/${icons[data.weatherIcon]}`
    elements.weather.mainTemp.textContent = `${data.currentTemp}°`
    elements.weather.condition.textContent = data.weatherMain
    elements.weather.feelsLike.textContent = `Feels like ${data.feelsLike}°`
    elements.weather.wind.textContent = `${data.windSpeed} km/h`
    elements.weather.humidity.textContent = `${data.humidity}%`
    elements.weather.pressure.textContent = `${data.pressure} hPa`
  }

  showLoad() {
    removeHidden('.loader-wrapper')
  }

  hideLoad() {
    addHidden('.loader-wrapper')
  }
}
