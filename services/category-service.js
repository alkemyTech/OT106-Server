const categoriesRepository = require('../repositories/category-repository');
const paginate = require('../services/paginate');
const limit = 10;
const { uploadFileToAmazonS3Bucket: uploadFile } = require('./amazon-s3-service')
const throwError = require("../functions/throw-error");
const code = require("../constants/httpStatus");
const message = require("../constants/message");

module.exports = {
  list: async (req) => {
    const count = await categoriesRepository.count()
    console.log(count);
    const resultPagination = paginate.pagination(limit, count, req, 'categories')


    const categories = await categoriesRepository.list(limit, resultPagination.offset)
    let response = {
      max: resultPagination.max,
      previousPage: resultPagination.previousPageUrl,
      nextPage: resultPagination.nextPageUrl,
      data: categories
    }

    if (page == 1) response.previousPage = null;
    if (page == resultPagination.lastPage) response.nextPage = null;
    /////////////////////////////////////////////////////////////////////
    if (!categories[0]) {
      return throwError(code.NOT_FOUND, message.NOT_FOUND);
    }
    return response;


  },

  detail: async (id) => {
    let category = await categoriesRepository.detail(id);

    if (!category) {
      return throwError(code.NOT_FOUND, message.NOT_FOUND);
    }
    return category
  },

  create: (async (body) => {
    if (body.image) {
      let fileName = body.image.originalname.split('.')[0];
      let buffer = body.image.buffer;
      body.image = await uploadFile(fileName, buffer);
    }
    return categoriesRepository.createCategory(body)
  }),
  
  update: async (id, body) => {
    if (body.image) {
  
      let buffer = body.image.buffer;
      let fileName = body.image.originalname.split('.')[0];
      body.image = await uploadFile(fileName, buffer);
    }
    let category = await categoriesRepository.detail(id);

    if (!category) {
      return throwError(code.NOT_FOUND, message.NOT_FOUND);
    }
    let update = categoriesRepository.updateCategory(id, body);

    return update
  },

  remove: async (id) => {
    let category = await categoriesRepository.detail(id);

    if (!category) {
      return throwError(code.NOT_FOUND, message.NOT_FOUND);
    }
    let remove = await categoriesRepository.deleteCategory(id)
    return remove;
  }
};