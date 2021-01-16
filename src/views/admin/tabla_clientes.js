import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import { AdminNav } from "../../components/admin/navbar_admin";
import AccountsTable from "../../components/admin/general/lista";

const TablaClientes = () => {
  const { store, actions } = useContext(Context);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (store.role !== "admin") {
      history.push("/");
    } else {
      fetch(`${store.fetchUrl}admin/accounts/clients`, {
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
  }, [history, store.fetchUrl, store.role, store.token, isLoaded]);

  function deleteAccount(id) {
    actions.deleteAccountFromAdmin(id);
    fetchInfo();
  }

  function fetchInfo() {
    fetch(`${store.fetchUrl}admin/accounts/clients`, {
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
            <div className="container w-75 mt-3">
              <AccountsTable
                users={!!info && info}
                type={"client"}
                deleteAccount={deleteAccount}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TablaClientes;
