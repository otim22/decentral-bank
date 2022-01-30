import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function Tokens() {
  return (
    <div className="App">
      <Container className="p-3">
        <Row>
          <Col>
            <h3>Tokens</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}