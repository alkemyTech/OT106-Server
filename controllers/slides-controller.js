const bcrypt = require('bcryptjs');
const { SlideService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { OK: OK_CODE, CREATED: CREATED_CODE } = require('../constants/httpStatus');
const { OK: OK_MESSAGE } = require('../constants/message');

module.exports = {
  findAllSlides: catchAsync(async (req, res, next) => {
    const result = await SlideService.findAllSlides();
    return res.status(OK_CODE).send(result);
  }),

  findSlideByPk: catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await SlideService.findSlideById(id);
    return res.status(OK_CODE).send(result);
  }),

  createSlide: catchAsync(async (req, res, next) => {
    const body = req.body;
    const result = await SlideService.createslide(body);

    return res.status(CREATED_CODE).send(result);
  }),

  updateSlide: catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const result = await SlideService.updateSlide(body, id);

    return res.status(OK_CODE).send(result);
  }),

  destroySlide: catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await SlideService.destroySlide(id);
    return res.status(OK_CODE).send(OK_MESSAGE);
  }),
};
