import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ModalLogin } from './modalLogin';

export function Header(){
  const [show,setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return(
    <>
      <div className="container-fluid sticky-top" style={{ zIndex: 1030, background: "rgba(255, 248, 246)"}}>
        <div className="row">
          <div className="navbar navbar-expand-lg">
            <div className="container">
              <a href="/home" className="navbar-brand">
                <img src="/src/images/1.png" width="110" height="110" className="d-inline-block align-text-top" />
              </a>
              <button className="navbar-toggler" type="button" onClick={handleShow}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end">
                <ul className="navbar-nav">
                  <li className="nav-item px-2 fs-5">
                    <a href="/donors" className="nav-link">Donate Blood</a>
                  </li>
                  <li className="nav-item px-2 fs-5">
                    <a href="/request" className="nav-link">Request Blood</a>
                  </li>
                  <li className="nav-item px-2 fs-5" onClick={() => setShowModal(true)}>
                    <a href="#" className="nav-link">Login</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ModalLogin show={showModal} onHide={() => setShowModal(false)} />
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{color:'black'}}> home </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{color:'black'}}> about </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{color:'black'}}> services </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{color:'black'}}> contact </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{color:'black'}}> login </a>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  )
}
