const Product = require('../../models/product');
const Category = require('../../models/category');

function createCategoriesList(categories,parentId = null) {
    
    const categoryList = [];
    let category;
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat=> cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            parentId: cate.parentId,
            slug: cate.slug,
            type: cate.type,
            children: createCategoriesList(categories,cate._id)
        })
    }

    return categoryList;
}

exports.initData = async (req,res)=>{
    try {
        const products = await Product.find({}).select('_id name price quantity description productPictures category')
        .populate({path: 'category',select: '_id name'}).exec();
        const categories = await Category.find({}).exec();
        res.status(200).json({
            products,
            categories: createCategoriesList(categories)
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

}