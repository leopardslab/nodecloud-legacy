/**
 * EC2 constructor
 * @constructor
 * @param {object} aws - AWS SDK
 * @param {object} options - { apiVersion }
 */
function EC2(aws, options) {
  this._AWS = aws;
  this._apiVersion = options.apiVersion;
}

/**
 * Create EC2 instance
 * @createInstance
 */
EC2.prototype.createInstance = function(params) {
  // Create EC2 service object
  const ec2 = new this._AWS.EC2({ apiVersion: "2016-11-15" });
  // Create the instance
  return new Promise((resolve, reject) => {
    if (!params) reject(new Error("Provide params to EC2"));

    ec2.runInstances(params, function(err, data) {
      if (err) reject(err);

      const instanceId = data.Instances[0].InstanceId;
      // Add tags to the instance
      ec2Params = {
        Resources: [instanceId],
        Tags: [
          {
            Key: params.key,
            Value: parms.value
          }
        ]
      };
      ec2.createTags(ec2Params, function(err) {
        if (err) reject(err);

        resolve(instanceId);
      });
    });
  });
};

module.exports = EC2;
