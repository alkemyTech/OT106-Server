const membersRepository = require('../repositories/members-repository');
const paginate = require('../services/paginate');
const { MEMBER_EXISTS } = require('../constants/member-constants');
const throwError = require('../functions/throw-error');

const limit = 10;

module.exports = {
  createMember: body => membersRepository.createMember(body),

  getMembersAll: async (req) => {
    const max = await membersRepository.getMembersCount();
    const paginationData = paginate.pagination(limit, max, req, 'members');

    const members = await membersRepository.getMembersAll(limit, paginationData.offset);

    const response = {
      max: paginationData.max,
      previousPage: paginationData.previousPageUrl,
      nextPage: paginationData.nextPageUrl,
      data: members
    };
        // /////////////////////DEFINE THE PAGES//////////////////////////////
    if (page == 1) response.previousPage = null;
    if (page == paginationData.lastPage) response.nextPage = null;
        // ///////////////////////////////////////////////////////////////////
    return response;
  },

  getMemberById: id => membersRepository.getMemberById(id),

  updateMember: async (id, body) => {
    const memberExists = await membersRepository.getMemberById(id);
    if (!memberExists) {
      return throwError(code.NOT_FOUND, MEMBER_EXISTS);
    }

    const result = await membersRepository.updateMember(id, body);
    return result;
  },
  deleteMember: async (id) => {
    const memberExists = await membersRepository.getMemberById(id);
    if (!memberExists) {
      return throwError(code.NOT_FOUND, MEMBER_EXISTS);
    }
    const result = await membersRepository.deleteMember(id);
    return result;
  }
};
