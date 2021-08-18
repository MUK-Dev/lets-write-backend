// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
exports.searchRegex = () => {
  return (hook) => {
    const query = hook.params.query;
    for (let field in query) {
      if (query[field].$search) {
        if (query[field].$search && field.indexOf("$") == -1) {
          query[field] = { $regex: new RegExp(query[field].$search) };
        }
      }
    }
    hook.params.query = query;
    return hook;
  };
};
