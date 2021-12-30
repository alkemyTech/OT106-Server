const statusCode = require('../constants/httpStatus');
const message = require('../constants/message');
const { CREATED_MEMBER, ALL_THE_MEMBERS, UPDATED_MEMBER, DELETED_MEMBER } = require('../constants/member-constants');
const memberService = require('../services/members-services');
const catchAsync = require('../functions/catchAsync');

module.exports = {
    create: catchAsync(async (req, res, next) => {
        let body = { ...req.body }
        const member = await memberService.createMember(body);
        return res.status(statusCode.CREATED).json({
            msg: CREATED_MEMBER,
            body: member
        });
    }),

    getMembersAll: catchAsync(async (req, res, next) => {
        const page = +req.query.page;
        const members = await memberService.getMembersAll(req, page);
        return res.status(statusCode.OK).json({
            msg: ALL_THE_MEMBERS,
            body: members,
            previousPage: members.previousPage,
            nextPage: members.nextPage
        });
    }),

    updateMember: catchAsync(async (req, res, next) => {
        let body = { ...req.body }
        const member = await memberService.updateMember(req.params.id, body);
        return res.status(statusCode.OK).json({
            msg: UPDATED_MEMBER,
            body: member
        });
    }),

    deleteMember: catchAsync(async (req, res, next) => {
        const memberEliminated = await memberService.deleteMember(req.params.id);
        return res.status(statusCode.OK).json({
            msg: DELETED_MEMBER,
            body: memberEliminated
        });
    })

};