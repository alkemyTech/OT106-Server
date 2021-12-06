const membersRepository = require('../repositories/members-repository');

module.exports = {
    createMember: body => membersRepository.createMember(body),
    getMembersAll: () => membersRepository.getMembersAll()
};