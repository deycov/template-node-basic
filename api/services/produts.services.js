const faker = require("faker");
const boom = require("@hapi/boom");

class productsServices {
	constructor(){
		this.products = [];
		this.generate();
	}

	async generate () {
  	const limit = 100; // cuanddo size sea 0 optamos por limite de 10
    for (var i = 0; i < limit; i++) {
	    this.products.push({
		    id: faker.datatype.uuid(),
		    name: faker.commerce.productName(),
		    price: parseInt(faker.commerce.price(),10),
		    image: faker.image.imageUrl(),
		    isBlock: faker.datatype.boolean()
	    })
    }
  }

	async create(data){
	  try{
      const newProduct = {
				id: faker.datatype.uuid(),
				...data
			}
			this.products.push(newProduct);
    }catch(err){
      throw boom.notCreated('product not found');
    }
	}

	async find () {
	  try{
	  	return this.products;   
	  }catch(err){
	  	throw boom.notFound('product not found');
	  }  
	}

	async findOne (id) {
	  const product = this.products.find(item => item.id === id); 
	  if (!product) {
	  	throw boom.notFound('product not found');
	  }
	  if (product.isBlock){
	  	throw boom.conflict('product Blocked');
	  } 
	}

	async update (id, changes) {
	  const index = this.products.findIndex(item => item.id === id);
	  if (index === -1) {
	  	throw boom.notFound('product not found');
	  }

	  const product = this.products[index];
	  this.products[index] = { 
		...product,
		...changes
	  }	
	  return this.products[changes];
	}

	async delete (id) {
	  
	  const index = this.products.findIndex(item => item.id === id);
		if (index === -1) {
			throw boom.notFound('product not found');
		}
		this.products.splice(index, 1);
		return { id }; 
	}
}

module.exports = productsServices;