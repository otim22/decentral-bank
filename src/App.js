import MetaMaskOnboarding from '@metamask/onboarding';
import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { shortenAddress } from '@usedapp/core'

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
// const CONNECTED_TEXT = 'Connected';

function App() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  const [isDisabled, setDisabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  const onboarding = useRef()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        console.log(accounts);
        let acc
        acc = shortenAddress(accounts[0])
        setButtonText(acc)
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts)
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
      window.ethereum.on('accountsChanged', handleNewAccounts)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts)
      }
    }
  }, [])

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts))
    } else {
      onboarding.current.startOnboarding();
    }
  }

  return (
    <div className="App">
      <Container className="p-3">
        <Container className="mb-4 bg-light rounded-3">
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
              <Navbar.Brand href="#home">Decentral Bank</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Trade" id="tradeScrollingDropdown">
                    <NavDropdown.Item href="#exchange">Exchange</NavDropdown.Item>
                    <NavDropdown.Item href="#liquidity">Liquidity</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#farms">Farms</Nav.Link>
                  <Nav.Link href="#pools">Pools</Nav.Link>
                  <Nav.Link href="#ntf">NTF</Nav.Link>
                  <Nav.Link href="#info">Info</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#connect">
                    <Button disabled={isDisabled} onClick={onClick}>
                      {buttonText}
                    </Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Row>
          <Col>
            <h3>Home</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
