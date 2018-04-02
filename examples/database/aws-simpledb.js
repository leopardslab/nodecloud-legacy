const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

const simpleDB = ncAWS.indexedDB(options);

const params = {
  DomainName: 'nodeCloudTestDomain' /* required */
};

simpleDB.createDomain(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
