import { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { CityName, get, Results } from "./utils";
import { MyChart, Range } from "./MyChart";

function App() {
  const [showApparentHighs, setApparentHighs] = useState(true);
  const [showApparentLows, setShowApparentLows] = useState(true);
  const [showHighs, setHighs] = useState(false);
  const [showLows, setLows] = useState(false);
  const [red, setRed] = useState<Range>({ color: "red", low: 100, high: 200 });
  const [green, setGreen] = useState<Range>({
    color: "green",
    low: 65,
    high: 85,
  });
  const [blue, setBlue] = useState<Range>({
    color: "blue",
    low: -100,
    high: 35,
  });

  const [data, setData] = useState<{ [k in CityName]: Results } | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

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
                onClick={() => setApparentHighs(!showApparentHighs)}
              />

              <Form.Switch
                id="apparentLows"
                title="Show daily apparent low temperatures (heat index / wind chill)"
                label="Daily Apparent Lows"
                defaultChecked={showApparentLows}
                onClick={() => setShowApparentLows(!showApparentLows)}
              />

              <Form.Switch
                id="highs"
                title="Show daily high temperatures"
                label="Daily Highs"
                defaultChecked={showHighs}
                onClick={() => setHighs(!showHighs)}
              />

              <Form.Switch
                id="lows"
                title="Show daily low temperatures"
                label="Daily Lows"
                defaultChecked={showLows}
                onClick={() => setLows(!showLows)}
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
                    value={value.low}
                    onChange={(e) =>
                      setter({
                        ...value,
                        low: Number.parseInt(e.target.value.trim()),
                      })
                    }
                  />
                </Col>

                <Col>
                  <input
                    value={value.high}
                    onChange={(e) =>
                      setter({
                        ...value,
                        high: Number.parseInt(e.target.value.trim()),
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
            <>
              {!!data || (
                <Button
                  onClick={async () => {
                    setLoading(true);
                    const data = Object.fromEntries(
                      await Promise.all(
                        (["St. Louis", "Atlanta", "Mobile"] as CityName[]).map(
                          async (cityName) => {
                            const result = await get({ cityName });
                            return [cityName, result];
                          }
                        )
                      )
                    );
                    setLoading(false);
                    setData(data);
                  }}
                >
                  {loading ? <Spinner animation="border" /> : "Load data"}
                </Button>
              )}

              {!!data &&
                (["St. Louis", "Atlanta", "Mobile"] as CityName[]).map(
                  (cityName) => (
                    <MyChart
                      key={cityName}
                      cityName={cityName}
                      results={data[cityName]}
                      showApparentHighs={showApparentHighs}
                      showApparentLows={showApparentLows}
                      showActualHighs={showHighs}
                      showActualLows={showLows}
                      ranges={[red, green, blue]}
                    />
                  )
                )}
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default App;
