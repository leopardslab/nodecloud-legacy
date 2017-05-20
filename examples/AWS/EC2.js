const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider("AWS");
const options = {
  apiVersion: "2016-11-15"
};

const params = {
  ImageId: "ami-10fd7020", // amzn-ami-2011.09.1.x86_64-ebs
  InstanceType: "t1.micro",
  MinCount: 1,
  MaxCount: 1
};
const instanceParams = {
  Key: "Name",
  Value: "Node Cloud demo"
};

const ec2 = ncAWS.EC2(options);

ec2
  .createInstance(params, instanceParams)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
