import { CITY_MAPPING, CityName, Data } from "./utils";
import { TempOverTimeChart, Range } from "./TempOverTimeChart";

interface Props {
  data: Data | undefined;
  showApparentHighs: boolean;
  showApparentLows: boolean;
  showHighs: boolean;
  showLows: boolean;
  ranges: Range[];
}

export function ChartData({
  data,
  showApparentHighs,
  showApparentLows,
  showHighs,
  showLows,
  ranges,
}: Props) {
  return (
    <>
      {!!data &&
        (Object.keys(CITY_MAPPING) as CityName[]).map((cityName) => (
          <TempOverTimeChart
            key={cityName}
            cityName={cityName}
            results={data[cityName]}
            showApparentHighs={showApparentHighs}
            showApparentLows={showApparentLows}
            showActualHighs={showHighs}
            showActualLows={showLows}
            ranges={ranges}
          />
        ))}
    </>
  );
}
