import MetaMaskOnboarding from '@metamask/onboarding';
import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { shortenAddress } from '@usedapp/core';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';

export function Header() {
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
    <div className="TopBar">
        <Container className="p-2">
          <Container className="mb-4 bg-light rounded-3">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>Decentral Bank</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title="Trade" id="tradeScrollingDropdown">
                      <LinkContainer to="/exchange">
                        <NavDropdown.Item>Exchange</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/liquidity">
                        <NavDropdown.Item>Liquidity</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="/farms">
                      <Nav.Link>Farms</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tokens">
                      <Nav.Link>Tokens</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/nft">
                      <Nav.Link>NFT</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/info">
                      <Nav.Link>Info</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <Nav>
                    <LinkContainer to="/connect">
                      <Nav.Link>
                        <Button disabled={isDisabled} onClick={onClick}>
                          {buttonText}
                        </Button>
                      </Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
        </Container>
    </div>
  );
}
