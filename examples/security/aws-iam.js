const nodeCloud = require('../../lib/');
var assert = require('assert')

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
	apiVersion: '2016-11-15',
};

const iam = ncAWS.iam(options)
const groupName = "nodeCloudTest"
const GroupParams = {
	GroupName: groupName
};

const GroupPolicyParams = {
	GroupName: groupName,
	PolicyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

iam
	.createGroup(GroupParams)
	.then((res) => {
		console.log(res);

		console.log('Attaching Group Policy');

		iam
			.attachGroupPolicy(GroupPolicyParams)
			.then((res) => {
				console.log(res);

				console.log('Detaching Group Policy');

				iam
					.detachGroupPolicy(GroupPolicyParams)
					.then((res) => {
						console.log(res);

						console.log("Deleting Group");

						iam
							.deleteGroup(GroupParams)
							.then((res) => {
								console.log(res);
							})
							.catch((err) => {
								console.log(err);
							});
					})
			})
			.catch((err) => {
				console.log(err);
			});
})
	.catch((err) => {
		console.log(err);
});
