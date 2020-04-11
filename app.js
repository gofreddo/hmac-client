const axios = require('axios');
const hmmacInterceptor = require('./lib/hmmacInterceptor');
const credentials = require('./lib/credentials');

const validApiCredentials = credentials('1');

axios.defaults.headers.common = { ...axios.defaults.headers.common,
  'Content-Type': 'application/json;charset=utf-8' };
const interceptor = hmmacInterceptor(validApiCredentials);
axios.interceptors.request.use(interceptor);

axios
  .put('http://localhost:4000/users', { name: 'new Guy' })
  .then((result) => {
    // eslint-disable-next-line no-console
    console.log(result.data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

// axios
//   .get('http://localhost:4000/users')
//   .then((result) => {
//     // eslint-disable-next-line no-console
//     console.log(result.data);
//   })
//   .catch((error) => {
//     // eslint-disable-next-line no-console
//     console.log(error);
//   });

// axios
//   .get('http://localhost:4000')
//   .then((result) => {
//     // eslint-disable-next-line no-console
//     console.log(result.data);
//   })
//   .catch((error) => {
//     // eslint-disable-next-line no-console
//     console.log(error);
//   });
