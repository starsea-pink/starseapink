const form = document.getElementById("messageForm");
const board = document.getElementById("app");  // 修正這裡
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

const blessings = [
  "祝你今天比昨天快樂，明天比今天幸福！",
  "生日快樂！願你的笑容永遠燦爛！",
  "希望你的一年充滿驚喜與喜悅！",
  "生日就是要大吃大喝大開心！"
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

    const nameP = document.createElement("p");
    nameP.textContent = name;

    const messageP = document.createElement("p");
    messageP.textContent = message;
    messageP.className = "hidden";

    const blessingP = document.createElement("p");
    blessingP.textContent = "";
    blessingP.className = "hidden";

    msgDiv.appendChild(img);
    msgDiv.appendChild(nameP);
    msgDiv.appendChild(messageP);
    msgDiv.appendChild(blessingP);

    const originalSrc = img.src;
    let clickStep = 0;

    msgDiv.addEventListener("click", () => {
      clickStep = (clickStep + 1) % 4;
      if (clickStep === 1) {
        // 顯示留言內容
        messageP.classList.remove("hidden");
      } else if (clickStep === 2) {
        // 顯示祝福
        blessingP.textContent = blessings[Math.floor(Math.random() * blessings.length)];
        blessingP.classList.remove("hidden");
      } else if (clickStep === 3) {
        // 重置
        messageP.classList.add("hidden");
        blessingP.classList.add("hidden");
        blessingP.textContent = "";
        clickStep = 0;
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