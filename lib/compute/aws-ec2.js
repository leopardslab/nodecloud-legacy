class EC2 {
  /**
   * EC2 constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._ec2 = new this._AWS.EC2({ apiVersion: this._apiVersion });
  }
  /**
   * Create EC2 instance
   * @create
   * @param {object} params
   * @param {object} instanceParams
   */
  create(params, instanceParams) {
    // Create the instance
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to EC2'));

      this._ec2.runInstances(params, (err, data) => {
        if (err) reject(err);

        const instanceId = data.Instances[0].InstanceId;
        // Add tags to the instance
        const ec2Params = {
          Resources: [instanceId],
          Tags: [
            {
              Key: instanceParams.Key,
              Value: instanceParams.Value,
            },
          ],
        };
        this._ec2.createTags(ec2Params, (error) => {
          if (error) reject(err);

          resolve(instanceId);
        });
      });
    });
  }
  /**
   * Describes one or more of your instances
   * @list
   * @param {object} params
   */
  list(params) {
    return new Promise((resolve, reject) => {
      if (!params) {
        reject(new Error('Error: Supply params, find docs on http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property'));
      }
      this._ec2.describeInstances(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Start instance
   * @start
   * @param {object} params
   */
  start(params) {
    return new Promise((resolve, reject) => {
      this._ec2.startInstances(params, (err, data) => {
        if (err) {
          reject(err);
        } else if (data) {
          resolve(data.StartingInstances);
        }
      });
    });
  }
  /**
   * Stop instance
   * @stop
   * @param {object} params
   */
  stop(params) {
    return new Promise((resolve, reject) => {
      this._ec2.stopInstances(params, (err, data) => {
        if (err) {
          reject(err);
        } else if (data) {
          resolve(data.StoppingInstances);
        }
      });
    });
  }
  /**
   * Reboot instance
   * @reboot
   * @param {object} params
   */
  reboot(params) {
    return new Promise((resolve, reject) => {
      this._ec2.rebootInstances(params, (err, data) => {
        if (err) {
          reject(err);
        } else if (data) {
          resolve(data);
        }
      });
    });
  }
  /**
   * Terminate instance
   * @destory
   * @param {object} params
   */
  destroy(params) {
    return new Promise((resolve, reject) => {
      this._ec2.terminateInstances(params, (err, data) => {
        if (err) reject(err, err.stack);
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = EC2;
