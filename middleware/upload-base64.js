const { IMG_INVALID } = require('../constants/slide-constant');

function decodeImgBase64(req, res, next) {
  // get format / body
  const index = req.body.image.toString().indexOf(';base64,');
  const format = req.body.image.toString().substr(0, index);
  const body = req.body.image.toString().substr(index + 8);

  // verify body use base64
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  const verify = base64regex.test(body);

  if (verify) {
    // decode image (base64) and buffering
    req.buf = Buffer.from(body, 'base64');
    req.format = format.substr(format.indexOf('/') + 1);
    next();
  } else {
    const error = new Error();
    error.message = IMG_INVALID;
    throw error;
  }
}

module.exports = {
  decodeImgBase64
};
