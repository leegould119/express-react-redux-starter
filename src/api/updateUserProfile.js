import axios from 'axios';

const updateProfile = async (data) => {
  console.log(data);
  const apiEndPoint = 'http://localhost:3000/update-profile';
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

export default updateProfile;
