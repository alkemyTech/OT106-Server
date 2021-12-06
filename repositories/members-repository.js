const db = require('../models');

module.exports = {
    createMember: async (body) => {
        return db.Member.create(body);
    },

    getMembersAll: async () => {
        return db.Member.findAll();
    }
};