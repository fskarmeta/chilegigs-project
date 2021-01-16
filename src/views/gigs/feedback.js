import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import Feedback from "../../components/gigs/feedback";

const todoOk = (
  <h4 className="font-weight-bold text-success">
    Muchas gracias !! Volverás a la página anterior....
  </h4>
);

const FeedbackView = () => {
  const { store } = useContext(Context);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);

  let { id } = useParams();
  let history = useHistory();
  function sendFeedback(data) {
    fetch(`${store.fetchUrl}user/feedback`, {
      method: "PUT",
      body: JSON.stringify(data),
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
          console.log(data.msg);
          setMsg(data.msg);
          setError(true);
        } else {
          setError(false);
          setOk(true);
          setTimeout(function () {
            history.goBack();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMsg(error.message);
        setError(true);
      });
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      {ok ? todoOk : <Feedback id={id} sendFeedback={sendFeedback} />}
      {error ? msg : null}
    </div>
  );
};

export default FeedbackView;
