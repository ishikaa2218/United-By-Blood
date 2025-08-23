import { Navbar, Container, Nav } from 'react-bootstrap';

export const AdminHeader = () => {
  return (
    <>
        <Navbar bg="danger-subtle" data-bs-theme="light" expand="lg" style={{ backgroundColor: '#f8d7da' }}>
        <Container>
            <Navbar.Brand>
              <img src="/src/images/1.png" width="110" height="110" className="d-inline-block align-text-top" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link href="/home" className="fs-5">Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  );
};
