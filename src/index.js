import './main.css'
import DOMController from './controllers/DOMController.js'
import OpenWeatherApi from './api/OpenWeatherApi.js'
import ApiController from './controllers/ApiController.js'

const DomController = new DOMController()
const api = new ApiController(new OpenWeatherApi())

DomController.initEventListeners(api.getCurrentWeather, api.getForecast)
