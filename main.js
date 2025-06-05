const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");

let messages = [];
let toggleStates = new Map();

const blessings = [
  "願你天天都有好心情！",
  "生日快樂！永遠年輕，永遠熱泪盈眶！",
  "願你今年心想事成，萬事順利！",
  "開心每一天，幸福不間斷！",
  "你是最棒的，別懷疑！",
  "生日快樂！記得每天都要笑一下！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "生日快樂！希望你天天都像魯夫一樣開朗！",
  "願你每天都像娜美一樣美麗動人！",
  "祝你快樂如喬巴，勇敢如索隆！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！",
  "悶騷也可以很快樂！"
];

function createMessageElement(msg, index) {
  const div = document.createElement("div");
  div.className = "message";

  const img = document.createElement("img");
  img.src = `images/${msg.character}.png`;
  img.alt = msg.character;

  const name = document.createElement("div");
  name.textContent = msg.name;

  const time = document.createElement("div");
  time.className = "time";
  time.textContent = new Date(msg.timestamp).toLocaleString();

  const message = document.createElement("div");
  message.className = "msg-text";
  message.textContent = msg.message;

  const bless = document.createElement("div");
  bless.className = "msg-bless";
  bless.textContent = blessings[Math.floor(Math.random() * blessings.length)];

  toggleStates.set(index, 0);

  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(time);

  div.addEventListener("click", () => {
    let state = toggleStates.get(index);
    div.innerHTML = "";
    if (state === 0) {
      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(time);
      toggleStates.set(index, 1);
    } else if (state === 1) {
      div.appendChild(message);
      toggleStates.set(index, 2);
    } else if (state === 2) {
      div.appendChild(bless);
      toggleStates.set(index, 3);
    } else {
      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(time);
      toggleStates.set(index, 1);
    }
  });

  return div;
}

function renderMessages() {
  app.innerHTML = "";
  messages.forEach((msg, index) => {
    const msgElement = createMessageElement(msg, index);
    app.appendChild(msgElement);
  });
  messageCount.textContent = `共有 ${messages.length} 則留言`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = form.elements["name"].value.trim();
  const messageInput = form.elements["message"].value.trim();
  let character = form.elements["character"].value;
  let name = nameInput;

  if (nameInput === "小屁股蛋") {
    character = "special";
  }

  messages.push({
    name,
    message: messageInput,
    character,
    timestamp: Date.now()
  });

  form.reset();
  renderMessages();
});