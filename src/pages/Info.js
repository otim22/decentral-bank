import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function Info() {
  return (
    <div className="App">
      <Container className="p-3">
        <Row>
          <Col>
            <h3>Info</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}