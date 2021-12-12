const bcrypt = require('bcryptjs');

module.exports = {
  generatePassword: async (password) => {
    if (!password) return null;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
};
