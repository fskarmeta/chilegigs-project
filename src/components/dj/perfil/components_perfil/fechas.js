import { Table, Card } from "react-bootstrap";

const Fechas = () => {
  return (
    <>
      <h5 className="text-center mt-3 mb-1 font-italic">Próximas Fechas</h5>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Lugar</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22/11/2020</td>
            <td>22:00</td>
            <td>Club Sauna</td>
            <td>
              <Card.Link
                style={{ textDecoration: "none", color: "inherit" }}
                href="https://www.google.com"
                target="_blank"
              >
                Link
              </Card.Link>
            </td>
          </tr>
          <tr>
            <td>26/11/2020</td>
            <td>3:00</td>
            <td>Evento Privado</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Fechas;
