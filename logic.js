const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://marketing.sandbox.simetrik-beta.io/style-mvp/04-Texto-2/Bullet-blue-icon-4.png";
const PERSON_IMG = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const BOT_NAME = "Echo Advisor -  MVP";
const PERSON_NAME = "William";

let datachimpbot = ""; // variable declarada en un ámbito superior y inicializada vacía

fetch('https://frtb6lqz5e.execute-api.us-east-2.amazonaws.com/dev/send_message')
  .then((response) => response.json())
  .then((data) => {
    datachimpbot = data.body; // actualizo el valor de la variable con la respuesta de la API
    console.log(datachimpbot);
  })
  .catch((error) => console.log("No funciona la API"));

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value.trim();
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // envío el mensaje del usuario a la API para obtener la respuesta del bot
  fetch('https://frtb6lqz5e.execute-api.us-east-2.amazonaws.com/dev/send_message', {
    method: "POST",
    body: JSON.stringify({
      message: msgText
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    datachimpbot = JSON.parse(data.body); // actualizo el valor de la variable con la respuesta de la API
    console.log(datachimpbot);
    appendMessage(BOT_NAME, BOT_IMG, "left", datachimpbot);
  })
  .catch((error) => console.log("No funciona la API"));
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
