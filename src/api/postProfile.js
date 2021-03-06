import axios from 'axios';

const registerProfile = async (_id, data) => {
  console.log(data);
  console.log(_id);
  const apiEndPoint = 'http://localhost:3000/profile';
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
      console.log(resp.data);
      return resp.data;
    })
    .catch((err) => {
      //   console.log(err);
      return err;
    });
};

export default registerProfile;
