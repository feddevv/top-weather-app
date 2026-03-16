import { elements } from '../data/domElements.js'
import { removeHidden, addHidden } from '../utils/hiddenToggle.js'
import { icons } from '../data/icons.js'
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from '../utils/tempConverting.js'

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

    elements.weather.unitsCheckBox.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.units = 'fahrenheit'
        this.showFahrenheit()
      } else {
        this.units = 'celsius'
        this.showCelsius()
      }
    })
  }

  renderCurrentWeather(data) {
    const checked = elements.weather.unitsCheckBox.checked

    elements.weather.date.textContent = data.date
    elements.weather.city.textContent = `${data.city}, ${data.country}`
    elements.weather.icon.src = `./icons/${icons[data.weatherIcon]}`

    elements.weather.mainTemp.textContent = `${checked ? celsiusToFahrenheit(data.currentTemp) : data.currentTemp}°`

    elements.weather.condition.textContent = data.weatherMain

    elements.weather.feelsLike.textContent = `Feels like ${checked ? celsiusToFahrenheit(data.feelsLike) : data.feelsLike}°`

    elements.weather.wind.textContent = `${data.windSpeed} km/h`
    elements.weather.humidity.textContent = `${data.humidity}%`
    elements.weather.pressure.textContent = `${data.pressure} hPa`
  }

  showFahrenheit() {
    const currentTemp = parseInt(elements.weather.mainTemp.textContent)
    const feelsLikeTemp = parseInt(
      elements.weather.feelsLike.textContent.split(' ')[2],
    )

    elements.weather.mainTemp.textContent = `${celsiusToFahrenheit(currentTemp)}°`
    elements.weather.feelsLike.textContent = `Feels like ${celsiusToFahrenheit(feelsLikeTemp)}°`
  }

  showCelsius() {
    const currentTemp = parseInt(elements.weather.mainTemp.textContent)
    const feelsLikeTemp = parseInt(
      elements.weather.feelsLike.textContent.split(' ')[2],
    )

    elements.weather.mainTemp.textContent = `${fahrenheitToCelsius(currentTemp)}°`
    elements.weather.feelsLike.textContent = `Feels like ${fahrenheitToCelsius(feelsLikeTemp)}°`
  }

  showLoad() {
    removeHidden('.loader-wrapper')
  }

  hideLoad() {
    addHidden('.loader-wrapper')
  }
}
