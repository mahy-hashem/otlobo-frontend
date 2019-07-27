import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class OrderTimeframe extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>How long should we keep your Group open for?</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Choose from the dropdown menu for how long other hungry people can
              add their own orders to your group. If you forget to pick a
              timeframe, it defaults to 15 minutes
            </p>
          </Col>
          <Col>
            <div>
              <select
                name="dropdown"
                id="timeframe"
                onChange={e => this.props.onChange(e.target.value)}
              >
                <option value="">Please select a timeframe:</option>
                <option value="02 minutes">2 minutes</option>
                <option value="15 minutes" selected>
                  15 minutes
                </option>
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="60 minutes">1 hour</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderTimeframe;
