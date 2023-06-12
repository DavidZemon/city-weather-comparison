import {CityName, get, Results} from "./utils";
import React, {useState} from "react";
import {Button, Row} from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

export interface Range {
    color: string;
    from: number;
    to: number;
}

interface Props {
    cityName: CityName;
    showApparent: boolean;
    showActual: boolean;
    showHighs: boolean;
    showLows: boolean;
    ranges: Range[];
}

export function MyChart(
    {
        cityName,
        showApparent,
        showActual,
        showHighs,
        showLows,
        ranges,
    }: Props
) {
    const [results, setResults] = useState<Results | undefined>();

    const data: { name: string, data: number[] }[] = [];

    if (showApparent && showHighs && results?.daily?.apparent_temperature_max)
        data.push({
            name: "Apparent High",
            data: results?.daily?.apparent_temperature_max
        });

    if (showApparent && showLows && results?.daily?.apparent_temperature_min)
        if (showLows) {
            data.push({
                name: "Apparent Low",
                data: results?.daily?.apparent_temperature_min
            });
        }

    if (showActual && showHighs && results?.daily?.temperature_2m_max)
        data.push({
            name: "High",
            data: results?.daily?.temperature_2m_max
        });

    if (showActual && showLows && results?.daily?.temperature_2m_min)
        data.push({
            name: "Low",
            data: results?.daily?.temperature_2m_min
        });

    return <Row>
        {!results && <Button onClick={async () => {
            const results = await get({cityName});
            setResults(results);
        }}>Load {cityName}</Button>}

        {results && <HighchartsReact
            highcharts={Highcharts}
            options={{
                title: {text: cityName},
                xAxis: {
                    "categories": results?.daily?.time
                },
                yAxis: {
                    name: "Temperature (F)",
                    min: 0,
                    max: 110,
                    tickAmount: 12,
                    plotBands: ranges
                },
                series: data
            }}
        />}
    </Row>;
}
