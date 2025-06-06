document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const app = document.getElementById("app");
  const messageCount = document.getElementById("messageCount");

  const API_URL = "https://script.google.com/macros/s/AKfycbzRb9Pc_6L6StlLSQTGRZSdcKQxgkZ3--ITAEheAP-DMIp7_tZcDRMa-YgjxN-qu49YsQ/exec";

  const blessings = [
    "生日快樂🎂 願你快樂爆擊每一天！",
    "願你所到之處皆有人挺你🌈",
    "今年也要有滿滿 SSR！",
    "祝你心想事成、永遠不加班！",
    "願你人生如 One Piece 一樣精彩大冒險！",
    "記得，每一天都值得慶祝～",
    "祝你快樂如喬巴，勇敢如索隆！",
    "祝你身體健康！",
    "希望你心想事成！",
    "每天都被幸福包圍！",
    "祝你擁有香吉士的美食與羅賓的智慧！",
    "願你每一天都充滿笑容 😄",
   "祝你心想事成，幸福美滿 ✨",
   "未來一年順順利利 🍀",
   "願你天天都像今天一樣快樂 🥳",
   "希望你未來一年都順順利利！",
   "身體健康，平安快樂！",
   "祝你被好多好事砸中！",
   "每天都充滿驚喜與愛！",
   "希望你每天都能像娜美數錢一樣快樂～",
   "願你天天都有好心情！",
   "蒟蒻信也偷偷祝福你～",
  ];

  function getRandomBlessing() {
    return blessings[Math.floor(Math.random() * blessings.length)];
  }

  function loadMessages() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        app.innerHTML = "";
        messageCount.textContent = `目前共有 ${data.length} 則留言 🎉`;

        data.reverse().forEach(entry => {
          const card = document.createElement("div");
          card.className = "card";

          const character = entry.character || "luffy";
          const name = entry.name || "匿名";
          const time = formatTime(entry.time);
          const message = formatText(entry.message);
          const blessing = getRandomBlessing();

          let step = 0;

          card.innerHTML = `
            <div class="avatar ${character}"></div>
            <div class="content">
              <div class="name">${name} <span class="time">${time}</span></div>
            </div>
          `;

          const contentDiv = card.querySelector(".content");

          card.addEventListener("click", () => {
            step = (step + 1) % 4;

            if (step === 1) {
              contentDiv.innerHTML = `<div class="text">${message}</div>`;
            } else if (step === 2) {
              contentDiv.innerHTML = `<div class="text">🎁 ${blessing}</div>`;
            } else if (step === 3) {
              contentDiv.innerHTML = `<div class="name">${name} <span class="time">${time}</span></div>`;
            }
            // step 0 不變，保留角色頭像與初始樣式
          });

          app.appendChild(card);
        });
      })
      .catch(err => {
        app.innerHTML = `<p style="color:red;">留言載入失敗：${err}</p>`;
      });
  }

  function formatText(text) {
    return text
      ? text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
      : "";
  }

  function formatTime(str) {
    const d = new Date(str);
    return d.toLocaleString("zh-TW");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("留言送出成功！頁面將於 2 秒後更新");
    setTimeout(() => window.location.reload(), 2000);
  });

  loadMessages();
});