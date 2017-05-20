const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider(
  "AWS",
  "/home/rajika/projects/gsoc/examples/AWS/config.json"
);
const options = {
  apiVersion: "2016-11-15"
};

// const params = {
//   ImageId: "ami-10fd7020", // amzn-ami-2011.09.1.x86_64-ebs
//   InstanceType: "t1.micro",
//   MinCount: 1,
//   MaxCount: 1
// };
// const instanceParams = {
//   Key: "Name",
//   Value: "Node Cloud demo"
// };

const ec2 = ncAWS.EC2(options);

// ec2
//   .create(params, instanceParams)
//   .then(res => {
//     console.log(`All done ! ${res}`);
//   })
//   .catch(err => {
//     console.log(`Oops something happened ${err}`);
//   });

// const params = {
//   DryRun: false
// };

// ec2.
//   list(params)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const params = {
  InstanceIds: ["i-0e8463a71076e3d5f"],
  DryRun: false
};

// ec2
//   .stop(params)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// ec2
//   .start(params)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// ec2
//   .reboot(params)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// ec2
//   .destroy(params)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

