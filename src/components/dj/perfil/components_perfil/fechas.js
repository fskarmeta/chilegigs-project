import { Table } from "react-bootstrap";

const optionsHoras = { hour: "2-digit", minute: "2-digit" };

// const options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

const Fechas = ({ gigs }) => {
  return (
    <>
      <h5 className="text-center mt-3 mb-1 font-italic">Próximas Fechas</h5>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>
              <small className="font-weight-bold">Dia</small>
            </th>
            <th>
              <small className="font-weight-bold">Hora</small>
            </th>
            <th>
              <small className="font-weight-bold">Evento</small>
            </th>
            <th>
              <small className="font-weight-bold">Link</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {!!gigs &&
            gigs.map((gig) => {
              return (
                <tr>
                  <td>
                    <small>
                      {new Date(gig.dia_evento).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <small>
                      {new Date(gig.hora_show).toLocaleString(
                        "es-CL",
                        optionsHoras
                      )}
                    </small>
                  </td>
                  <td>
                    <small>
                      {gig.privado ? "Evento privado" : gig.nombre_evento}
                    </small>
                  </td>
                  <td>
                    {gig.privado ? (
                      ""
                    ) : (
                      <small>
                        <a
                          style={{ textDecoration: "none", color: "inherit" }}
                          href={`${gig.link_evento}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link
                        </a>
                      </small>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default Fechas;
