import { CityName, Results } from "./utils";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Col, Form, Row } from "react-bootstrap";

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

function DataAggregate({
  id,
  title,
  data,
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE,
}: {
  id: string;
  title: string;
  data: number[];
  max?: number;
  min?: number;
}) {
  const filter = (temp: number) => temp <= max && temp >= min;

  return (
    <Form.Group controlId={id}>
      <Form.Label>{title}</Form.Label>

      <Form.Control plaintext readOnly value={data.filter(filter).length} />
    </Form.Group>
  );
}

export function MyChart({
  cityName,
  results,
  showApparentHighs,
  showApparentLows,
  showActualHighs,
  showActualLows,
  ranges,
}: Props) {
  const data: { name: string; data: number[] }[] = [
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

  const [highRange, idealRange, lowRange] = ranges.sort(
    (a, b) => b.high - a.high
  );

  return (
    <Row>
      <Col sm={10}>
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
            series: data,
          }}
        />
      </Col>

      <Col>
        <Form>
          <DataAggregate
            id={`${cityName}-idealDaysApparent`}
            title="Ideal Days (apparent)"
            data={results.daily.apparent_temperature_max}
            min={idealRange.low}
            max={idealRange.high}
          />
          <DataAggregate
            id={`${cityName}-idealDaysApparent`}
            title="Ideal Days (actual)"
            data={results.daily.temperature_2m_max}
            min={idealRange.low}
            max={idealRange.high}
          />
          <DataAggregate
            id={`${cityName}-hotDaysApparent`}
            title="Hot Days (apparent)"
            data={results.daily.apparent_temperature_max}
            min={highRange.low}
          />
          <DataAggregate
            id={`${cityName}-hotDays`}
            title="Hot Days (actual)"
            data={results.daily.temperature_2m_max}
            min={highRange.low}
          />
          <DataAggregate
            id={`${cityName}-coldDaysApparent`}
            title="Cold Days (apparent)"
            data={results.daily.apparent_temperature_max}
            max={lowRange.high}
          />
          <DataAggregate
            id={`${cityName}-coldDays`}
            title="Cold Days (actual)"
            data={results.daily.temperature_2m_max}
            max={lowRange.high}
          />
        </Form>
      </Col>
    </Row>
  );
}
