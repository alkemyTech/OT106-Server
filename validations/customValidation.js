const isImage = (value, helpers)=>{
    if(value.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)){
        return value  
    }
    return helpers.message('no es una imagen valida ')
}

module.exports = {
    isImage
}


  