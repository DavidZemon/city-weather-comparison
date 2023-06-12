import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {CityName} from "./utils";
import {MyChart, Range} from "./MyChart";

function App() {
    const [showApparent, setApparent] = useState(true);
    const [showActual, setActual] = useState(false);
    const [showHighs, setHighs] = useState(true);
    const [showLows, setLows] = useState(false);
    const [red, setRed] = useState<Range>({color: "red", from: 100, to: 200});
    const [green, setGreen] = useState<Range>({color: "green", from: 65, to: 85});
    const [blue, setBlue] = useState<Range>({color: "blue", from: 35, to: -100});

    return (
        <Container>
            <Row>
                <Col>
                    {showHighs && <Button onClick={() => setHighs(false)}>Hide Highs</Button>}
                    {!showHighs && <Button onClick={() => setHighs(true)}>Show Highs</Button>}
                </Col>
                <Col>
                    {showLows && <Button onClick={() => setLows(false)}>Hide Lows</Button>}
                    {!showLows && <Button onClick={() => setLows(true)}>Show Lows</Button>}
                </Col>
            </Row>

            <Row>
                <Col>
                    {showApparent && <Button onClick={() => {
                        setApparent(false)
                    }}>Hide Apparent</Button>}
                    {!showApparent && <Button onClick={() => {
                        setApparent(true)
                    }}>Show Apparent</Button>}
                </Col>
                <Col>
                    {showActual && <Button onClick={() => {
                        setActual(false)
                    }}>Hide Actual</Button>}
                    {!showActual && <Button onClick={() => {
                        setActual(true)
                    }}>Show Actual</Button>}
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
                                showApparent={showApparent}
                                showActual={showActual}
                                showHighs={showHighs}
                                showLows={showLows}
                                ranges={[red, green, blue]}
                            />
                    )
            }
        </Container>
    );
}

export default App;
