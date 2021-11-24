// esto se usa en middleware validate.js, para controlar si realemnte todas las keys cumplen la condicion
//establecida en validators, obetos de joi 
 const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };
  
  module.exports = pick;