document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const app = document.getElementById("app");
  const messageCount = document.getElementById("messageCount");

  const API_URL = "https://script.google.com/macros/s/AKfycbzRb9Pc_6L6StlLSQTGRZSdcKQxgkZ3--ITAEheAP-DMIp7_tZcDRMa-YgjxN-qu49YsQ/exec";

  // 祝福語清單
  const blessings = [
  "🎉 願你天天都有雞排吃！",
  "希望你人生每天都有 SSR！",
  "願你打電動永遠不被嘴！",
  "願你上廁所永遠有衛生紙！",
  "祝你幸福快樂像海賊王一樣傳奇～",
  "Happy Birthday!",
  "祝你越來越帥～",
  "HBD！爽爽過一天！",
  "願你天天都像今天一樣快樂！",
  "壽星最大啦～",
  "Happy B-day to you～",
  "祝你吃飽睡好爽爽der～",
  "Happy happy birthday！",
  "今仔日你最大～",
  "我最崇拜Eric了",
  "願你天天開心🎉！ 記得每天都要笑一下！",
  "你最棒！今天也要幸福喔！",
  "希望你的人生像航海王一樣精彩！",
  "祝你一整年都像魯夫吃到肉一樣快樂！",
  "願你天天笑得像魯夫一樣開懷！",
  "祝你像索隆一樣堅定勇敢！",
  "希望你每天都能像娜美數錢一樣快樂～",
  "人生就該像佛朗基一樣超～級～！",
  "祝你魅力爆棚，像羅賓一樣優雅神秘～",
  "別忘了休息，像喬巴一樣可愛療癒！",
  "每天都要讚美自己，像女帝一樣自信滿滿！",
  "像香吉士一樣暖心地寵愛生活吧～",
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
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
  // 顯示隨機祝福語
  function showRandomBlessing() {
    const random = blessings[Math.floor(Math.random() * blessings.length)];
    alert(random);
  }

  // 顯示留言列表
  function loadMessages() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log("留言資料:", data);
        app.innerHTML = "";
        messageCount.textContent = `目前共有 ${data.length} 則留言 🎉`;

        data.reverse().forEach(entry => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <div class="avatar ${entry.character}"></div>
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

  // 格式化留言文字（防止 XSS）
  function formatText(text) {
    return text
      ? text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
      : "";
  }

  // 格式化時間
  function formatTime(str) {
    const d = new Date(str);
    return d.toLocaleString("zh-TW");
  }

  // 表單送出事件
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("留言送出成功！頁面將於 2 秒後更新");
    setTimeout(() => window.location.reload(), 2000);
  });

  // 初始化
  showRandomBlessing(); // 頁面載入時顯示祝福
  loadMessages();        // 載入留言
});