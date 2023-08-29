import axios from "axios";
import { useEffect, useState } from "react";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    condition: {
      text: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        avgtemp_c: number;
      };
    }[];
  };
}

export const useWeatherFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData | undefined>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url);
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }, [url]);
  return { loading, data, error };
};

