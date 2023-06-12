import React from 'react';
import {Container} from "react-bootstrap";
import 'highcharts/css/themes/dark-unica.css';
import {CityName} from "./utils";
import {MyChart} from "./MyChart";

function App() {

    return (
        <Container>
            {
                (
                    [
                        "St. Louis",
                        "Atlanta",
                        "Mobile"
                    ] as CityName[]
                )
                    .map(
                        (cityName) => <MyChart cityName={cityName} key={cityName}/>
                    )
            }
        </Container>
    );
}

export default App;
