# Weather App (v1)

The first version of a weather app built with vanilla JavaScript, a controller-based architecture, OpenWeather API integration, and a glassmorphism-inspired UI.

## Overview

This app allows users to:

- search current weather by city name;
- automatically load weather data for London on first page load;
- display core weather metrics (temperature, condition, humidity, wind, pressure);
- show a loader while API requests are in progress.

## Tech Stack

- JavaScript (ES Modules, classes)
- Webpack 5
- HTML5 + CSS3
- OpenWeather API
- ESLint + Prettier

## Project Structure

```text
top-weather-app/
├── src/
│   ├── api/
│   │   └── OpenWeatherApi.js      # Handles HTTP requests to OpenWeather
│   ├── controllers/
│   │   ├── ApiController.js       # API proxy controller
│   │   └── DOMController.js       # UI events, rendering, loader logic
│   ├── data/
│   │   └── domElements.js         # Centralized DOM selectors
│   ├── styles/
│   │   ├── homePage.css           # Main page styles
│   │   └── utils.css              # Loader + utility classes
│   ├── utils/
│   │   └── hiddenToggle.js        # Helper functions to hide/show elements
│   ├── assets/
│   │   └── main-background-sky.jpg
│   ├── index.js                   # Entry point
│   ├── main.css                   # Font/style imports
│   └── template.html              # HTML template
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── eslint.config.js
└── package.json
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start development mode

```bash
npm run dev
```

Webpack Dev Server opens the app in your browser automatically.

### 3. Build production bundle

```bash
npm run build
```

Build output is generated in the dist directory.

## NPM Scripts

- `npm run dev` - starts dev server (`webpack serve --open --config webpack.dev.js`)
- `npm run build` - creates production build (`webpack --config webpack.prod.js`)

## Data Flow

1. `src/index.js` creates instances of `DOMController` and `ApiController`.
2. `DOMController.initEventListeners()` subscribes to:
   - search button click;
   - `window.load` event (default city: London).
3. `ApiController.getCurrentWeather(city)` forwards the call to API layer.
4. `OpenWeatherApi.getCurrentWeather(city)` sends a `fetch` request to OpenWeather.
5. Returned data is normalized in `formData()`.
6. `DOMController.renderCurrentWeather()` updates weather card content in the DOM.

## Weather Data Shape (v1)

After normalization, the app works with an object in this format:

```js
{
  ;(city,
    country,
    date,
    currentTemp,
    minTemp,
    maxTemp,
    feelsLike,
    weatherMain,
    weatherDescription,
    humidity,
    windSpeed,
    pressure)
}
```

## Security Note

In v1, the OpenWeather API key is stored directly in code at `src/api/OpenWeatherApi.js`.
For production use, move the key to environment variables and avoid committing secrets to the repository.

## Current v1 Limitations

- search is triggered only by button click (no Enter key handling);
- errors are logged to console only (no user-facing UI messages);
- no tests yet;
- no UI localization.

## v2 Ideas

- Enter key support for search input;
- user-friendly error messages in UI;
- multi-day forecast;
- unit switcher (C/F);
- move API key to environment variables.

## License

ISC
