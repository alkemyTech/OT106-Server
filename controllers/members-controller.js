const statusCode = require('../constants/httpStatus');
const message = require('../constants/message');
const { CREATED_MEMBER, ALL_THE_MEMBERS, UPDATED_MEMBER, DELETED_MEMBER } = require('../constants/member-constants');
const memberService = require('../services/members-services');

module.exports = {
    create: async (req, res, next) => {
        try {
            let body = { ...req.body }
            const member = await memberService.createMember(body);
            return res.status(statusCode.CREATED).json({
                msg: CREATED_MEMBER,
                body: member
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    },

    getMembersAll: async (req, res, next) => {
        try {
            const page = +req.query.page;
            const members = await memberService.getMembersAll(req, page);
            return res.status(statusCode.OK).json({
                msg: ALL_THE_MEMBERS,
                body: members,
                previousPage: members.previousPage,
                nextPage: members.nextPage
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    },

    updateMember: async (req, res, next) => {
        const memberExists = await memberService.getMemberById(req.params.id);
        if (!memberExists) {
            return res.status(statusCode.NOT_FOUND).json(message.NOT_FOUND);
        }
        try {
            let body = { ...req.body }
            const member = await memberService.updateMember(req.params.id, body);
            return res.status(statusCode.OK).json({
                msg: UPDATED_MEMBER,
                body: member
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    },

    deleteMember: async (req, res, next) => {
        const memberExists = await memberService.getMemberById(req.params.id);
        if (!memberExists) return res.status(statusCode.NOT_FOUND).json(message.NOT_FOUND);
        try {
            const memberEliminated = await memberService.deleteMember(req.params.id);
            return res.status(statusCode.OK).json({
                msg: DELETED_MEMBER,
                body: memberEliminated
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
        }
    }

};