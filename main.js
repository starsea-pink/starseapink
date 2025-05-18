ocument.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const app = document.getElementById("app");
  const countSpan = document.getElementById("messageCount");
  const music = document.getElementById("bgMusic");

  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  renderMessages(messages);

  countSpan.textContent = `目前共有 ${messages.length} 則悶騷留言`;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const selectedCharacter = document.getElementById("character").value;

    if (!name || !message) return;

    if (name === "夏夕夏景") {
      localStorage.removeItem("messages");
      app.innerHTML = "";
      countSpan.textContent = "悶騷留言已清除";
      return;
    }

    let characterImg = `images/${selectedCharacter}.png`;
    if (name === "小屁股蛋") {
      characterImg = "images/special.png";
    }

    const newMessage = { name, message, characterImg };
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    addMessageToDOM(newMessage);
    countSpan.textContent = `目前共有 ${messages.length} 則悶騷留言`;

    form.reset();
  });

  function renderMessages(msgs) {
    app.innerHTML = "";
    msgs.forEach(addMessageToDOM);
  }

  function addMessageToDOM({ name, message, characterImg }) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";

    const img = document.createElement("img");
    img.src = characterImg;

    const nameP = document.createElement("p");
    nameP.innerHTML = `<strong>${name}</strong>：${message}`;

    messageDiv.appendChild(img);
    messageDiv.appendChild(nameP);
    app.appendChild(messageDiv);
  }

  // 音樂播放
  if (music) {
    music.play().catch((err) => {
      console.warn("音樂播放失敗：", err);
    });
  }
});