const form = document.getElementById("messageForm");
const board = document.getElementById("messageBoard");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

const blessings = [
  "祝你今天比昨天快樂，明天比今天幸福！",
  "生日快樂！願你的笑容永遠燦爛！",
  "希望你的一年充滿驚喜與喜悅！",
  "生日就是要大吃大喝大開心！"
];

let currentClick = 0;

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "暫停音樂";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "播放音樂";
  }
});

function saveMessages(messages) {
  localStorage.setItem("savedMessages", JSON.stringify(messages));
}

function loadMessages() {
  return JSON.parse(localStorage.getItem("savedMessages") || "[]");
}

function renderMessages() {
  board.innerHTML = "";
  const messages = loadMessages();
  messages.forEach(({ name, message, character }) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message";

    const img = document.createElement("img");
    img.src = `images/${character}.png`;
    img.alt = character;
    img.className = "character";
    msgDiv.appendChild(img);

    const nameP = document.createElement("p");
    nameP.textContent = name;
    msgDiv.appendChild(nameP);

    const messageP = document.createElement("p");
    messageP.textContent = "";
    messageP.className = "hidden";
    msgDiv.appendChild(messageP);

    const blessingP = document.createElement("p");
    blessingP.textContent = "";
    blessingP.className = "hidden";
    msgDiv.appendChild(blessingP);

    let originalCharacter = character;

    msgDiv.addEventListener("click", () => {
      currentClick = (currentClick + 1) % 4;

      if (currentClick === 1) {
        messageP.textContent = message;
        messageP.classList.remove("hidden");
      } else if (currentClick === 2) {
        blessingP.textContent = blessings[Math.floor(Math.random() * blessings.length)];
        blessingP.classList.remove("hidden");
      } else if (currentClick === 3) {
        img.src = `images/${originalCharacter}.png`;
        messageP.classList.add("hidden");
        blessingP.classList.add("hidden");
        currentClick = 0;
      }
    });

    board.appendChild(msgDiv);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  let message = form.message.value.trim();
  let character = form.character.value;

  if (name === "" || message === "") return;

  if (message.includes("夏夕夏景")) {
    if (confirm("你輸入的是關鍵詞，將清除所有留言，確定嗎？")) {
      localStorage.removeItem("savedMessages");
      renderMessages();
      return;
    } else {
      return;
    }
  }

  if (message.includes("小屁股蛋")) {
    character = "special";
  }

  const messages = loadMessages();
  messages.push({ name, message, character });
  saveMessages(messages);
  renderMessages();

  form.reset();
});

window.addEventListener("DOMContentLoaded", () => {
  renderMessages();
});