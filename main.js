const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");

let messages = [];
let currentIndex = 0;
let step = 0;

const blessings = [
  "願你天天開心！",
  "生日快樂，笑口常開！",
  "祝你幸福美滿～",
  "財運滾滾來！",
  "身體健康，心情愉快！",
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (name === "夏夕夏景") {
    if (confirm("你輸入的是『夏夕夏景』，這會清除所有留言，確定嗎？")) {
      messages = [];
      currentIndex = 0;
      step = 0;
      app.innerHTML = "";
      updateCount();
    }
    return;
  }

  if (name === "小屁股蛋") {
    character = "special";
  }

  messages.push({ name, message, character });
  form.reset();
  updateCount();
});

function updateCount() {
  messageCount.textContent = `目前共有 ${messages.length} 則留言`;
}

app.addEventListener("click", () => {
  if (messages.length === 0) return;
  const data = messages[currentIndex];
  const { name, message, character } = data;
  let content = "";

  switch (step) {
    case 0:
      content = `
        <div class="message-card">
          <img src="images/${character}.png" class="character-img" alt="${character}" />
          <h3>${name} 的留言</h3>
        </div>`;
      break;
    case 1:
      content = `
        <div class="message-card">
          <img src="images/${character}.png" class="character-img" alt="${character}" />
          <h3>${name} 的留言</h3>
          <p>${message}</p>
        </div>`;
      break;
    case 2:
      const blessing = blessings[Math.floor(Math.random() * blessings.length)];
      content = `
        <div class="message-card">
          <img src="images/${character}.png" class="character-img" alt="${character}" />
          <h3>${name} 的留言</h3>
          <p>${message}</p>
          <p><strong>${blessing}</strong></p>
        </div>`;
      break;
    case 3:
      currentIndex = (currentIndex + 1) % messages.length;
      step = -1; // 會馬上變成 0
      app.innerHTML = "";
      break;
  }

  if (step !== 3) {
    app.innerHTML = content;
  }

  step++;
});