document.addEventListener('DOMContentLoaded', function () {
  const hideSomething = sessionStorage.getItem('hideSomething');
  if (hideSomething === 'true') {
    const loginDiv = document.querySelector('.login-container');
    loginDiv.style.display = "none";
    const joinDiv = document.getElementById('registrationForm');
    joinDiv.style.display = "block";
    const button=document.getElementById('registerButton');
    button.innerText='עדכן';
    button.onclick= update;
    const text= document.querySelector('.login-title2');
    text.innerHTML=":עדכן את הפרטים";
    let user = {
      id: localStorage.getItem("id"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password")
    };
    fill_inputs(user);
  }
});

function fill_inputs(user){
  $("#firstName").val(user.firstName);
  $("#lastName").val(user.lastName);
  $("#registerEmail").val(user.email);
  $("#registerPassword").val(user.password);
}

async function update(){
  let responseText= sessionStorage.getItem("user");
  let user = JSON.parse(responseText);
  clearErrors();
  var formData = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#registerEmail").val(),
    password: $("#registerPassword").val(),
  };
  var settings = {
      url: `http://localhost:3003/user/${user.id}`,
      method: "PUT",
      timeout: 0,
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify(formData)
  };

  $.ajax(settings)
      .done(function (response) {
          localStorage.setItem("user",response);
          sessionStorage.setItem('hideSomething', false);
          alert(JSON.parse(response).firstName +' ' + " !הפרטים עודכנו בהצלחה");   
          window.location.href = "category.html";    
      })
      .fail(function (jqXHR, status, error) {
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
          if(jqXHR.responseJSON.error.includes("already exists")){
             alert("כבר קיים משתמש עם כתובת אימייל זו 😐");
             clear();
          }
          else{
          if (jqXHR.responseJSON.error.includes("email")) {
            displayError('registerEmail', '.האימייל שהוקש לא תקין ');
          }
          if (jqXHR.responseJSON.error.includes("password")) {
            displayError('registerPassword', '.יש להקיש סיסמא עם 8 תווים לפחות ');
          }
          }
        } else {
          console.error("Error:", error);
        }
      });
}


async function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    var settings = {
       "crossDomain": true,
        "url": `http://localhost:3003/login/${email}/${password}`,
        "method": "GET",
        "Content-Type": "application/json"
      }
      return new Promise((resolve, reject) =>
      {
      $.ajax(settings).done(function (response) {
        console.log(response.name);
        resolve(response); 
      }).fail (function(error){
        reject(error);
      });
        
      }).then(function(response){
        localStorage.setItem("token",response.token);
        localStorage.setItem("id",response.user._id);
        localStorage.setItem("email",response.user.email);
        localStorage.setItem("firstName",response.user.firstName);
        localStorage.setItem("lastName",response.user.lastName);
        localStorage.setItem("password",response.user.password);
        window.location.href = "category.html";
      }).catch(function(error) {
    console.log(error);
  });

}


function join(){

  var loginDiv = document.querySelector('.login-container');
  loginDiv.style.display = "none";
  var joinDiv = document.getElementById('registrationForm');
  joinDiv.style.display = "block";
}   

function clearErrors() {
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => message.textContent = '');
}

function displayError(inputFieldId, errorMessage) {
  const inputField = document.getElementById(inputFieldId);
  inputField.classList.add('error');
  inputField.style.borderColor ="Red";
  const errorContainer = document.getElementById(`${inputFieldId}Error`);
  errorContainer.textContent = errorMessage;
}

async function register(){
  clearErrors();
  var formData = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#registerEmail").val(),
    password: $("#registerPassword").val(),
  };
  var settings = {
      url: "http://localhost:3003/signin",
      method: "POST",
      timeout: 0,
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify(formData)
  };

  $.ajax(settings)
      .done(function (response) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user",response.user);
          window.location.href = "category.html";
          alert("נרשמת בהצלחה");       
      })
      .fail(function (jqXHR, status, error) {
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
          if(jqXHR.responseJSON.error.includes("already exists")){
             alert("כבר קיים משתמש עם כתובת אימייל זו 😐");
             clear();
          }
          else{
          if (jqXHR.responseJSON.error.includes("email")) {
            displayError('registerEmail', '.האימייל שהוקש לא תקין ');
          }
          if (jqXHR.responseJSON.error.includes("password")) {
            displayError('registerPassword', '.יש להקיש סיסמא עם 8 תווים לפחות ');
          }
          }
        } else {
          console.error("Error:", error);
        }
      });
      
}

function clear(){
  var elements = document.querySelectorAll(".i");

  for (var i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }
}





