const signup = async (req, res, next) => {
  let getdata;
  try {
    const allowUpdate = ["name", "email", "first-password", "second-password"];

    const istrue = allowUpdate.every((args) => {
      if (req.body[args] == undefined) {
        getdata = `${args} is not provided`;
      }
      return req.body.hasOwnProperty(args);
    });

    if (!istrue) {
      throw new error();
    }

    if (req.body["first-password"] !== req.body["second-password"]) {
      getdata = "First and Second Password aren't same";
      throw new error();
    }

    next();
  } catch (error) {
    res.status(404).send({ error: `${getdata}` });
  }
};

module.exports = signup;
