import React, { useContext } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AppContext } from "../store/AppProvider";

function CustomNavbar() {
  const {
    navData: { countries, country },
    setNavData,
  } = useContext(AppContext);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Noodle Woodle</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Countries" id="basic-nav-dropdown">
                {countries.map((e) => (
                  <NavDropdown.Item
                    key={e + Math.random()}
                    onClick={() =>
                      setNavData({ type: "FILTER_COUNTRY", payload: e })
                    }
                  >
                    {e}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() =>
                    setNavData({ type: "FILTER_COUNTRY", payload: "" })
                  }
                >
                  Clear Selection
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {country.length > 0 && (
              <>
                <span style={{ fontSize: 15, fontWeight: 400 }}>
                  selected:&nbsp;
                </span>
                <Badge bg="primary">{country}</Badge>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
