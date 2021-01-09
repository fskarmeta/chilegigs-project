import { Link } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import { colorState } from "../../general/helper";

const GigsTable = ({ gigs }) => {
  return (
    <>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Día Evento</th>
            <th>Evento</th>
            <th>DJ</th>
            <th>Cliente</th>
            <th>Privado</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {!!gigs &&
            gigs.map((gig) => {
              return (
                <tr key={gig.id}>
                  <td>{new Date(gig.dia_evento).toLocaleDateString()}</td>
                  <td>{gig.nombre_evento}</td>
                  <td>
                    <Link to={`/dj/profile/${gig.username_dj}`}>
                      {gig.username_dj}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/client/profile/${gig.username_cliente}`}>
                      {gig.username_cliente}
                    </Link>
                  </td>
                  <td>{gig.privado ? "Si" : "No"}</td>
                  <td>
                    <Badge variant={`${colorState(gig.estado)}`}>
                      {gig.estado}
                    </Badge>
                  </td>
                  <td>
                    <Link to={`/gigs/${gig.id}`}>{`Detalle`}</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default GigsTable;
