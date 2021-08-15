
const axios = require('axios');

module.exports = function(apiUrl, timeout) {
  var client = axios.create({
    baseURL: apiUrl,
    timeout: timeout
  });

  /**
   * @param query
   * @returns {Promise<any>}
   */
  function getRequest(query) {
    return new Promise(function(resolve, reject) {
      client.get('/api?' + query).then(function(response) {
        var data = response.data;

        // data.status will return 0 if no records found for get log events
        // { status: '0', message: 'No records found', result: [] }
        // { status: '0', message: 'NOTOK', result: 'Error! Invalid topic1 length'}
        if (data.status && data.status != 1 && data.message == 'NOTOK') {
          let returnMessage = data.message ||'NOTOK';
          if (data.result && typeof data.result === 'string') {
            returnMessage = data.result;
          } else if (data.message && typeof data.message === 'string') {
            returnMessage = data.message;
          }

          return reject(returnMessage);
        }

        if (data.error) {
          var message = data.error;

          if(typeof data.error === 'object' && data.error.message){
            message = data.error.message;
          }

          return reject(new Error(message));
        }

        resolve(data);
      }).catch(function(error) {
        return reject(new Error(error));
      });
    });
  }

  return getRequest;
};
