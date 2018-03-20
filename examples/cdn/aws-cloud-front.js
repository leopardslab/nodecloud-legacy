const nodecloud = require('../../lib');

const ncAWS = nodecloud.getProvider("AWS");

const options = {
  apiVersion: "2016-11-15"
};

const cloudFront = ncAWS.cdn(options);

const params = {
  MaxItems: '100'
};

cloudFront.listDistributions(params).then(res => {
  console.log(JSON.stringify(res));
}).catch(err => {
  console.error(err);
});