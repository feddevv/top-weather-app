export default class ApiController {
  constructor(api) {
    this.api = api
  }

  getCurrentWeather = async (city) => {
    await this.api.getCurrentWeather(city)
  }
}
