const app = document.getElementById("app");
const form = document.getElementById("messageForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const characterSelect = document.getElementById("character");
const audio = document.getElementById("bgm");
const muteButton = document.getElementById("muteButton");

let messages = [];

const wishes = [
  "生日快樂！天天開心！",
  "願你擁有美好的一年！",
  "幸福快樂每一天～",
  "快樂不打烊！",
  "年年有今日、歲歲有今朝～",
  "祝你心想事成！",
];

const characterImages = {
  Luffy: "img/luffy.png",
  Nami: "img/nami.png",
  Robin: "img/robin.png",
  Hancock: "img/hancock.png",
  Sanji: "img/sanji.png",
  Zoro: "img/zoro.png",
  beauty1: "img/beauty1.png",
  beauty2: "img/beauty2.png",
  Special: "img/special.png",
};

function renderMessages() {
  app.innerHTML = "";
  messages.forEach((msg, index) => {
    const box = document.createElement("div");
    box.className = "message-box";

    const img = document.createElement("img");
    img.src = characterImages[msg.character] || "img/default.png";
    img.className = "character-img";

    const text = document.createElement("div");
    text.className = "message-text";
    text.innerText = msg.character;

    let state = 0;
    box.onclick = () => {
      state = (state + 1) % 4;
      switch (state) {
        case 0:
          img.style.display = "block";
          text.innerText = msg.character;
          break;
        case 1:
          img.style.display = "none";
          text.innerText = msg.name + "\n" + msg.message;
          break;
        case 2:
          img.style.display = "none";
          text.innerText = wishes[Math.floor(Math.random() * wishes.length)];
          break;
        case 3:
          img.style.display = "block";
          text.innerText = msg.character;
          break;
      }
    };

    box.appendChild(img);
    box.appendChild(text);
    app.appendChild(box);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const character = characterSelect.value;

  if (!name || !message) return;

  if (name === "夏夕夏景") {
    messages = [];
    renderMessages();
    alert("留言已清除！");
    form.reset();
    return;
  }

  messages.unshift({ name, message, character });
  renderMessages();
  form.reset();
};

// 音樂控制
muteButton.onclick = () => {
  audio.muted = !audio.muted;
  muteButton.innerText = audio.muted ? "播放音樂" : "靜音";
};