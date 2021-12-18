const { SlideService } = require('../services');

async function orderSlides(body, transactionT) {
  const { order, organizationId } = body;
  let newOrder;

  // if order not exists => maxim value
  if (order === undefined) { newOrder = 999999; } else { newOrder = order; }

  // if order is negative => 1
  if (order <= 0) newOrder = 1;

  // search slides where organizationId already exists
  const result = await SlideService.findByOrgId(organizationId);

  // if result is null => new order = 1
  if (result.length === 0) {
    newOrder = 1;
  } else {
  // if result is not null
  // => find max value
    const max = Math.max(...result.map((slide) => { return slide.dataValues.order; }));

    // if neworder value is major than last order finded
    if (newOrder >= max + 1) {
      newOrder = max + 1;
    } else {
      // if already exists => move array and update Slide's Order
      // filter slides
      const slidesMayorOrder = result.filter(Slide => (Slide.dataValues.order >= newOrder));
      const slidesUpdated = [];

      // change order (+1 for any greater than newOrder)
      for (const Slide of slidesMayorOrder) {
        Slide.dataValues.order += 1;
        slidesUpdated.push(Slide.dataValues);
      }
      // bulkUpdate over transaction
      await SlideService.bulkUpdate(slidesUpdated, transactionT);
    }
  }


  return newOrder;
}

module.exports = { orderSlides };
