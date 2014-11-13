function login(un, pass, loginSuccess, loginFailed)
{
	//Ja pârâk îss lietotâjvârds
	if (un.lenght<4)
	{
		loginFailed();
		return false;
	}
	if (un.lenght>12)
	{
		loginFailed();
		return false;
	}
	if (pass.lenght<4)
	{
		loginFailed();
		return false;
	}
	if (pass.lenght>12)
	{
		loginFailed();
		return false;
	}
	
	var hash = SHA1(pass);
	var cloud = new Cloud();
	//alert(hash);
	cloud.isUserInCloud(un, hash, loginSuccess, loginFailed);
	
}