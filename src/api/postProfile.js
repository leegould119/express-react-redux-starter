import axios from 'axios';

const registerProfile = async (_id) => {
  console.log(_id);
  const apiEndPoint = 'http://localhost:3000/profile';
  const tel = '0730200806';
  const postalcode = '07333';
  const data = {
    userId: _id,
    firstName: 'Lee',
    lastName: 'Gould',
    phoneNumber: parseInt(tel),
    gender: 'Male',
    dateOfBirth: new Date(),
    address: {
      street: 'Kiselbacken 4',
      city: 'Sundsvall',
      state: 'Vasternorrlands lan',
      postalCode: parseInt(postalcode)
    }
  };
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
