const globa_carrito = new Carrito();

function parseCardInfo() {
  const input = document.getElementById('card');
  const error = document.getElementById('card-error');

  const original = input.value;
  const cursor = input.selectionStart;

  // Step 1: Remove non-digits
  let digits = original.replace(/\D/g, '').slice(0, 20);

  // Step 2: Format into groups of 4
  const formatted = digits.replace(/(.{4})/g, '$1 ').trim();

  // Step 3: Calculate new cursor position
  let newCursor = cursor;

  // Count digits before the original cursor
  const digitsBeforeCursor = original.slice(0, cursor).replace(/\D/g, '').length;

  // Now simulate what the formatted string would look like up to that digit
  let i = 0, digitCount = 0;
  while (digitCount < digitsBeforeCursor && i < formatted.length) {
    if (/\d/.test(formatted[i])) digitCount++;
    i++;
  }
  newCursor = i;

  // Step 4: Set value and restore cursor
  input.value = formatted;
  input.setSelectionRange(newCursor, newCursor);

  // Step 5: Validation
  const isValid = luhnCheck(digits);
  error.textContent = (digits.length >= 13 && !isValid) ? "Número de tarjeta invalido" : "";
}

function luhnCheck(number) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function getCardType(number) {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number)) return "MasterCard";
  if (/^3[47]/.test(number)) return "AMEX";
  if (/^6(?:011|5)/.test(number)) return "Discover";
  return "Unknown";
}

document.addEventListener("DOMContentLoaded", async () => {

  const priceTag = document.getElementById("price_tag");

  priceTag.innerText = `Tu total es de: S./${await globa_carrito.get_grand_total()}`

  const form = document.querySelector("form");
  const cardInput = document.getElementById("card");
  const errorDisplay = document.getElementById("card-error");

  const requiredFields = form.querySelectorAll("input");

  // Luhn algorithm
  function isValidCardNumber(cardNumber) {
    const digits = cardNumber.replace(/\s/g, "").split("").reverse().map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  // Validate email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validate month name
  function isValidMonth(month) {
    return [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ].includes(month.toLowerCase());
  }

  // Validate year
  function isValidYear(year) {
    const currentYear = new Date().getFullYear();
    return year >= currentYear && year <= currentYear + 10;
  }

  // Validate CVV
  function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }

  // Validate Postal Code
  function isValidPostal(code) {
    return /^\d{5}$/.test(code);
  }

  // Main validation on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const values = {};
    let invalidFields = [];

    requiredFields.forEach((field) => {
      const name = field.previousElementSibling?.innerText?.replace(":", "")?.trim() || "Campo";
      values[name] = field.value.trim();
      if (field.value.trim() === "") {
        invalidFields.push(name);
      }
    });

    if (invalidFields.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        html: `Por favor completa los siguientes campos:<br><strong>${invalidFields.join(", ")}</strong>`,
      });
    }

    const email = values["Email"];
    const cardNumber = values["Número"];
    const month = values["Exp. Mes"];
    const year = parseInt(values["Exp. Año"]);
    const cvv = values["CVV"];
    const postal = values["Código Postal"];

    if (!isValidEmail(email)) {
      return Swal.fire({ icon: "error", title: "Email inválido", text: "Por favor ingresa un email válido." });
    }

    if (!isValidCardNumber(cardNumber)) {
      errorDisplay.textContent = "Número de tarjeta inválido";
      cardInput.focus();
      return;
    }

    if (!isValidMonth(month)) {
      return Swal.fire({ icon: "error", title: "Mes inválido", text: "Ingresa un mes de expiración válido." });
    }

    if (!isValidYear(year)) {
      return Swal.fire({ icon: "error", title: "Año inválido", text: "El año debe estar entre actual y +10 años." });
    }

    if (!isValidCVV(cvv)) {
      return Swal.fire({ icon: "error", title: "CVV inválido", text: "Debe contener 3 o 4 dígitos." });
    }

    if (!isValidPostal(postal)) {
      return Swal.fire({ icon: "error", title: "Código postal inválido", text: "Debe contener 5 dígitos." });
    }

    // Mock processing
    Swal.fire({
      title: "Procesando pago...",
      text: "Un momento por favor",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Pago exitoso",
            text: "Gracias por tu compra en WomSport 🛍️",
            confirmButtonText: "OK",
          }).then(() => {
            globa_carrito.clear_cart()
            window.location.href = "/"
            // form.submit(); // Uncomment to allow actual submit
          });
        }, 2000); // 2 second mock delay
      },
    });
  });
});
