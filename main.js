document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const app = document.getElementById("app");
  const messageCount = document.getElementById("messageCount");

  const API_URL = "https://script.google.com/macros/s/AKfycbzRb9Pc_6L6StlLSQTGRZSdcKQxgkZ3--ITAEheAP-DMIp7_tZcDRMa-YgjxN-qu49YsQ/exec";

  function loadMessages() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        app.innerHTML = "";
        messageCount.textContent = `目前共有 ${data.length} 則留言 🎉`;

        data.reverse().forEach(entry => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <div class="avatar ${entry.avatar}"></div>
            <div class="content">
              <div class="name">${entry.name || '匿名'} <span class="time">${formatTime(entry.time)}</span></div>
              <div class="text">${formatText(entry.message)}</div>
            </div>
          `;
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