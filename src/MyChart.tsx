import {CityName, get, Results} from "./utils";
import React, {useState} from "react";
import {Button, Row} from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

export function MyChart({cityName}: { cityName: CityName }) {
    const [data, setData] = useState<Results | undefined>();

    return <Row>
        <Button onClick={async () => {
            const results = await get({cityName});
            setData(results);
        }}>Load {cityName}</Button>

        {data?.daily && <p>Got data with {data.daily.apparent_temperature_max.length} daily points .</p>}

        {data?.hourly && <p>Got data {data.hourly.temperature_2m.length / 24} days worth of hourly points.</p>}

        {data && <HighchartsReact
            highcharts={Highcharts}
            options={{
                title: {text: 'Weather Data'},
                xAxis: {
                    "categories": data?.daily?.time
                },
                yAxis: {
                    name: "Temperature (F)",
                    min: 0,
                    max: 100
                },
                series: [
                    {
                        name: "Apparent High",
                        data: data?.daily?.apparent_temperature_max
                    },
                    {
                        name: "Apparent Low",
                        data: data?.daily?.apparent_temperature_min
                    }
                ]
            }}
        />}
    </Row>;
}
