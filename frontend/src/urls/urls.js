export const rootApi = process.env.REACT_APP_SERVER_URL;

export const createNewCity = `${rootApi}/create-new-city`;
export const getCityList = `${rootApi}/get-city-list`;
export const getWeatherData = `${rootApi}/get-weather-data`;
