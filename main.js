const messageForm = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");

const blessings = [
  "生日快樂！天天開心！",
  "願你幸福每一天！",
  "希望今天比昨天更快樂！",
  "繼續帥氣一整年！",
  "笑口常開最重要！",
  "生日快樂！記得每天都要笑一下！",
  "願你天天都有好心情！",
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "生日快樂！希望你天天都像魯夫一樣開朗！",
  "願你每天都像娜美一樣美麗動人！",
  "祝你快樂如喬巴，勇敢如索隆！",
  "祝你身體健康！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！",
  "祝你擁有香吉士的美食與羅賓的智慧！"
];
const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
let currentIndex = 0;

function saveMessages() {
  localStorage.setItem("messages", JSON.stringify(storedMessages));
}

function createMessageCard(msgObj, index) {
  const card = document.createElement("div");
  card.className = "message-card";

  const avatar = document.createElement("img");
  avatar.src = `images/${msgObj.character}.png`;
  avatar.alt = msgObj.character;
  avatar.className = "avatar";

  const name = document.createElement("h3");
  name.textContent = msgObj.name;

  const content = document.createElement("p");
  content.textContent = msgObj.message;
  content.style.display = "none";

  const bless = document.createElement("p");
  bless.textContent = blessings[Math.floor(Math.random() * blessings.length)];
  bless.className = "bless";
  bless.style.display = "none";

  const time = document.createElement("small");
  time.textContent = `留言時間：${msgObj.time}`;

  let clickState = 0;

  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(content);
  card.appendChild(bless);
  card.appendChild(time);

  card.addEventListener("click", () => {
    clickState++;
    if (clickState % 4 === 1) {
      avatar.style.display = "none";
      content.style.display = "block";
      bless.style.display = "none";
    } else if (clickState % 4 === 2) {
      avatar.style.display = "none";
      content.style.display = "none";
      bless.style.display = "block";
    } else if (clickState % 4 === 3) {
      avatar.style.display = "block";
      content.style.display = "none";
      bless.style.display = "none";
    }
  });

  return card;
}

function renderMessages() {
  app.innerHTML = "";
  storedMessages.forEach((msg, index) => {
    const card = createMessageCard(msg, index);
    app.appendChild(card);
  });
  messageCount.textContent = `目前共有 ${storedMessages.length} 則留言`;
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = messageForm.name.value.trim();
  const message = messageForm.message.value.trim();
  const character = messageForm.character.value;

  if (!name || !message) return;

  const time = new Date().toLocaleString("zh-TW");
  const msgObj = { name, message, character, time };

  storedMessages.push(msgObj);
  saveMessages();
  renderMessages();
  messageForm.reset();
});

renderMessages();