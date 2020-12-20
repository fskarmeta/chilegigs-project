import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import Feedback from "../../components/gigs/feedback";

const FeedbackView = () => {
  const { store } = useContext(Context);

  let { id } = useParams();

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
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Feedback id={id} sendFeedback={sendFeedback} />
    </div>
  );
};

export default FeedbackView;
