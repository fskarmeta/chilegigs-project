import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  estilosOptions,
  serviciosOptions,
  tecnicaOptions,
} from "../../../components/dj/edit-profile/items";

const Filtros = ({
  setElectronica,
  setGroovy,
  setComercial,
  setTecnica,
  setServicio,
  limpiar,
}) => {
  // const [electronica, setElectronica] = useState("");
  // const [groovy, setGroovy] = useState("");
  // const [comercial, setComercial] = useState("");
  // const [tecnica, setTecnica] = useState("");
  // const [servicio, setServicio] = useState("");

  return (
    <Navbar bg="light" expand="lg" className="d-flex justify-content-evenly">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Electronica" id="basic-nav-dropdown">
            {estilosOptions[0].options.map((genero, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setElectronica(genero.value)}
                >
                  {genero.value}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Groovy" id="basic-nav-dropdown">
            {estilosOptions[1].options.map((genero, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setGroovy(genero.value)}
                >
                  {genero.value}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Comercial" id="basic-nav-dropdown">
            {estilosOptions[2].options.map((genero, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setComercial(genero.value)}
                >
                  {genero.value}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Técnica" id="basic-nav-dropdown">
            {tecnicaOptions.map((tecnica, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setTecnica(tecnica.value)}
                >
                  {tecnica.value}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Servicios" id="basic-nav-dropdown">
            {serviciosOptions.map((servicio, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setServicio(servicio.value)}
                >
                  {servicio.value}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Form>
        <Button variant="outline-secondary" onClick={limpiar}>
          Limpiar
        </Button>
      </Form>
    </Navbar>
  );
};

export default Filtros;
