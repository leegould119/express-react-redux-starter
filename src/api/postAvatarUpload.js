import axios from 'axios';

const uploadAvatar = async (formData) => {
  const apiEndPoint = 'http://localhost:3000/upload-profile-pic';

  return await axios({
    method: 'post',
    url: apiEndPoint,
    data: formData
  })
    .then(function (response) {
      //handle success
      return response.data;
    })
    .catch(function (response) {
      //handle error
      return response;
    });
};
export default uploadAvatar;
