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
    // Create EC2 service object
    const ec2 = new this._AWS.EC2({ apiVersion: this._apiVersion });
    // Create the instance
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to EC2'));

      ec2.runInstances(params, (err, data) => {
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
        ec2.createTags(ec2Params, (err) => {
          if (err) reject(err);

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
    const ec2 = new this._AWS.EC2({ apiVersion: this._apiVersion });

    return new Promise((resolve, reject) => {
      if (!params) {
        reject(
          'Error: Supply params, find docs on http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property',
        );
      }
      ec2.describeInstances(params, (err, data) => {
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
    const ec2 = new this._AWS.EC2({ apiVersion: this._apiVersion });

    return new Promise((resolve, reject) => {
      ec2.startInstances(params, (err, data) => {
        if (err && err.code === 'DryRunOperation') {
          params.DryRun = false;
          ec2.startInstances(params, (err, data) => {
            if (err) {
              reject(err);
            } else if (data) {
              resolve(data.StartingInstances);
            }
          });
        } else {
          reject("You don't have permission to start instances.");
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
    const ec2 = new this._AWS.EC2({ apiVersion: this._apiVersion });

    return new Promise((resolve, reject) => {
      ec2.stopInstances(params, (err, data) => {
        if (err && err.code === 'DryRunOperation') {
          params.DryRun = false;
          ec2.stopInstances(params, (err, data) => {
            if (err) {
              reject(err);
            } else if (data) {
              resolve(data.StoppingInstances);
            }
          });
        } else {
          reject("You don't have permission to stop instances");
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
    const ec2 = this._ec2;

    return new Promise((resolve, reject) => {
      ec2.rebootInstances(params, (err, data) => {
        if (err && err.code === 'DryRunOperation') {
          params.DryRun = false;
          ec2.rebootInstances(params, (err, data) => {
            if (err) {
              reject(err);
            } else if (data) {
              resolve(data);
            }
          });
        } else {
          reject("You don't have permission to reboot instances.");
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
    const ec2 = this._ec2;
    return new Promise((resolve, reject) => {
      ec2.terminateInstances(params, (err, data) => {
        if (err) reject(err, err.stack);
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = EC2;
