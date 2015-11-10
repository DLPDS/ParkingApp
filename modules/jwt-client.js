var JWTClient;

(function() {

  var log = new Log();

  JWTClient = function(request, jwtHeaderName, certificatePath){
    this.request = request;
    this.jwtHeaderName = jwtHeaderName;
    this.certificatePath = certificatePath;
    this.jwt = null;
    this.signedJWT = null;
  }

  JWTClient.prototype = {

    init : function() {
      this.jwt = request.getHeader(this.jwtHeaderName);
    },

    isJWTPresent : function(){
      return this.jwt ? true : false;
    },

    parse : function(){
      this.signedJWT = Packages.com.nimbusds.jwt.SignedJWT.parse(this.jwt);
    },

    verify : function(){
    	log.info("before get public key");
      var publicKey = getPublicKey(this.certificatePath);
      log.info("before call RSASSAVerifier "+publicKey);

      var verifier = new Packages.com.nimbusds.jose.crypto.RSASSAVerifier(publicKey);
      log.info("before call verify method "+verifier);
      return this.signedJWT.verify(verifier);
    },

    getSubject : function(){
      return this.signedJWT.getJWTClaimsSet().getSubject();
    },

    getIssuer : function(){
      return this.signedJWT.getJWTClaimsSet().getIssuer();
    },

    getClaim : function(name){
      return this.signedJWT.getJWTClaimsSet().getClaim(name);
    },

    getClaims : function(){
      return this.signedJWT.getJWTClaimsSet().getAllClaims();
    }

  }

  function getPublicKey(certificatePath){

    var inputStream = null;

    try{
    	
      log.debug("Reading certificate from ");//+ certificatePath);     
      
      inputStream = new Packages.java.io.FileInputStream(certificatePath);

      var key = Packages.java.security.cert.CertificateFactory.getInstance("X.509").generateCertificate(inputStream).getPublicKey();
      
      return key;
    }catch(e){
      log.error("Error while getting the public key. " + e);
      throw e;
    }finally{
    	
      if(inputStream){
        inputStream.close();
      }
    }

    return null;

  }

})();