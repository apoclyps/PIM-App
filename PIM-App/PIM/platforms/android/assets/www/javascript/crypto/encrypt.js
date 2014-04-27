function encryptPassword(){
	// Get details to generate Salt
	var username = "kyle90adam@hotmail.com";
	var secret_key = "Ivnwnhu$2015";
	var salt = username +  secret_key;
	var password = "orangesoda$1984";

	//Encryt password over 100 generations
   var key512Bits100Iterations = CryptoJS.PBKDF2(password, salt, { keySize: 512/32 });
   console.log("100 Iteration Key " + key512Bits100Iterations.toString());
};