const { authenticate } = require("@feathersjs/authentication").hooks;

const { searchRegex } = require("../../hooks/search-regex");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [searchRegex()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
