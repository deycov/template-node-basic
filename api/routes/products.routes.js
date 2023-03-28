const express = require("express");
const ProductsService = require('./../services/produts.services');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');


const router = express.Router();
const service = new ProductsService();



router.get('/', async (req, res) => {
    const products = await service.find();

    res.status(200).json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req, res) => {
  	
  	try{
  		const { id } = req.params;
			const product = await service.findOne(id);
		  console.log(product)

			res.status(200).json(product);
		}
  	catch(err){
  		next(err);
  	}

})

router.post('/', 
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
	const body = req.body;
	const newProduct = await service.create(body);

	res.status(201).json(body);
	console.log("success");
})

router.patch('/:id', 
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res)=>{
	const { id } = req.params;
	const body = req.body;
	const edit = await service.update(id,body);
	

	res.status(200).json(edit);
	console.log("success");
})

router.delete('/:id', async (req,res)=>{
	const { id } = req.params;
	

	const trash = await service.delete(id);
	res.status(200).json(trash)
	console.log("success");
})

module.exports = router;
