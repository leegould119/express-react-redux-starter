import axios from 'axios';

const createBlogApi = async (data) => {
  const apiEndPoint = 'http://localhost:3000/blog/create-blog';
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
      return resp.data;
    })
    .catch((err) => {
      return err;
    });
};

export default createBlogApi;
