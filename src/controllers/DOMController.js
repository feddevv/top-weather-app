import { elements } from '../data/domElements.js'

export default class DOMController {
  initEventListeners(getWeather) {
    elements.searchButton.addEventListener('click', async (e) => {
      if (elements.searchField.value.trim() === '') return
      await getWeather(elements.searchField.value)
    })
  }
}
