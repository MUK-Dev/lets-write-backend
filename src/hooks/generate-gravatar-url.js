// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const crypto = require("crypto");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const hash = crypto
      .createHash("md5")
      .update(context.data.email.toLowerCase())
      .digest("hex");

    const gravatarUrl = `https://s.gravatar.com/avatar/${hash}?s=400&d=identicon`;
    context.data.avatar_url = gravatarUrl;
    return context;
  };
};
