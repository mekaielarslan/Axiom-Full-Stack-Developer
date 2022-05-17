 const form =document.getElementById("form")
 const username =document.getElementById("username")
 const email =document.getElementById("email")
 const Password =document.getElementById("password")
 const Password2 =document.getElementById("password2")
//All Functions
//Funtion to show error
function showError(input,message) {
    const formControl = input.parentElemet; 
    formControl.className = 'form-control error';
}









 //This is an event listener for the form on submit
 form.addEventListener("submit",function(e) {
     e.preventDefault();
    
     if (username.value === ''){
         showError(username,'Username is required')
        
     }
 })
