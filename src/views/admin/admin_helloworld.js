import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import { AdminNav } from "../../components/admin/navbar_admin";
import AccountsTable from "../../components/admin/general/lista";
import { Card } from "react-bootstrap";

export const HelloWorld = () => {
  const { store, actions } = useContext(Context);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (store.role !== "admin") {
      history.push("/");
    } else {
      fetch(`${store.fetchUrl}admin/accounts/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.msg) {
            setIsLoaded(true);
            console.log(data.msg);
          } else {
            setError(null);
            setInfo(data);
            setIsLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoaded(true);
          setError(error);
        });
    }
  }, [history, isLoaded, store.fetchUrl, store.role, store.token]);

  function deleteAccount(id) {
    actions.deleteAccountFromAdmin(id);
    fetchInfo();
  }

  function fetchInfo() {
    fetch(`${store.fetchUrl}admin/accounts/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg) {
          setIsLoaded(true);
          console.log(data.msg);
        } else {
          setError(null);
          setInfo(data);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setError(error);
      });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1">
            <AdminNav />
          </div>
          <div className="col-md-11">
            <div className="container">
              <Card className="text-center border-rounded mb-3">
                <Card.Header>
                  <h2>Panel de Control</h2>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div className="row">
                      <div className="col-md-6">
                        <Card>
                          <Card.Body>
                            <div className="d-flex flex-column">
                              <h4>Clientes</h4>
                              <h5 className="m-1 font-weight-bold">
                                {!!info && info.clients}
                              </h5>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-md-6">
                        <Card>
                          <Card.Body>
                            <div className="d-flex flex-column">
                              <h4>Dj's</h4>
                              <h5 className="m-1 font-weight-bold">
                                {!!info && info.djs}
                              </h5>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Chilegigs Admin
                </Card.Footer>
              </Card>
              <div className="col-md-12">
                <h5 className="m-2">Últimos 10 Clientes</h5>
                <AccountsTable
                  users={!!info && info.lastclients}
                  type={"client"}
                  deleteAccount={deleteAccount}
                />
              </div>
              <div className="col-md-12">
                <h5 className="m-2">Últimos 10 Dj</h5>
                <AccountsTable
                  users={!!info && info.lastdjs}
                  type={"dj"}
                  deleteAccount={deleteAccount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
