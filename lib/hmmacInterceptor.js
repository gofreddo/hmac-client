const url = require('url');
const Hmmac = require('hmmac-es6');

const hmmacInterceptor = (credentials, hmmacConfig = undefined) => {
  const hmmac = new Hmmac(hmmacConfig);


  const interceptor = async (config) => {
    const thisConfig = { ...config };
    const parsedUrl = url.parse(thisConfig.url);

    const headers = JSON.parse(JSON.stringify({
      ...thisConfig.headers[thisConfig.method],
      ...thisConfig.headers.common,
    }).toLowerCase().replace(/ /g, ''));

    const httpRequest = {
      host: parsedUrl.hostname.toLowerCase(),
      port: parsedUrl.port,
      path: parsedUrl.path.toLowerCase(),
      method: thisConfig.method.toUpperCase(),
      headers: {
        ...headers,
        Date: new Date().toUTCString(),
      },
    };

    if (thisConfig.data) {
      httpRequest.body = thisConfig.data;
    }
    hmmac.sign(httpRequest, credentials);
    thisConfig.headers[thisConfig.method] = { ...httpRequest.headers };

    return thisConfig;
  };

  return interceptor;
};

module.exports = hmmacInterceptor;
