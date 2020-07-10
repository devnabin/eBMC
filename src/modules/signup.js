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

    if (req.body.name) {
      const name = req.body.name.split(" ");
      if (name.length < 2) {
        getdata = "Please Enter Your First Name and Last name";
        throw new error();
      } else if (name[1] == "") {
        getdata = "Please Enter Your Correct name";
        throw new error();
      }
    }

    if (req.body.email) {
      if (req.body.email.includes("@") && req.body.email.includes(".")) {
        let nickname = req.body.email.split("@");
        req.nickname = nickname[0];
      } else {
        getdata = `email is not valid`;
        throw new error();
      }
    }
    if (req.body["first-password"] !== req.body["second-password"]) {
      getdata = "First password and Second Password aren't same";
      throw new error();
    }

    next();
  } catch (error) {
    res.status(404).send({ error: `${getdata}` });
  }
};

module.exports = signup;
