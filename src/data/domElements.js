export const elements = {
  searchButton: document.querySelector('.search-btn'),
  searchField: document.getElementById('search'),

  weather: {
    date: document.querySelector('.weather-card-date'),
    city: document.querySelector('.weather-card-city'),
    icon: document.querySelector('.weather-card-icon'),
    mainTemp: document.querySelector('.weather-main-temp'),
    minTemp: document.querySelector('.min-temp'),
    maxTemp: document.querySelector('.max-temp'),
    condition: document.querySelector('.weather-main-condition'),
    feelsLike: document.querySelector('.weather-main-feels'),
    wind: document.querySelector('.wind'),
    humidity: document.querySelector('.humidity'),
    pressure: document.querySelector('.pressure'),

    unitsCheckBox: document.getElementById('convert'),

    // Forecast
    forecastList: document.querySelector('.forecast-list'),
    forecastMainTemp: document.querySelectorAll('.forecast-temp'),
  },
}
