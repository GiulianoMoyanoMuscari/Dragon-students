const logoutBtn = document.getElementById('logout-message');
const userName = document.getElementById('user-name');

//Traemos el user de la session storage
const {name, lastName} = JSON.parse(sessionStorage.getItem('activeUser'));

const showUserName = () => {
  userName.textContent = `${name} ${lastName}`
}

const logout = () => {
  if (window.confirm("¿Estas seguro que deseas cerrar sesion?")) {
    sessionStorage.removeItem('activeUser')
    window.location.href = "../index.html"
  }
}


//Funcion inicializadora
const init = () => {
  showUserName();
  logoutBtn.addEventListener('click', logout)
}

init();

