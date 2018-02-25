const nodeCloud = require('../../lib/');
var assert = require('assert')

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
	apiVersion: '2016-11-15',
};

const iam = ncAWS.iam(options)

const params = {
	GroupName: 'nodeCloudTest'
};

iam
	.createGroup(params)
	.then((res) => {
	assert.equal(res.Group.GroupName, 'nodeCloudTest');
})
	.catch((err) => {
		console.log(err);
});
