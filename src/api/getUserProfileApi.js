import axios from 'axios';

const getUserProfile = async (_id) => {
  console.log(_id);
  const apiEndPoint = 'http://localhost:3000/profile/' + _id;
  const headers = {
    'cache-control': 'no-cache'
  };

  return await axios({
    method: 'get',
    url: apiEndPoint,
    headers: headers
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      //   console.log(err);
      return err;
    });
};

export default getUserProfile;
