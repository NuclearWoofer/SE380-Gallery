import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useWeatherFetch } from './useWeatherFetch';
import axios from 'axios';

const WeatherApp = () => {
  const zipCode = '02865';
  const url =
    `http://api.weatherapi.com/v1/` +
    `?q=${zipCode}` +
    `&days=5` +
    `&key=09885dc1ac4041939b9151003231608`;

  const { loading, data, error } = useWeatherFetch(url);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }
  //testing
  useEffect(() => {
    console.log('Fetching weather data...');
    const getCurrentWeather = async () => {
      try {
        const response = await axios.get(url);
        console.log('Weather data:', response.data);
      } catch (error) {
        console.log('Weather data fetch error:', error);
      }
    };
    getCurrentWeather();
  }, [url]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Location: {data.location.name}</Text>
      <Text>Weather: {data.current.condition.text}</Text>

      <View>
        <Text>Forecast for the next {data.forecast.forecastday.length} days:</Text>
        {data.forecast.forecastday.map((forecastDay, index) => (
          <View key={index}>
            <Text>Day {index + 1}</Text>
            <Text>Date: {forecastDay.date}</Text>
            <Text>Weather: {forecastDay.day.condition.text}</Text>
            <Text>Temperature: {forecastDay.day.avgtemp_c}°C</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeatherApp;
