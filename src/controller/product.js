// const Product = require('../models/product');
// const shortid = require('shortid');
// const slugify = require('slugify');
// exports.addProduct = (req,res)=>{
//     //res.status(200).json({file: req.files, body: req.body});

//     const { name,price,description,category,quantity }= req.body;
//     const go = [];
//     let productPictures = [];
//     if(req.files.length > 0){
//         productPictures = req.files.map(file =>{
//             go.push({img: file.filename});
//             return {img: file.filename};
//         })
//     }
//     const product = new Product({
//         name: name,
//         slug: slugify(name),
//         price,
//         description,
//         quantity,
//         productPictures: go,
//         category,
//         createdBy: req.user._id
//     })
//     product.save((error,product)=>{
//         if(error) return res.status(400).json({error});

//         if(product) { res.status(201).json({product});}
//     })
// }
const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category')
exports.addProduct = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, price, description, category, quantity, createdBy
    } = req.body;
    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product });
        }
    }));
}; 

exports.getProductBySlug = (req,res)=>{
    const {slug} =req.params;
    Category.findOne({slug}).exec((error,category)=>{
        if(error){
            console.log(error);
            return res.status(400).json({
                error
            })
        }
        if(category){
            Product.find({category: category._id})
            .exec((error,products)=>{
                if(error){
                    console.log(error);
                    return res.status(400).json({
                        error
                    })
                }
                if(products.length >0){
                    return res.status(200).json({
                        products,
                        productByPrice:{
                            under5k: products.filter(product => product.price <=5000),
                            under10k: products.filter(product => product.price >5000 && product.price <=10000),
                            under15k: products.filter(product => product.price >10000 && product.price <=15000),
                            under20k: products.filter(product => product.price >15000 && product.price <=20000),
                            under25k: products.filter(product => product.price >20000 && product.price <=30000),
                        }
                    })
                }
            })
        }
        
    })
}

exports.getProductDetailsById = (req,res) =>{
    const {productId} = req.params;
    if(productId){
        Product.findOne({_id:productId}).exec((error,product)=>{
            if(error) return res.status(400).json({error});
            if(product) return res.status(200).json({product});
        })
    }
    else{
        return res.status(400).json({error: 'Params Required'})
    }
}