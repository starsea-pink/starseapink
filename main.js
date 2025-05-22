const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const messageCount = document.getElementById("messageCount");

let messages = [];
let displayIndex = 0;

const blessings = [
  "生日快樂！願你天天開心！",
  "祝你健康幸福，萬事如意！",
  "願你心想事成，笑口常開！",
  "永遠迷人、永遠帥氣、永遠年輕！",
];

const imagePath = "images/";
const characterList = [
  "background", "beauty1", "beauty2", "Chopper", "Hancock", "Luffy",
  "Nami", "Robin", "Sanji", "special", "Zoro", "Usopp", "Franky"
];

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "暫停音樂";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "播放音樂";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (name === "夏夕夏景") {
    if (confirm("你輸入的是特殊指令，將會清除所有留言，確定嗎？")) {
      messages = [];
      updateMessages();
    }
    form.reset();
    return;
  }

  if (message === "小屁股蛋") {
    character = "special";
  }

  const newMessage = {
    name,
    message,
    character,
    blessing: blessings[Math.floor(Math.random() * blessings.length)],
    clickStage: 0
  };

  messages.push(newMessage);
  updateMessages();
  form.reset();
});

function updateMessages() {
  app.innerHTML = "";
  messages.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "message-box";

    const img = document.createElement("img");
    img.src = `${imagePath}${msg.character}.png`;
    img.alt = msg.character;
    img.style.width = "100px";

    const name = document.createElement("p");
    name.textContent = `${msg.name}`;

    const text = document.createElement("p");
    text.textContent = msg.message;
    text.style.display = "none";

    const bless = document.createElement("p");
    bless.textContent = msg.blessing;
    bless.style.display = "none";

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(text);
    div.appendChild(bless);

    div.addEventListener("click", () => {
      msg.clickStage = (msg.clickStage + 1) % 4;
      if (msg.clickStage === 1) {
        text.style.display = "block";
      } else if (msg.clickStage === 2) {
        bless.style.display = "block";
      } else if (msg.clickStage === 3) {
        img.src = `${imagePath}${msg.character}.png`;
      } else {
        text.style.display = "none";
        bless.style.display = "none";
      }
    });

    app.appendChild(div);
  });

  messageCount.textContent = `目前共 ${messages.length} 則留言`;
}