const statusCode = require('../constants/httpStatus');
const message = require('../constants/message');
const memberService = require('../services/members-services');

module.exports = {
    create: async (req, res, next) => {
        try {
            let body = { ...req.body }
            const member = await memberService.createMember(body);
            return res.status(statusCode.CREATED).send(member);
        } catch (error) {
            return res.statusCode(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    },

    getMembersAll: async (req, res, next) => {
        try {
            const members = await memberService.getMembersAll();
            return res.status(statusCode.OK).send(members);
        } catch (error) {
            return res.statusCode(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    }
};