import { CityName, Results } from "./utils";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export interface Range {
  color: string;
  low: number;
  high: number;
}

interface Props {
  cityName: CityName;
  results: Results;
  showApparentHighs: boolean;
  showApparentLows: boolean;
  showActualHighs: boolean;
  showActualLows: boolean;
  ranges: Range[];
}

export function TempOverTimeChart({
  cityName,
  results,
  showApparentHighs,
  showApparentLows,
  showActualHighs,
  showActualLows,
  ranges,
}: Props) {
  const series: { name: string; data: number[] }[] = [
    {
      name: "Apparent High",
      data:
        showApparentHighs && results?.daily
          ? results?.daily?.apparent_temperature_max
          : [],
    },
    {
      name: "Apparent Low",
      data:
        showApparentLows && results?.daily
          ? results?.daily?.apparent_temperature_min
          : [],
    },
    {
      name: "High",
      data:
        showActualHighs && results?.daily
          ? results?.daily?.temperature_2m_max
          : [],
    },
    {
      name: "Low",
      data:
        showActualLows && results?.daily
          ? results?.daily?.temperature_2m_min
          : [],
    },
  ];

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        title: { text: cityName },
        xAxis: {
          categories: results?.daily?.time,
        },
        yAxis: {
          name: "Temperature (F)",
          min: 0,
          max: 110,
          tickAmount: 12,
          plotBands: ranges.map((range) => ({
            color: range.color,
            from: range.low,
            to: range.high,
          })),
        },
        series,
      }}
    />
  );
}
