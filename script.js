document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const avatarKey = document.getElementById("avatar").value;
  const message = document.getElementById("message").value.trim();

  const avatarUrl = getAvatarUrl(avatarKey, name);  // 加 name 傳入
  const timestamp = new Date().toLocaleString();

  const messageHTML = `
    <div class="message cycle" data-step="0" data-name="${name}" data-message="${message}" data-time="${timestamp}" data-avatar="${avatarKey}">
      <img class="character" src="${avatarUrl}" alt="角色" />
    </div>
  `;

  document.getElementById("app").insertAdjacentHTML("beforeend", messageHTML);
  document.getElementById("messageForm").reset();
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
    const avatarUrl = getAvatarUrl(avatarKey, name);
    msg.innerHTML = `<img class="character" src="${avatarUrl}" alt="角色" />`;
    step = -1;
  }

  msg.setAttribute("data-step", step + 1);
});

function getAvatarUrl(key, name = "") {
  if (key === "Special" && name !== "小屁股蛋") {
    return 'images/Luffy.png'; // 避免濫用專屬角色
  }
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
  return list[Math.floor(Math.random() * list.length)];
}const SHEET_ID = "1LxjyMv1NWGElQQKoNvSrkoCS1nmZlQhhEeuebZ0uTcg"; // 你的試算表 ID
const SHEET_NAME = "表單回應 1"; // 請確認你的工作表名稱（要正確）

fetch(`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`)
  .then(res => res.json())
  .then(data => {
    data.forEach(row => {
      const name = row["你的名字（可以匿名）"]?.trim() || "匿名";
      const message = row["想對壽星說的話"]?.trim() || "";
      const avatarKey = row["選一個角色代表你"]?.trim() || "Luffy";
      const timestamp = row["時間戳記"];

      const avatarUrl = getAvatarUrl(avatarKey, name);

      const messageHTML = `
        <div class="message cycle" data-step="0" data-name="${name}" data-message="${message}" data-time="${timestamp}" data-avatar="${avatarKey}">
          <img class="character" src="${avatarUrl}" alt="角色" />
        </div>
      `;
      document.getElementById("app").insertAdjacentHTML("beforeend", messageHTML);
    });
  });