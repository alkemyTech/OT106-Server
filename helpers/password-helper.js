const bcrypt = require('bcryptjs');

module.exports = {
  removePassword: (x) => {
    return { ...x, password: undefined };
  },

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  comparePassword: (a, b) => bcrypt.compare(a, b),
};
