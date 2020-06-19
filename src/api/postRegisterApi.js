import axios from 'axios';

const registerUser = async (uname, pw) => {
  const apiEndPoint = 'http://localhost:3000/register';
  const data = { uname: uname, pw: pw };
  const headers = {
    'cache-control': 'no-cache'
  };

  return await axios({
    method: 'post',
    url: apiEndPoint,
    headers: headers,
    data: data
  })
    .then((resp) => {
      //   console.log(resp.data);
      return resp.data;
    })
    .catch((err) => {
      //   console.log(err);
      return err;
    });
};

export default registerUser;
