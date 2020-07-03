const check = async (req, res, next) => {
  try {
    if (req.body.confirm === process.env.Scode) {
        next();
    }else{
        throw new error();
    }
  } catch (error) {
    res.status(400).send({ error: "Invalid Request" });
  }
};

module.exports = check;
