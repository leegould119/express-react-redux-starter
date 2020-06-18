import axios from "axios";
let Cookies = require("cookies-js");
const checkAuth = async (id) => {
  const apiEndPoint = "http://localhost:3000/authorised";
  const data = { id: id };
  const headers = {
    "cache-control": "no-cache"
  };

  return await axios({
    method: "post",
    url: apiEndPoint,
    headers: headers,
    data: data
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default checkAuth;
