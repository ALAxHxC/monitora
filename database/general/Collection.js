class Collection 
{
	
	constructor(entity)
	{
		this.collection=entity;
	
	}

	get entity() 
	{
		return this.collection;
	}

	async create(new_document)
	{
		try
		{   
					let document_new= await this.collection.create(new_document);
			return document_new;
		}
		catch(err)
		{	
			console.log(err.message,err.stack);
			throw(err);
		}
	}

	async getDocumentById(id){
		try
		{
			let search_document= await this.collection.findById(id);
			return search_document;
		}
		catch(err)
		{
			console.log(err.message,err.stack);
			throw(err);
		}
	}
	async deleteDocumentById(id){
		try{
			let result = await this.collection.remove({_id: id});
			return result;
		}catch(err){
			throw(err);
		}
	}

	async getAll(){
		try
		{
			let search_document= await this.collection.find({});
			return search_document;
		}
		catch(err)
		{
			console.log(err.message,err.stack);
			throw(err);
		}
	}
	async updateDocument(document){
	try
		{
			let update_document= await document.save();
			return update_document;
		}
		catch(err)
		{
			console.log(err.message,err.stack);
			throw(err);
		}	
	}
}
module.exports = Collection;