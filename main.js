document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const avatarKey = document.getElementById("character").value;
  const message = document.getElementById("message").value.trim();

  const avatarUrl = getAvatarUrl(avatarKey, name);
  const timestamp = new Date().toLocaleString();

  const messageHTML = `
    <div class="message cycle" data-step="0" data-name="${name}" data-message="${message}" data-time="${timestamp}" data-avatar="${avatarKey}">
      <img class="character" src="${avatarUrl}" alt="角色" />
    </div>
  `;

  document.getElementById("app").insertAdjacentHTML("beforeend", messageHTML);
  document.getElementById("messageForm").reset();

  // ✅ 新增：送出留言到 Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbwd5F1JQdGfELT8YsZipWcMsnjN-8VrG4hHDGPP0sl-oeMRX5OVJcqT0f3y8BU90ncWhg/exec" , {
    method: "POST",
    body: JSON.stringify({
      name: name,
      message: message,
      avatar: avatarKey
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(result => {
      if (result.status === "success") {
        console.log("留言成功儲存！");
      } else {
        console.error("留言儲存失敗：", result.message);
      }
    })
    .catch(err => console.error("傳送留言時錯誤：", err));
});

function getAvatarUrl(key, name) {
  return `images/${key}.png`;
}