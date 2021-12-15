const categoriesRepository = require('../repositories/category-repository');
const paginate = require('../services/paginate');
const limit = 10;
module.exports = {
  list: async (req) =>{
    const count = await categoriesRepository.count()
    console.log(count);
    const resultPagination = paginate.pagination(limit,count,req,'categories')


    const categories = await categoriesRepository.list(limit,resultPagination.offset)
    let response = {
      max: resultPagination.max,
      previousPage: resultPagination.previousPageUrl,
      nextPage: resultPagination.nextPageUrl,
      data:categories
    }

    if (page == 1) response.previousPage = null;
    if (page == resultPagination.lastPage) response.nextPage = null;
    /////////////////////////////////////////////////////////////////////
    return response;


  },
  detail: id => categoriesRepository.detail(id),
  create: body => categoriesRepository.createCategory(body),
  update: (id, body) => categoriesRepository.updateCategory(id, body),
  remove: id => categoriesRepository.deleteCategory(id)
};