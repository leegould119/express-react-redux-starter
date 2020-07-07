import axios from 'axios';

const getBlogsApi = async () => {
  const apiEndPoint = 'http://localhost:3000/blog/get-all-blogs';
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

export default getBlogsApi;
