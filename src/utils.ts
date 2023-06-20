import Axios from "axios";

export type CityName = "St. Louis" | "Atlanta" | "Mobile";

interface CityMeta {
  latitude: string;
  longitude: string;
  timezone: string;
}

const CITY_MAPPING: { [k in CityName]: CityMeta } = {
  "St. Louis": {
    latitude: "38.63",
    longitude: "-90.20",
    timezone: "America/Chicago",
  },
  Atlanta: {
    latitude: "33.75",
    longitude: "-84.39",
    timezone: "America/New_York",
  },
  Mobile: {
    latitude: "30.69",
    longitude: "-88.04",
    timezone: "America/Chicago",
  },
};

const BASE_URL = "https://archive-api.open-meteo.com/v1";

export interface GetParams {
  cityName: CityName;
  startDate?: string;
  endDate?: string;
  includeHourly?: boolean;
}

export interface Results {
  daily: {
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
  hourly?: {
    temperature_2m: number[];
    time: string[];
  };
}

export async function get({
  cityName,
  startDate = "2022-06-01",
  endDate = "2023-06-01",
  includeHourly = false,
}: GetParams): Promise<Results> {
  const city = CITY_MAPPING[cityName];
  const ST_LOUIS_QUERY_PARAMS =
    `latitude=${city.latitude}` +
    `&longitude=${city.longitude}` +
    `&timezone=${city.timezone}`;

  const URL =
    `${BASE_URL}/archive` +
    `?${ST_LOUIS_QUERY_PARAMS}` +
    `&start_date=${startDate}` +
    `&end_date=${endDate}` +
    (includeHourly ? `&hourly=temperature_2m` : ``) +
    `&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min` +
    `&temperature_unit=fahrenheit` +
    `&windspeed_unit=mph` +
    `&precipitation_unit=inch`;

  return (await Axios.get(URL)).data;
}
