const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncAWS = nodeCloud.getProvider(
  providers.AWS,
  "/home/rajika/projects/gsoc/config.json"
);
const options = {
  apiVersion: "2016-11-15"
};
const ec2 = ncAWS.EC2(options);

describe("AWS EC2", () => {
  before(() => {});

  it("should list all EC2 instance", done => {
    nock("https://ec2.us-west-2.amazonaws.com").post("/").reply(200, {
      Reservations: [
        {
          ReservationId: "r-0df3e7df18e0db8e3",
          OwnerId: "878299302707",
          Groups: [],
          Instances: [Object]
        },
        {
          ReservationId: "r-0cd510af1918b68fa",
          OwnerId: "878299302707",
          Groups: [],
          Instances: [Object]
        }
      ]
    });

    const params = {
      DryRun: false
    };

    ec2
      .list(params)
      .then(res => {
        assert.typeOf(ncAWS, "object");
        done();
      })
      .catch(err => {
        assert(err, "object");
        done();
      });
  });

  it("should start EC2 instance", done => {
    nock("https://ec2.us-west-2.amazonaws.com").post("/").reply(200, [
      {
        InstanceId: "i-03fe236b187a898b6",
        CurrentState: { Code: 16, Name: "running" },
        PreviousState: { Code: 16, Name: "running" }
      }
    ]);

    const params = {
      InstanceIds: ["i-0e8463a71076e3d5f"],
      DryRun: true
    };

    ec2
      .start(params)
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        assert.typeOf(err, "string");
        done();
      });
  });

  it("should stop EC2 instance", done => {
    nock("https://ec2.us-west-2.amazonaws.com").post("/").reply(200, [
      {
        InstanceId: "i-03fe236b187a898b6",
        CurrentState: { Code: 64, Name: "stopping" },
        PreviousState: { Code: 16, Name: "running" }
      }
    ]);

    const params = {
      InstanceIds: ["i-0e8463a71076e3d5f"],
      DryRun: true
    };

    ec2
      .stop(params)
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        assert.typeOf(err, "string");
        done();
      });
  });

  it("should reboot EC2 instance", done => {
    nock("https://ec2.us-west-2.amazonaws.com").post("/").reply(200, [
      {
        InstanceId: "i-03fe236b187a898b6",
        CurrentState: { Code: 64, Name: "rebooting" },
        PreviousState: { Code: 16, Name: "running" }
      }
    ]);

    const params = {
      InstanceIds: ["i-0e8463a71076e3d5f"],
      DryRun: true
    };

    ec2
      .reboot(params)
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        assert.typeOf(err, "string");
        done();
      });
  });

  it("should terminate/destroy EC2 instance", done => {
    nock("https://ec2.us-west-2.amazonaws.com").post("/").reply(200, [
      {
        InstanceId: "i-03fe236b187a898b6",
        CurrentState: { Code: 64, Name: "terminating" },
        PreviousState: { Code: 16, Name: "running" }
      }
    ]);

    const params = {
      InstanceIds: ["i-0e8463a71076e3d5f"],
      DryRun: true
    };

    ec2
      .destroy(params)
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        done();
      });
  });
});
