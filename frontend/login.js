/*
login.js:
	If username or password is missing:
		Show error message: "Username or password is required"
	Otherwise, if username is not found in persistent storage:
		Show error message: "Username does not exist. <a>Sign up</a> here!"
	Otherwise if password does not match username in persistent storage:
			Show error message, "Incorrect password."
	Otherwise:
		Log in.
*/

window.onload = function () {
    var loginForm = document.getElementById("loginForm");
	let formErrors = document.getElementById("formErrors");
	
	if(sessionStorage.getItem("FQSIGNUP_registerSuccess")){
		sessionStorage.removeItem("FQSIGNUP_registerSuccess");
		window.document.getElementById("signUpSuccess").innerHTML = "You've successfully registered! Please log in.";
	}

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();
		document.getElementById("signUpSuccess").innerHTML = "";
		
		let enteredUsername = document.getElementById("formFieldUsername").value;
		let enteredPassword = document.getElementById("formFieldPass").value;
		let usernameData = localStorage.getItem("FQLOGIN_"+enteredUsername);
		
		if(enteredUsername == "" || enteredPassword == ""){
			formErrors.innerHTML = "Username or password is required."
		}
		else if(usernameData == null){
			formErrors.innerHTML = "Username does not exist. <a href='signup.html'>Sign up</a> here!"
		}
		else if(enteredPassword != usernameData){
			formErrors.innerHTML = "Incorrect password.";
		}
		else{
			sessionStorage.setItem("FQSESSION_username",enteredUsername);
			window.location = "mainmenu.html";
		}
	});
};
