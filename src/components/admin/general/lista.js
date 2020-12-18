import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./lista.css";

const AccountsTable = ({ users, type, deleteAccount }) => {
  return (
    <>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Fecha creación</th>
            <th>Username</th>
            <th>Email</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {!!users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{new Date(user.time_created).toLocaleString()}</td>
                  <td>
                    <Link to={`/${type}/profile/${user.username}`}>
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <small
                      className="text-danger account-delete"
                      onClick={() => deleteAccount(user.id)}
                    >
                      Borrar
                    </small>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default AccountsTable;
