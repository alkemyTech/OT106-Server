const membersRepository = require('../repositories/members-repository');
const paginate = require('../services/paginate');

const limit = 10;

module.exports = {
    createMember: body => membersRepository.createMember(body),

    getMembersAll: async (req) => {
        const max = await membersRepository.getMembersCount();
        console.log(max);
        const paginationData = paginate.pagination(limit, max, req, 'members');

        const members = await membersRepository.getMembersAll(limit, paginationData.offset);

        let response = {
            max: paginationData.max,
            previousPage: paginationData.previousPageUrl,
            nextPage: paginationData.nextPageUrl,
            data: members
        };
        ///////////////////////DEFINE THE PAGES//////////////////////////////
        if (page == 1) response.previousPage = null;
        if (page == paginationData.lastPage) response.nextPage = null;
        /////////////////////////////////////////////////////////////////////
        return response;
    },

    getMemberById: id => membersRepository.getMemberById(id),
    updateMember: (id, body) => membersRepository.updateMember(id, body),
    deleteMember: id => membersRepository.deleteMember(id)
};