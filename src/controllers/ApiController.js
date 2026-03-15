export default class ApiController {
  constructor(api) {
    this.api = api
  }

  getCurrentWeather = async (city) => {
    return await this.api.getCurrentWeather(city)
  }
}
