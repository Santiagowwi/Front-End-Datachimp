const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerInput_2 = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://marketing.sandbox.simetrik-beta.io/style-mvp/04-Texto-2/Bullet-blue-icon-4.png";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "DataChimp MVP";
const PERSON_NAME = "Santiago";


msgerForm.onsubmit=(event)=>{
  event.preventDefault();  
  fetch('https://i7w9qvsht1.execute-api.us-east-1.amazonaws.com/v1/invoke-lambda', {
              method: "POST",
              body: JSON.stringify({
                message: msgerInput_2.value
              }),
              headers: {
                  "Content-Type":"application/json"
              }
          })
          .then( res => res.json())
          .then( data => console.log(data))
          console.log(msgerInput_2.value)
  
  }
  




msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse();
});


function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;


  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}





let datachimpbot; // variable declarada en un ámbito superior
let msgText;



fetch('https://i7w9qvsht1.execute-api.us-east-1.amazonaws.com/v1/invoke-lambda')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    datachimpbot = data.body; // asigno el valor a la variable en el ámbito superior
    console.log(datachimpbot);
  })
  .catch((error) => console.log("No funciona la API"));


function botResponse() {
  
  const msgText = datachimpbot; // utilizo la variable en la función botResponse
  

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, 1);
}

































// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}





