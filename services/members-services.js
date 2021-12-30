const membersRepository = require('../repositories/members-repository');
const paginate = require('../services/paginate');
const { MEMBER_EXISTS } = require('../constants/member-constants');
const throwError = require("../functions/throw-error");

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

    updateMember: async (id, body) => {
        const memberExists = await memberService.getMemberById(req.params.id);
        if (!memberExists) {
            return throwError(code.NOT_FOUND, MEMBER_EXISTS);
        }

        membersRepository.updateMember(id, body);
    },
    deleteMember: async (id) => {
        const memberExists = await memberService.getMemberById(req.params.id);
        if (!memberExists) {
            return throwError(code.NOT_FOUND, MEMBER_EXISTS);
        }
        membersRepository.deleteMember(id);
    }
};