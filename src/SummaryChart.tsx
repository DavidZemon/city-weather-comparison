import { CITY_MAPPING, CityName, Data } from "./utils";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Range } from "./TempOverTimeChart";

interface Props {
  data?: Data;
  ranges: Range[];
}

function createFilter(range: Range) {
  return (temp: number) => temp <= range.high && temp >= range.low;
}

export function SummaryChart({ data, ranges }: Props) {
  if (!data) {
    return null;
  } else {
    const cityNames = Object.keys(data) as CityName[];
    const [highRange, idealRange, lowRange] = ranges.sort(
      (a, b) => b.high - a.high
    );

    const series: {
      name: CityName;
      data: [number, number, number, number, number, number];
    }[] = cityNames.map((name) => {
      const dailyTemps = data[name].daily;
      return {
        name,
        data: [
          dailyTemps.apparent_temperature_max.filter(createFilter(idealRange))
            .length,
          dailyTemps.temperature_2m_max.filter(createFilter(idealRange)).length,
          dailyTemps.apparent_temperature_max.filter(createFilter(highRange))
            .length,
          dailyTemps.temperature_2m_max.filter(createFilter(highRange)).length,
          dailyTemps.apparent_temperature_max.filter(createFilter(lowRange))
            .length,
          dailyTemps.temperature_2m_max.filter(createFilter(lowRange)).length,
        ],
      };
    });

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: { type: "bar" },
          title: { text: "Weather Summary" },
          xAxis: {
            categories: [
              "Ideal Days (apparent)",
              "Ideal Days (actual)",
              "Hot Days (apparent)",
              "Hot Days (actual)",
              "Cold Days (apparent)",
              "Cold Days (actual)",
            ],
          },
          yAxis: {
            min: 0,
            title: { text: "Number of Days" },
          },
          plotOptions: {
            bar: {
              dataLabels: { enabled: true },
              groupPadding: 0.1,
            },
          },
          colors: cityNames.map((name) => CITY_MAPPING[name].color),
          series,
        }}
      />
    );
  }
}
