const loginForm = document.getElementById('login--form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMessage = document.getElementById('form__error');

const users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users);
console.log(users[0]);
console.log(users[0].name);

const saveToSessionStorage = (user) =>{
  sessionStorage.setItem('activeUser', JSON.stringify(user));
}

/* ---------- Funciones Auxiliares ---------*/
// Funcion para validar si el campo esta vacio
const isEmpty = (input) => { 
  return !input.value.trim().length;
}

// Funcion para validar que el email esta registrado
const isExistingEmail = (input) => {
  return users.some(user => user.email === input.value.trim())
}

// Funcion para validar que el pass matche con el email
const isMatchingPass = (input) => {
  const user = users.find(user => user.email === emailInput.value.trim());

  return user.pass === input.value.trim();
}

// Funcion para mostrar el error al validar
const showError = (message) => {
  errorMessage.textContent = message
}
/* ---------- FIN Funciones Auxiliares ---------*/

/* ---------- Funciones Para Validar ---------*/
/*
  -1. Chequear si el campo del email esta vacio
  -2. Chequear si el email que ingresamos existe en el array del LocalStorage
  -3. Chequear si el campo del password esta vacio
  -4. Chequear que el password matchee con el email 
  Si pasa todo esto, se loguea
*/
const isValidAccount = () => {
  let valid = false 

  if (isEmpty(emailInput)) {
    showError('Por favor, completa todos los campos');
    return;
  }

  if (!isExistingEmail(emailInput)) {
    showError('Los datos ingresados no son validos');
    loginForm.reset()
    return;
  }

  if (isEmpty(passInput)) {
    showError('Por favor, completa todos los campos');
    return;
  }

  if (!isMatchingPass(passInput)) {
    showError('Los datos ingresados no son validos');
    loginForm.reset()
    return;
  }

  valid = true
  return valid
}


const login = (event) => {
  event.preventDefault();
  
  if (isValidAccount()) {
    const user = users.find(user => user.email === emailInput.value.trim());
    console.log(user);
    saveToSessionStorage(user);
    window.location.href = 'home.html'
  }
};

const init = () => {
  loginForm.addEventListener('submit', login);
}

init()

