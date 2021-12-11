const db = require('../models');

module.exports = {
    createMember: async (body) => {
        return db.Member.create(body);
    },

    getMembersAll: async (limit, offset) => {
        return db.Member.findAll({ limit: limit, offset: offset });
    },

    getMemberById: async (id) => {
        return db.Member.findByPk(id);
    },

    getMembersCount: async () => {
        return db.Member.count();
    },

    updateMember: async (id, body) => {
        return db.Member.update(body, {
            where: { id }
        });
    },

    deleteMember: async (id) => {
        return db.Member.destroy({
            where: { id }
        });
    }

};