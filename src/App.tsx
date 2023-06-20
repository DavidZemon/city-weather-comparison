import { useState } from "react";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import { CityName } from "./utils";
import { MyChart, Range } from "./MyChart";

function App() {
  const [showApparentHighs, setApparentHighs] = useState(true);
  const [showApparentLows, setShowApparentLows] = useState(true);
  const [showHighs, setHighs] = useState(false);
  const [showLows, setLows] = useState(false);
  const [red, setRed] = useState<Range>({ color: "red", from: 100, to: 200 });
  const [green, setGreen] = useState<Range>({
    color: "green",
    from: 65,
    to: 85,
  });
  const [blue, setBlue] = useState<Range>({
    color: "blue",
    from: 35,
    to: -100,
  });

  return (
    <Container>
      <Accordion defaultActiveKey={["data"]} alwaysOpen={true}>
        <Accordion.Item eventKey="dataConfig">
          <Accordion.Header>Data Configuration</Accordion.Header>

          <Accordion.Body>
            <Form>
              <Form.Switch
                id="apparentHighs"
                title="Show daily apparent high temperatures (heat index / wind chill)"
                label="Daily Apparent Highs"
                defaultChecked={showApparentHighs}
                onClick={(e) => setApparentHighs(!showApparentHighs)}
              />

              <Form.Switch
                id="apparentLows"
                title="Show daily apparent low temperatures (heat index / wind chill)"
                label="Daily Apparent Lows"
                defaultChecked={showApparentLows}
                onClick={(e) => setShowApparentLows(!showApparentLows)}
              />

              <Form.Switch
                id="highs"
                title="Show daily high temperatures"
                label="Daily Highs"
                defaultChecked={showHighs}
                onClick={(e) => setHighs(!showHighs)}
              />

              <Form.Switch
                id="lows"
                title="Show daily low temperatures"
                label="Daily Lows"
                defaultChecked={showLows}
                onClick={(e) => setLows(!showLows)}
              />
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="chartConfig">
          <Accordion.Header>Chart Configuration</Accordion.Header>
          <Accordion.Body>
            {(
              [
                [red, setRed],
                [green, setGreen],
                [blue, setBlue],
              ] as [Range, (range: Range) => void][]
            ).map(([value, setter]) => (
              <Row>
                <Col>
                  <input
                    value={value.color}
                    onChange={(e) =>
                      setter({ ...value, color: e.target.value.trim() })
                    }
                  />
                </Col>

                <Col>
                  <input
                    value={value.from}
                    onChange={(e) =>
                      setter({
                        ...value,
                        from: Number.parseInt(e.target.value.trim()),
                      })
                    }
                  />
                </Col>

                <Col>
                  <input
                    value={value.to}
                    onChange={(e) =>
                      setter({
                        ...value,
                        to: Number.parseInt(e.target.value.trim()),
                      })
                    }
                  />
                </Col>
              </Row>
            ))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="data">
          <Accordion.Header>Data</Accordion.Header>

          <Accordion.Body>
            {(["St. Louis", "Atlanta", "Mobile"] as CityName[]).map(
              (cityName) => (
                <MyChart
                  key={cityName}
                  cityName={cityName}
                  showApparentHighs={showApparentHighs}
                  showApparentLows={showApparentLows}
                  showActualHighs={showHighs}
                  showActualLows={showLows}
                  ranges={[red, green, blue]}
                />
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default App;
