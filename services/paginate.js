
const pagination = (limit, max, req, entity) => {
    let page = Number(req.query.page);
    const lastPage = Math.ceil(max / limit);
    if (page > lastPage) {
        const error = new Error('Parameter "page" out of range');
        error.status = 400;
        throw error;
    }

    const offset = (page - 1) * limit;
    const previousPage = page - 1;
    const nextPage = page + 1;
    
    const baseUrl = `${req.protocol}://${req.get('host')}/${entity}`;
    const previousPageUrl = baseUrl + `?page=${previousPage}`;
    const nextPageUrl = baseUrl + `?page=${nextPage}`;

    const paginationData = {
        page, lastPage, offset, max, previousPageUrl, nextPageUrl
    };
    return paginationData;
};

module.exports = { pagination };