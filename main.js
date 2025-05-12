document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("name");
  const avatarSelect = document.getElementById("avatar");
  const messageInput = document.getElementById("message");
  const messageCount = document.getElementById("messageCount");

  let messages = [];

  const birthdayMessages = [
    "祝你天天開心、事事順利！",
    "願你今年比去年更幸福！",
    "生日快樂，年年有今日，歲歲有今朝！",
    "願你的生活像動畫一樣精彩！",
    "生日快樂！願你心想事成、笑口常開！",
    "願你今天的笑比昨天多，煩惱比去年少！",
    "祝你越來越帥氣，越來越有錢！",
    "Happy Birthday！願你快樂到爆炸！",
    "年年十八，青春美麗不打折！",
    "願你所求皆如願，所行化坦途！",
    "我最崇拜Eric了!"
  ];

  function renderMessages() {
    app.innerHTML = "";
    messages.forEach((msg, index) => {
      const card = document.createElement("div");
      card.className = "message-card";

      const avatarImage = document.createElement("img");
      avatarImage.src = getAvatarPath(msg.name, msg.avatar);
      avatarImage.className = "avatar-img";
      avatarImage.alt = "角色圖片";

      const nameTag = document.createElement("h4");
      nameTag.textContent = msg.name;

      const messageText = document.createElement("p");
      messageText.textContent = msg.message;

      const blessing = document.createElement("p");
      blessing.textContent = getRandomBlessing();

      // 初始化狀態為角色圖片
      let displayState = 0;

      const cardContent = document.createElement("div");
      cardContent.appendChild(avatarImage);

      card.addEventListener("click", () => {
        displayState = (displayState + 1) % 4;
        cardContent.innerHTML = ""; // 清空

        if (displayState === 0) {
          cardContent.appendChild(avatarImage);
        } else if (displayState === 1) {
          cardContent.appendChild(nameTag);
          cardContent.appendChild(messageText);
        } else if (displayState === 2) {
          cardContent.appendChild(blessing);
        } else {
          cardContent.appendChild(avatarImage);
        }
      });

      card.appendChild(cardContent);
      app.appendChild(card);
    });

    messageCount.textContent = `目前共有 ${messages.length} 則留言`;
  }

  function getAvatarPath(name, avatar) {
    if (name === "小屁股蛋") return "/images/special.png";
    return `/images/${avatar}.png`;
  }

  function getRandomBlessing() {
    const i = Math.floor(Math.random() * birthdayMessages.length);
    return birthdayMessages[i];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const avatar = avatarSelect.value;
    const message = messageInput.value.trim();

    if (!name || !message) return;

    messages.push({ name, avatar, message });
    renderMessages();
    form.reset();
  });
});