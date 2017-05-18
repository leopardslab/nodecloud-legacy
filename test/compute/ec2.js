const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/providers");
const nodeCloud = require("../../lib/index");

describe("AWS EC2", () => {
  it("should AWS initialization", done => {
    const ncAWS = nodeCloud.getProvider("AWS");

    assert.typeOf(ncAWS, "object");
    done();
  });
});
