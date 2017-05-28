function checkParams(params, docsLink) {
  if (!params) {
    if (docsLink) {
      throw new Error(`Provide options ${docsLink}`);
    }

    throw new Error("Provide options");
  }
}

module.exports = {
  checkParams: checkParams
};
