import axios from "axios";

export default {
  loginUser: function (email, password) {
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
