import axios from "axios";

const loginUser = async (uname, pw) => {
  const apiEndPoint = "http://localhost:3000/login";
  const data = { uname: "gunilla@gmail.com", pw: "Maxiepuss1" };
  const headers = {
    Accept: "tesst/html",
    "cache-control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json"
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
      return err.message;
    });
};

export default loginUser;
