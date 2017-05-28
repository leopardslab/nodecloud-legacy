const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
const gceCompute = ncGoogle.compute();

describe("Google/GCP compute", () => {
  before(() => {});

  it("should list all VMs", done => {
    nock("https://www.googleapis.com").post("/").reply(200, [
      [],
      null,
      {
        kind: "compute#instanceAggregatedList",
        id: "projects/network-feed/aggregated/instances",
        items: {
          "zones/us-central1-a": [Object],
          "zones/us-central1-b": [Object],
          "zones/us-central1-c": [Object],
          "zones/us-central1-f": [Object]
        },
        selfLink: "https://www.googleapis.com/compute/v1/projects/network-feed/aggregated/instances"
      }
    ]);

    gceCompute
      .list({
        maxResults: 1
      })
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should create a VM", done => {
    nock("https://www.googleapis.com").post("/").reply(200, {
      kind: "compute#operation",
      id: "6938271866528690876",
      name: "operation-1495977043009-550954c3d9de8-2a6ba0ee-4494f840",
      zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
    });

    gceCompute
      .create({
        zone: "us-central1-a",
        os: "ubuntu",
        name: "ubuntu-http"
      })
      .then(res => {
        assert(typeof res, "object");
        assert.equal(res.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should start VM", done => {
    nock("https://www.googleapis.com").post("/").reply(200, [
      {
        InstanceId: "i-03fe236b187a898b6",
        CurrentState: { Code: 16, Name: "running" },
        PreviousState: { Code: 16, Name: "running" }
      }
    ]);
    gceCompute
      .start({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        const operation = res[0];
        const apiResponse = res[1];
        assert(typeof operation, "object");
        assert.equal(operation.metadata.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should stop VM", done => {
    nock("https://www.googleapis.com").post("/").reply(200, [
      {
        metadata: {
          kind: "compute#operation",
          id: "6897008157210932040",
          name: "operation-1495977383246-55095608538b0-957e790d-eadfbaa9",
          zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
        }
      },
      {
        kind: "compute#operation",
        id: "6429809873974161408",
        name: "operation-1495977711086-55095740fa9b1-cab7346a-8c7562e7",
        zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
      }
    ]);

    gceCompute
      .stop({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        const operation = res[0];
        assert(typeof operation, "object");
        assert.equal(operation.metadata.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should reboot VM", done => {
    nock("https://www.googleapis.com").post("/").reply(200, [
      {
        metadata: {
          kind: "compute#operation",
          id: "6429809873974161408",
          name: "operation-1495977711086-55095740fa9b1-cab7346a-8c7562e7",
          zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
        }
      },
      {
        kind: "compute#operation",
        id: "6429809873974161408",
        name: "operation-1495977711086-55095740fa9b1-cab7346a-8c7562e7",
        zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
      }
    ]);

    gceCompute
      .reboot({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        const apiResponse = res[1];
        assert(typeof apiResponse, "object");
        assert.equal(apiResponse.metadata.id, "string");
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("should terminate/destory VM", done => {
    nock("https://www.googleapis.com").post("/").reply(200, [
      {
        metadata: {
          kind: "compute#operation",
          id: "4203946787968872729",
          name: "operation-1495977974290-5509583bfd650-3faf8fc3-8ad2e463",
          zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a",
          operationType: "delete",
          targetLink: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http",
          targetId: "3805777528351060668",
          status: "PENDING",
          user: "98211670959-compute@developer.gserviceaccount.com",
          progress: 0,
          insertTime: "2017-05-28T06:26:14.536-07:00",
          selfLink: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a/operations/operation-1495977974290-5509583bfd650-3faf8fc3-8ad2e463"
        }
      },
      {
        kind: "compute#operation",
        id: "4203946787968872729",
        name: "operation-1495977974290-5509583bfd650-3faf8fc3-8ad2e463",
        zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a"
      }
    ]);

    gceCompute
      .destroy({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        const operation = res[0];
        const apiResponse = res[1];
        assert(typeof apiResponse, "object");
        assert.equal(apiResponse.meta.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });
});
