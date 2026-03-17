import { elements } from '../data/domElements.js'
import { removeHidden, addHidden } from '../utils/hiddenToggle.js'
import { icons } from '../data/icons.js'
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from '../utils/tempConverting.js'

export default class DOMController {
  initEventListeners(getCurrentWeather, getForecast) {
    elements.searchButton.addEventListener('click', async () => {
      try {
        if (elements.searchField.value.trim() === '') return
        this.showLoad()

        const current = await getCurrentWeather(elements.searchField.value)
        const forecast = await getForecast(elements.searchField.value)
        const data = await Promise.all([current, forecast])

        this.renderCurrentWeather(data[0])
        this.renderForecast(data[1])
      } catch (err) {
        console.log(err)
      } finally {
        this.hideLoad()
      }
    })

    window.addEventListener('load', async () => {
      try {
        this.showLoad()
        const current = await getCurrentWeather('London')
        const forecast = await getForecast('London')
        const data = await Promise.all([current, forecast])
        this.renderCurrentWeather(data[0])
        this.renderForecast(data[1])
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

    elements.weather.forecastList.addEventListener('wheel', (e) => {
      e.preventDefault()
      elements.weather.forecastList.scrollLeft += e.deltaY
    })
  }

  renderCurrentWeather(data) {
    const dateOption = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }
    const checked = elements.weather.unitsCheckBox.checked

    elements.weather.date.textContent = data.date.toLocaleDateString(
      'en-US',
      dateOption,
    )
    elements.weather.city.textContent = `${data.city}, ${data.country}`
    elements.weather.icon.src = `./icons/${icons[data.weatherIcon]}`

    elements.weather.mainTemp.textContent = `${checked ? celsiusToFahrenheit(data.currentTemp) : data.currentTemp}°`

    elements.weather.condition.textContent = data.weatherDescription

    elements.weather.feelsLike.textContent = `Feels like ${checked ? celsiusToFahrenheit(data.feelsLike) : data.feelsLike}°`

    elements.weather.wind.textContent = `${data.windSpeed} km/h`
    elements.weather.humidity.textContent = `${data.humidity}%`
    elements.weather.pressure.textContent = `${data.pressure} hPa`
  }

  renderForecast(data) {
    elements.weather.forecastList.innerHTML = ''
    for (let i = 0; i < 8; i++) {
      const item = document.createElement('article')
      item.className = 'forecast-item'
      item.innerHTML = `
          <p class="forecast-time">${data[i].date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <img src="icons/${icons[data[i].weatherIcon]}" class="forecast-icon" alt="Cloudy" />
          <p class="forecast-temp">${data[i].currentTemp}°</p>
          <p class="forecast-condition">${data[i].weatherDescription}</p>
      `

      item.addEventListener('click', (e) => {
        const currentActive = document.querySelector('.active')
        if (currentActive) {
          currentActive.classList.remove('active')
        }
        e.currentTarget.classList.add('active')
        this.renderCurrentWeather(data[i])
      })

      elements.weather.forecastList.appendChild(item)

      // Add divider after each element except the last one
      if (i < 7) {
        const divider = document.createElement('div')
        divider.className = 'forecast-divider'
        elements.weather.forecastList.appendChild(divider)
      }
    }
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
