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
    showApparentHighs: boolean;
    showApparentLows: boolean;
    showActualHighs: boolean;
    showActualLows: boolean;
    ranges: Range[];
}

export function MyChart(
    {
        cityName,
        showApparentHighs,
        showApparentLows,
        showActualHighs,
        showActualLows,
        ranges,
    }: Props
) {
    const [results, setResults] = useState<Results | undefined>();

    const data: { name: string, data: number[] }[] = [
        {
            name: "Apparent High",
            data: showApparentHighs && results?.daily ? results?.daily?.apparent_temperature_max : []
        },
        {
            name: "Apparent Low",
            data: showApparentLows && results?.daily ? results?.daily?.apparent_temperature_min : []
        },
        {
            name: "High",
            data: showActualHighs && results?.daily ? results?.daily?.temperature_2m_max : []
        },
        {
            name: "Low",
            data: showActualLows && results?.daily ? results?.daily?.temperature_2m_min : []
        },
    ];


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
