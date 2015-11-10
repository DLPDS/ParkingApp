var certificatePath="repository/tenants/4378/jaggeryapps/wso2parkingapp-default-SNAPSHOT/resources/star.private.wso2.com.crt";

function getPublicKey(){

	var inputStream = null;

	try{
		//print(certificatePath+certificatePathe);
		//log.debug("Reading certificate from ");//+ certificatePath);
		inputStream = new Packages.java.io.FileInputStream(certificatePath);
		print(inputStream+" stream");
		print("<br>success");

// 		var file = new File('test.txt');
// 		file.open("r");
// 		var message = "";

// 		message = file.readAll();
// 		print(message);
// 		file.close();

	}catch(e){
		//log.error("Error while getting the public key. " + e);
		print(e);
		//throw e;
	}finally{
    	
        if(inputStream){
          inputStream.close();
        }
	}
}


