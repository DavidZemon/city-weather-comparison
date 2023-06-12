import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {CityName} from "./utils";
import {MyChart, Range} from "./MyChart";

function App() {
    const [showApparentHighs, setApparent] = useState(true);
    const [showActualHighs, setActual] = useState(false);
    const [showActualLows, setHighs] = useState(true);
    const [showApparentLows, setLows] = useState(false);
    const [red, setRed] = useState<Range>({color: "red", from: 100, to: 200});
    const [green, setGreen] = useState<Range>({color: "green", from: 65, to: 85});
    const [blue, setBlue] = useState<Range>({color: "blue", from: 35, to: -100});

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Button onClick={() => setApparent(!showApparentHighs)}>
                        {showApparentHighs ? "Hide" : "Show"} Apparent Highs
                    </Button>
                </Col>

                <Col>
                    <Button onClick={() => setLows(!showApparentLows)}>
                        {showApparentLows ? "Hide" : "Show"} Apparent Lows
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button onClick={() => setActual(!showActualHighs)}>
                        {showActualHighs ? "Hide" : "Show"} Actual Highs
                    </Button>
                </Col>

                <Col>
                    <Button onClick={() => setHighs(!showActualLows)}>
                        {showActualLows ? "Hide" : "Show"} Actual Lows
                    </Button>
                </Col>
            </Row>

            {
                ([
                    [red, setRed],
                    [green, setGreen],
                    [blue, setBlue]
                ] as [Range, (range: Range) => void][])
                    .map(
                        ([value, setter]) => <Row>
                            <Col>
                                <input
                                    value={value.color}
                                    onChange={(e) => setter({...value, color: e.target.value.trim()})}
                                />
                            </Col>

                            <Col>
                                <input
                                    value={value.from}
                                    onChange={
                                        (e) => setter({...value, from: Number.parseInt(e.target.value.trim())})
                                    }
                                />
                            </Col>

                            <Col>
                                <input
                                    value={value.to}
                                    onChange={
                                        (e) => setter({...value, to: Number.parseInt(e.target.value.trim())})
                                    }
                                />
                            </Col>
                        </Row>
                    )
            }

            {
                (
                    [
                        "St. Louis",
                        "Atlanta",
                        "Mobile"
                    ] as CityName[]
                )
                    .map(
                        (cityName) =>
                            <MyChart
                                key={cityName}
                                cityName={cityName}
                                showApparentHighs={showApparentHighs}
                                showApparentLows={showApparentLows}
                                showActualHighs={showActualHighs}
                                showActualLows={showActualLows}
                                ranges={[red, green, blue]}
                            />
                    )
            }
        </Container>
    );
}

export default App;
