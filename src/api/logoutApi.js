import axios from "axios";

const logout = async () => {
  const apiEndPoint = "http://localhost:3000/logout";

  const headers = {
    "cache-control": "no-cache"
  };

  return await axios({
    method: "post",
    url: apiEndPoint,
    headers: headers
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      return err;
    });
};

export default logout;
