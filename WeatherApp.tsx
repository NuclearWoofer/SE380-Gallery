import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useWeatherFetch } from './useWeatherFetch';
import axios from 'axios';

const WeatherApp = () => {
  const zipCode = '02909';
  const apiKey = '69b9dadf89e54109b2e201910232908';
  const url =
    `http://api.weatherapi.com/v1/current.json` +
    `?q=${zipCode}` +
    `&key=${apiKey}`;

  const { loading, data, error } = useWeatherFetch(url);

  useEffect(() => {
    // Fetching weather data is already happening in the custom hook.
  }, [url]);

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

  return (
    <View style={{ flex: 1 }}>
      <Text>Current Location: {data.location.name}</Text>
      <Text>Current Weather: {data.current.condition.text}</Text>
    </View>
  );
};

export default WeatherApp;
