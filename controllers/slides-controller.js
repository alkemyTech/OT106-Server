const { SlideService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { OK: OK_CODE, CREATED: CREATED_CODE } = require('../constants/httpStatus');
const { OK: OK_MESSAGE } = require('../constants/message');
const { orderSlides } = require('../functions/order-slides');
const db = require('../models');

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

    // if order already exists => update slides with transaction
    const result = await db.sequelize.transaction(async (t) => {
      // verify the correct order for new Slide
      const newOrder = await orderSlides(body, t);
      const buffer = req.decoded;
      const bodyVerified = { ...body, order: newOrder, format: req.format };

      const newSlide = await SlideService.createslide(bodyVerified, t, buffer);
      return newSlide;
    });

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
