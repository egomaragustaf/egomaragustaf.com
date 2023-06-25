const contactFormElement = document.getElementById("contact-form");
const contactNameInputElement = document.getElementById("name");
const contactEmailInputElement = document.getElementById("email");
const contactMessageInputElement = document.getElementById("message");

contactFormElement.onsubmit = function (event) {
  event.preventDefault();

  const contactNameValue = contactNameInputElement.value;
  const contactEmailValue = contactEmailInputElement.value;
  const contactMessagelValue = contactMessageInputElement.value;
  
  console.log(contactNameValue);
  console.log(contactEmailValue);
  console.log(contactMessagelValue);
};
