const chai = require("chai");
const assert = chai.assert;
const helpers = require("../../lib/core/helpers");
const providers = require("../../lib/providers");

describe("Check params Helpers", () => {
  it("should throw an error", () => {
    assert.throws(helpers.checkParams, Error, "Provide options");
  });

  it("should not throw an error", () => {
    assert.equal(helpers.checkParams({
      docsLink: '/link/to/docs'
    }), true);
  });
});
