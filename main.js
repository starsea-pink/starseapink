document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const avatarKey = document.getElementById("avatar").value;
  const message = document.getElementById("message").value.trim();

  const avatarUrl = getAvatarUrl(avatarKey);
  const timestamp = new Date().toLocaleString();

  const messageHTML = `
    <div class="message cycle" data-step="0" data-name="${name}" data-message="${message}" data-time="${timestamp}" data-avatar="${avatarKey}">
      <img class="character" src="${avatarUrl}" alt="角色" />
    </div>
  `;

  document.getElementById("app").insertAdjacentHTML("beforeend", messageHTML);
  document.getElementById("messageForm").reset();
  updateMessageCount(); // 更新留言數
});

document.addEventListener("click", function (e) {
  const msg = e.target.closest(".message.cycle");
  if (!msg) return;

  let step = parseInt(msg.getAttribute("data-step"), 10);
  const name = msg.getAttribute("data-name");
  const message = msg.getAttribute("data-message");
  const time = msg.getAttribute("data-time");
  const avatarKey = msg.getAttribute("data-avatar") || "Luffy";

  if (step === 0) {
    msg.innerHTML = `<div class="text-box">${name}：${message}<br><span class="timestamp">${time}</span></div>`;
  } else if (step === 1) {
    msg.innerHTML = `<div class="text-box">${getRandomHBD()}<br><span class="timestamp">${time}</span></div>`;
  } else {
    msg.innerHTML = `<img class="character" src="${getAvatarUrl(avatarKey)}" alt="角色" />`;
    step = -1;
  }

  msg.setAttribute("data-step", step + 1);
});

function getAvatarUrl(key) {
  const map = {
    Luffy: 'images/Luffy.png',
    Nami: 'images/Nami.png',
    Robin: 'images/Robin.png',
    Hancock: 'images/Hancock.png',
    Sanji: 'images/Sanji.png',
    Zoro: 'images/Zoro.png',
    beauty1: 'images/beauty1.png',
    beauty2: 'images/beauty2.png',
    Special: 'images/special.png'
  };
  return map[key] || map.Luffy;
}

function getRandomHBD() {
  const list = [
    "生日快樂！",
    "Happy Birthday!",
    "祝你越來越帥～",
    "HBD！爽爽過一天！",
    "願你天天都像今天一樣快樂！",
    "壽星最大啦～",
    "Happy B-day to you～",
    "祝你吃飽睡好爽爽der～",
    "Happy happy birthday！",
    "今仔日你最大～",
    "我最崇拜Eric了"
  ];
  return list[Math.floor(Math.random() * list.length)];
}

function updateMessageCount() {
  const count = document.querySelectorAll(".message").length;
  document.getElementById("messageCount").textContent = `目前共有 ${count} 則留言`;
}

document.addEventListener("DOMContentLoaded", function () {
  updateMessageCount();
});