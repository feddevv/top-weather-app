# Weather App

A vanilla JavaScript weather app with a controller-based architecture, OpenWeather integration, and a glassmorphism UI.

## Features

- Search weather by city name.
- Load default data for London on page load.
- Show current weather details: temperature, condition, feels like, wind, humidity, and pressure.
- Show 24-hour forecast in 3-hour steps (8 cards).
- Click any forecast card to update the main weather panel with that time slot.
- Toggle units between Celsius and Fahrenheit for both current and forecast temperatures.
- Horizontal forecast scrolling with mouse wheel.
- Display loading overlay while requests are in progress.

## Tech Stack

- JavaScript (ES modules, classes)
- Webpack 5
- HTML + CSS
- OpenWeather API (`/weather` and `/forecast` endpoints)
- ESLint + Prettier

## Project Structure

```text
top-weather-app/
├── public/
│   └── icons/                     # Static weather icons copied to build output
├── src/
│   ├── api/
│   │   └── OpenWeatherApi.js      # API calls + response normalization
│   ├── controllers/
│   │   ├── ApiController.js       # Thin API proxy layer
│   │   └── DOMController.js       # Event listeners, rendering, unit toggle, loaders
│   ├── data/
│   │   ├── domElements.js         # Centralized DOM element references
│   │   └── icons.js               # OpenWeather icon-code to local icon map
│   ├── styles/
│   │   ├── homePage.css           # Main page and forecast styles
│   │   └── utils.css              # Loader + utility classes
│   ├── utils/
│   │   ├── hiddenToggle.js        # Show/hide helpers
│   │   └── tempConverting.js      # C<->F conversion helpers
│   ├── assets/
│   │   └── main-background-sky.jpg
│   ├── index.js                   # App composition root
│   ├── main.css                   # Global imports
│   └── template.html              # Main HTML template
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── eslint.config.js
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

This starts Webpack Dev Server and opens the app in your browser.

### 3. Build for production

```bash
npm run build
```

Production files are generated in `dist/`.

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

This pushes the `dist/` subtree to the `gh-pages` branch.

## Available Scripts

- `npm run dev` - run development server (`webpack serve --open --config webpack.dev.js`)
- `npm run build` - build production bundle (`webpack --config webpack.prod.js`)
- `npm run deploy` - deploy `dist/` to GitHub Pages (`git subtree push --prefix dist origin gh-pages`)

## Application Flow

1. `src/index.js` wires `DOMController` with `ApiController`.
2. `DOMController.initEventListeners()` handles:

- search button click;
- initial load event;
- unit switch change;
- forecast wheel scrolling.

3. API layer requests:

- current weather via `/data/2.5/weather`;
- 5-day forecast via `/data/2.5/forecast`.

4. Responses are normalized in `OpenWeatherApi` methods:

- `formCurrentData()`
- `formForecastData()`

5. UI rendering:

- `renderCurrentWeather()` updates the main card;
- `renderForecast()` draws 8 forecast cards (next 24 hours).

## Normalized Weather Object Shape

Both current and forecast rendering use the same normalized object format:

```js
{
  city: 'London',
  country: 'GB',
  date: Date,
  currentTemp: 12,
  minTemp: 10.3,
  maxTemp: 13.6,
  feelsLike: 9,
  weatherMain: 'Clouds',
  weatherDescription: 'broken clouds',
  weatherIcon: '04d',
  humidity: 74,
  windSpeed: 4.1,
  pressure: 1015,
}
```

## Known Limitations

- Search currently triggers only by click (no Enter key handler).
- API errors are logged to console only (no UI error state yet).
- API key is stored in source code.
- No automated tests yet.

## Security Note

`src/api/OpenWeatherApi.js` currently contains a hardcoded API key.
For real deployment, move it to environment variables and never commit secrets.

## License

ISC
