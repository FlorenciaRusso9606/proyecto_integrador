const form = document.getElementById("form");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let payment = document.getElementById("payment");
let sumary = document.getElementById("sumary");
let reset = document.getElementById("resetBtn");

// mi agregado
let ticketBasic = 200;
let discountTicket = "";
let totalToPay = "";
let content = "";

// returns true if the input argument is empty
const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// returns true if the quantity value is valid
const correctValue = (value) => {
  if (value == 0 || isNaN(value) || value <= 0) {
    return false;
  } else {
    return true;
  }
};

// validate email format
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// if the input is not valid it displays an error and highlights the input field
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

// if the input is valid, show success and highlight the input field
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

// validate user first name
const checkUserFname = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const userFname = fname.value.trim();

  if (!isRequired(userFname)) {
    showError(fname, "Este campo no puede estar vacío.");
  } else if (!isBetween(userFname.length, min, max)) {
    showError(fname, `El nombre debe tener entre ${min} y ${max} caracteres.`);
  } else {
    showSuccess(fname);
    valid = true;
  }
  return valid;
};

// validate user last name
const checkUserLname = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const userLname = lname.value.trim();

  if (!isRequired(userLname)) {
    showError(lname, "Este campo no puede estar vacío.");
  } else if (!isBetween(userLname.length, min, max)) {
    showError(lname, `El apellido debe tener entre ${min} y ${max} caracteres.`);
  } else {
    showSuccess(lname);
    valid = true;
  }
  return valid;
};

// validate quantity
const checkNumber = () => {
  let valid = false;
  const ticketsNumber = quantity.value;
  if (!correctValue(ticketsNumber)) {
    showError(quantity, "El número ingresado es inválido.");
  } else {
    showSuccess(quantity);
    valid = true;
  }
  return valid;
};

// validate email
const checkEmail = () => {
  let valid = false;
  const emailValue = email.value.trim();
  if (!isRequired(emailValue)) {
    showError(email, "Este campo no puede estar vacío.");
  } else if (!isEmailValid(emailValue)) {
    showError(email, "El email ingresado es inválido.");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

// calculate ticket discount
function calculateDiscount() {
  // discounts by category
  let discountStudent = ticketBasic * 0.8;
  let discountTrainee = ticketBasic * 0.5;
  let discountJunior = ticketBasic * 0.15;

  if (category.value == "student") {
    discountTicket = discountStudent;
  } else if (category.value == "trainee") {
    discountTicket = discountTrainee;
  } else {
    discountTicket = discountJunior;
  }
}

function calculateTotal() {
  calculateDiscount();

  totalToPay = quantity.value * (ticketBasic - discountTicket);

  content = `${totalToPay}`;

  payment.innerHTML = content;

  reset.addEventListener("click", () => {
    payment.innerHTML = "";
  });
}

form.addEventListener("submit", (e) => {
  // prevent the form from submitting
  e.preventDefault();


  // validate forms
  let isUserFnameValid = checkUserFname(),
    isUserLnameValid = checkUserLname(),
    isEmailValid = checkEmail(),
    isNumberValid = checkNumber();
  let isFormValid =
    isUserFnameValid && isUserLnameValid && isEmailValid && isNumberValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    calculateTotal();
  }
});

form.addEventListener("input", (e) => {
  switch (e.target.id) {
    case "userFname":
      checkUserFname();
      break;
    case "userLname":
      checkUserLname();
      break;
    case "email":
      checkEmail();
      break;
  }
});

reset.addEventListener("click", clear);

function clear() {
  form.reset();
  content = "";
}

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
          fn.apply(null, args)
      }, delay);
    }
 }

 form.addEventListener('input', debounce( (e) => {
  switch (e.target.id) {
    case "userFname":
      checkUserFname();
      break;
    case "userLname":
      checkUserLname();
      break;
    case "email":
      checkEmail();
      break;
  }
}));

