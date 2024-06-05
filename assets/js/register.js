const registerForm = document.querySelector('#register-form');

const nameInput = document.getElementById('name')
const lastNameInput = document.getElementById('lastName')
const emailInput = document.getElementById('email')
const passInput = document.getElementById('password')
const phoneInput = document.getElementById('phone')


const users = JSON.parse(localStorage.getItem('users')) || [];

const saveToLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users));
}

/* ---------- Funciones Auxiliares ---------*/
// Funcion para checkear si el campo esta vacio
// Retorna un Booleano. true si esta vacio, false si tiene algo
const isEmpty = (input) => { 
  return !input.value.trim().length // con ! nos devuelve true si no tiene largo, o false si tiene largo
}

// Funcion para validar el min y largo del campo
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max
}


//Regex para validar el Email
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ //expresion regular para validar direcciones de email de la forma usuario@dominio.ext. 
  //testeamos que el input cumpla con el formato de correo 
  return re.test(input.value.trim())
}

//Funcion para revisar si el email lo tenemos guardado
const isExistingEmail = (input) => {
  return users.some(user => user.email === input.value.trim())
}

// Funcion para verificar la contraseña con regex
const isPassSecure = (input) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/; // regex para contraseña: al menos 8 carateres, una mayus, una minus, y un simbolo
  //testeamos y devuelve booleano
  return re.test(input.value.trim());
};

// Funcion para verificar el telefono con regex
const isPhoneValid = (input) => {
  const re = /^[0-9]{10}$/; // regex: 11 numeros
  return re.test(input.value.trim());
};

// Funcion para mostrar el error al validar
const showError = (input, message) => {
  const formField = input.parentElement //agarramos el padre(contenedor) del campo

  // aplicamos la clase error al padre
  formField.classList.remove('success')
  formField.classList.add('error')

  const error = formField.querySelector('small') // agarramos la etiqueta small donde pondremos el msj de error
  error.style.display = 'block' // hacemos que se renderize
  error.textContent = message // le damos el texto
}

//Funcion para cuando todo esta bien
const showSucces = (input) => {
  const formField = input.parentElement //agarramos el padre(contenedor) del campo

  // aplicamos la clase error al padre
  formField.classList.remove('error')
  formField.classList.add('success')

  const error = formField.querySelector('small')
  error.textContent = ''
}
/* ---------- FIN Funciones Auxiliares ---------*/


/* ---------- Funciones Para Validar Inputs ---------*/
// Funcion para validar el Name y LastName
const checkNameOrLastName = (input) => {
  let valid = false
  const MIN_CHARACTER = 3
  const MAX_CHARACTER = 25

  if (isEmpty(input)) {
    showError(input, 'Este campo es obligatorio');
    return;
  }

  if (!isBetween(input, MIN_CHARACTER, MAX_CHARACTER)) {
    showError(input, `Este campo bebe tener entre ${MIN_CHARACTER} y ${MAX_CHARACTER} caracteres`);
    return;
  }

  showSucces(input);
  valid = true;
  return valid;
}

// Funcion para validar el Email
const checkEmail = (input) => {
  let valid = false

  if (isEmpty(input)) {
    showError(input, 'El email es obligatorio');
    return;
  }

  if (!isEmailValid(input)) {
    showError(input, 'El email no es valido');
    return;
  }

  if (isExistingEmail(input)) {
    showError(input, 'El email ya esta registrado');
    return;
  }

  showSucces(input);
  valid = true;
  return valid;
}

// Funcion para validar el Password
const checkPassword = (input) => {
  let valid = false
  
  if (isEmpty(input)) {
    showError(input, 'La contraseña es obligatoria');
    return;
  }

  if (!isPassSecure(input)) {
    showError(input, 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero, y un simbolo');
    return;
  }

  showSucces(input);
  valid = true;
  return valid;
}

// Funcion para validar el Num de telefono
const checkPhone = (input) => {
  let valid = false
  
  if (isEmpty(input)) {
    showError(input, 'El numero de telefono es obligatorio');
    return;
  }

  if (!isPhoneValid(input)) {
    showError(input, 'El numero de telefono no es valido');
    return;
  }

  showSucces(input);
  valid = true;
  return valid;
}
/* ---------- FIN Funciones Para Validar Inputs ---------*/

//Funcion para validar el Formulario
const validateForm = (e) =>{
  e.preventDefault();

  let isNameValid = checkNameOrLastName(nameInput)
  let isLastNameValid = checkNameOrLastName(lastNameInput)
  let isEmailValid = checkEmail(emailInput)
  let isPassValid = checkPassword(passInput)
  let isPhoneValid = checkPhone(phoneInput)

  let isValidForm = isNameValid && isLastNameValid && isEmailValid && isPassValid && isPhoneValid

  if (isValidForm) {
    users.push({
      name:nameInput.value,
      lastName:lastNameInput.value,
      email:emailInput.value,
      pass:passInput.value,
      phone:phoneInput.value,
    })

    saveToLocalStorage()
    alert('Tu registro se completo con exito')
    window.location.href = 'login.html'
  } else {
    alert('Intentalo de nuevo');
  }
}




// Funcion init
function init() {
  nameInput.addEventListener('input', () => checkNameOrLastName(nameInput));
  lastNameInput.addEventListener('input', () => checkNameOrLastName(lastNameInput));
  emailInput.addEventListener('input', () => checkEmail(emailInput));
  passInput.addEventListener('input', () => checkPassword(passInput));
  phoneInput.addEventListener('input', () => checkPhone(phoneInput))
  registerForm.addEventListener('submit', validateForm)
}

init()