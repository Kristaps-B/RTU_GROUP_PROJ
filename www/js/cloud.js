var errorLoading =""

function Cloud(){
	this.A_KEY = "502be55974e895468d622c50d90904f29a35fdc629a65fa4a5dbac277f3f95f2";
	this.S_KEY = "12067aed18194826ce0938ff5b970eb2d59a168cec6cb1b1296a266ab827106b";
}

Cloud.prototype.cloudAlert = function ()
{
	alert("Alert From Cloud!");
}

//Find all By Key
Cloud.prototype.findAllByKey = function (collName, k, v, success, failed)
{
		
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	
	var key = k;
	var value = v;
	
	storageService.findDocumentByKeyValue(dbName,collectionName,key,value,
		{
			success:function(object)
			{
				//alert("SUCCESS!");
				var storageObj = JSON.parse(object);    
				var response = storageObj.app42.response.storage.jsonDoc; 
				
				success(response);
			},
			error:function(error)
			{
				var storageObj = JSON.parse(error);  
				var appErrorCode = storageObj.app42Fault.appErrorCode;  
				
				failed(appErrorCode);
			}
		}
	);
}

//Is user in cloud
Cloud.prototype.isUserInCloud = function (uname, password, loginSuccess, loginFailed)
{
	//alert("Login!");
	//alert(this.A_KEY);
	App42.initialize(this.A_KEY, this.S_KEY);  
	//App42.initialize("502be55974e895468d622c50d90904f29a35fdc629a65fa4a5dbac277f3f95f2", "12067aed18194826ce0938ff5b970eb2d59a168cec6cb1b1296a266ab827106b");  
	var storage  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = "users";
	
	var queryBuilder = new QueryBuilder();  
	var q1= queryBuilder.build("uname", uname, Operator.EQUALS);     
	var q2 = queryBuilder.build("pass", password, Operator.EQUALS);    
	var q3 = queryBuilder.compoundOperator(q1,Operator.AND, q2); 
	
	//alert("2");
	
	storage.findDocumentsByQuery(dbName, collectionName, q3,{  
		success: function(object)   
		{    
			//This will return JSONObject list, there might be single or multiple objects if more than one object found  
			var storageObj = JSON.parse(object);    
			result = storageObj.app42.response.storage.jsonDoc;  
			var id = result[0]._id.$oid;
			
			//alert(result.length);
			if (result.length == 1)
			{
				loginSuccess(uname, result[0].su, id);
				
			}
		},    
		error: function(error) { 
			var storageObj = JSON.parse(error);  
			var appErrorCode = storageObj.app42Fault.appErrorCode;  
			
			if (appErrorCode == 2608)
			{
				//alert("Nepareizs lietotajvards vai parole!");
				loginFailed();
			}
			else
			{
				alert("Makoòa kïûda: " +error);
				loginFailed();
			}
		}    
	}); 
	
}

//Insert new JSON
Cloud.prototype.insertNew = function(collName, js, insertSuccess, insertFailed)
{
	//alert("IN INSERT!");
	
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var jSon = js;
	
	storageService.insertJSONDocument(dbName, collectionName, jSon, 
		{
			success:function(object)
			{
				var storageObj = JSON.parse(object);    
				response = storageObj.app42.response.storage.jsonDoc;
				
				insertSuccess(response);
				
			},
			error:function(error)
			{
				
				insertFailed(error);
			}
		}
	);			
}

Cloud.prototype.isIn = function(collName, q, isInSuccess, isInFailed)
{
	
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var query = q;
	
	
	
	storageService.findDocumentsByQuery(dbName, collectionName, query, 
		{
			success:function(object)
			{
				var storageObj = JSON.parse(object);    
				response = storageObj.app42.response.storage.jsonDoc;
				
				for (i=0; i<response.length;i++)
				{
					alert(response[i].street_name);
				}
			
				alert("Failed SUCC");
				isInFailed();
			},
			error:function(error)
			{
				var storageObj = JSON.parse(error);  
				var appErrorCode = storageObj.app42Fault.appErrorCode;  
				
				if (appErrorCode == 2608)
				{
					isInSuccess();
				}
				else
				{
					alert("Failed FAIL");
					isInFailed();
				}
				
			}
		}
	);			
	

}

Cloud.prototype.queryFromTwo = function(key1, val1, key2, val2, key3, val3)
{
	var queryBuilder = new QueryBuilder();	
	
	var q1= queryBuilder.build(key1, val1, Operator.EQUALS); 
	var q2= queryBuilder.build(key2, val2, Operator.EQUALS);  
	
	var q4 = queryBuilder.compoundOperator(q1,Operator.AND, q2);	

	return q4;
	
}

Cloud.prototype.findByID = function(collName, id, success, failed)
{
	//alert("In found by ID!");
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var docID = id;
	
	alert("Start");
	
	storageService.findDocumentById(dbName, collectionName, docID, 
		{
			success:function(object)
			{
				var storageObj = JSON.parse(object);    
				response = storageObj.app42.response.storage.jsonDoc;
				alert("SUCC");
				success(response);
			},
			error:function(error)
			{
				failed(error);
				
			}
		}
	);			
	

}

Cloud.prototype.findAll = function(collName, success, failed)
{
	//alert("In found by ALL!");
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	
	storageService.findAllDocuments(dbName, collectionName, 
		{
			success:function(object)
			{
				var storageObj = JSON.parse(object);    
				response = storageObj.app42.response.storage.jsonDoc;
				success(response);
			},
			error:function(error)
			{
				failed(error);
				
			}
		}
	);			
	

}

Cloud.prototype.deleteByID = function(collName,id , success, failed)
{
	//alert("In found by ALL!");
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var ID = id
	
	storageService.deleteDocumentById(dbName, collectionName,ID,{    
		success: function(object)   
		{   
			success();

		},    
		error: function(error) {  
			failed();
		}    
	}); 			
	

}


Cloud.prototype.updateByKey = function(collName, k, v, jsD, success, failed)
{
	//alert("In found by ALL!");
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var key = k;
	var value = v;
	var jsonDoc = jsD;
	
	storageService.updateDocumentByKeyValue(dbName, collectionName, key, value, jsonDoc,{    
		success: function(object)   
		{   
			success();

		},    
		error: function(error) {  
			failed(error);
		}    
	}); 			
	

}

Cloud.prototype.deleteByKey = function(collName, k, v, success, failed)
{
	//alert("In found by ALL!");
	App42.initialize(this.A_KEY, this.S_KEY);  

	var storageService  = new App42Storage(); 
	
	var dbName = "demo";
	var collectionName = collName;
	var key = k;
	var value = v;
	
	storageService.deleteDocumentsByKeyValue(dbName, collectionName, key, value,{    
		success: function(object)   
		{   
			success();

		},    
		error: function(error) {  
		
			alert(error);
			failed();
		}    
	}); 			
	

}

