const contactFormElement = document.getElementById("contact-form");
const contactNameInputElement = document.getElementById("name");
const contactEmailInputElement = document.getElementById("email");
const contactMessageInputElement = document.getElementById("message");

contactFormElement.addEventListener("submit", submitContactForm);

function submitContactForm(event) {
  event.preventDefault();

  const contactNameValue = contactNameInputElement.value;
  const contactEmailValue = contactEmailInputElement.value;
  const contactMessagelValue = contactMessageInputElement.value;

  const dialogContent = document.getElementById("dialog-content");

  dialogContent.innerHTML = `
      <h1>Hello ${contactNameValue}</h1>
      <h2>Thanks for sending me message with your email ${contactEmailValue}</h2>
      <p>I really apreciate it! 🙏</p>
    `;

  const dialog = document.getElementById("dialog");
  dialog.showModal();

  console.log("test");
}
