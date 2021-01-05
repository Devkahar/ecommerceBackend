const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid')
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

exports.addCategory = (req,res)=>{

    
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }
    if(req.file){
        categoryUrl = process.env.API+'/public/'+req.file.filename;
        categoryObj.categoryImage = categoryUrl;
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    

    const cat = new Category(categoryObj);
    cat.save((error,category)=>{
        if(error) return res.status(400).json({error});

        if(category){
            return res.status(201).json({ category });
        }
    })
};

exports.getCategory = (req,res)=>{
    Category.find({})
    .exec((error,categories)=> {
        if(error) return res.status(400).json({error});
        if(categories){
            const categoryList = createCategoriesList(categories);
            res.status(200).json({categoryList});
        }
    })
}

exports.updateCategories = async (req,res)=>{
    try {
        const {_id,name,parentId,type} = req.body;
        console.log(_id,name,parentId,type);
        const updatedCategories = [];
        if(name instanceof Array){
            for(let i=0; i<name.length;i++){
                const category ={
                    name: name[i],
                    type:type[i]
                }
                if(parentId[i] !== ""){
                    category.parentId = parentId[i];
                }
                const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]},category,{new: true})
                updatedCategories.push(updatedCategory)
            }
            return res.status(201).json({
                updatedCategories
            })
        }else{
            const category = {
                name,
                type
            }
            if(parentId !== ""){
                category.parentId = parentId;
            }
            const updatedCategory = await Category.findByIdAndUpdate({_id},category,{new: true})
            updatedCategories.push(updatedCategory)
            return res.status(201).json({
                updatedCategories
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error
        })
    }

}

exports.deleteCategories = async (req,res)=>{
    try {
        const {ids} = req.body.payload;
        const deletedCategory = [];
        for(let i=0;i<ids.length;i++){
            const deleteCategory = await Category.findOneAndDelete({_id:ids[i]._id})
            deletedCategory.push(deleteCategory);
        }
        if(deletedCategory.length == ids.length){
            res.status(201).json({
                message:'Categories Removed',
                deletedCategory
            })
        }else{
            res.status(400).json({
                message: "Something Went Wrong"
            });
        }
    } catch (error) {
        res.status(400).json({error});
    }
}