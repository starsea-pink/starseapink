document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const characterKey = document.getElementById("character").value;
  const message = document.getElementById("message").value.trim();

  const imgUrl = getCharacterImage(name, characterKey);
  const hbdText = getRandomHBD();

  const messageElement = document.createElement("div");
  messageElement.className = "message";

  let state = 0; // 0: 角色, 1: 留言, 2: HBD, 3: 角色

  const characterImg = document.createElement("img");
  characterImg.className = "character";
  characterImg.src = imgUrl;

  const messageText = document.createElement("div");
  messageText.className = "message-content";
  messageText.innerText = message;

  const hbdMessage = document.createElement("div");
  hbdMessage.className = "message-content";
  hbdMessage.innerText = hbdText;

  messageElement.appendChild(characterImg);
  messageElement.appendChild(messageText);
  messageElement.appendChild(hbdMessage);

  messageElement.addEventListener("click", () => {
    state = (state + 1) % 3;
    messageText.style.display = state === 1 ? "block" : "none";
    hbdMessage.style.display = state === 2 ? "block" : "none";
    characterImg.style.display = state === 0 ? "block" : "none";
  });

  document.getElementById("app").appendChild(messageElement);
  document.getElementById("messageForm").reset();
});

function getCharacterImage(name, key) {
  if (name === "小屁股蛋") {
    return "https://i.imgur.com/QXbaF3x.png";
  }

  const map = {
    Luffy: 'images/full/Luffy.png',
    Nami: 'images/full/Nami.png',
    Robin: 'images/full/Robin.png',
    Hancock: 'images/full/Hancock.png',
    Sanji: 'images/full/Sanji.png',
    Zoro: 'images/full/Zoro.png',
    beauty1: 'images/full/beauty1.png',
    beauty2: 'images/full/beauty2.png',
    Special: 'images/full/Special.png'
  };

  return map[key] || "https://i.imgur.com/default-avatar.png";
}

function getRandomHBD() {
  const messages = [
    "生日快樂！",
    "Happy Birthday!",
    "祝你越來越美～",
    "HBD！爽爽過一天！",
    "願你天天都像今天一樣快樂！",
    "壽星最大啦～",
    "Happy B-day to you～",
    "祝你吃飽睡好爽爽der～",
    "Happy happy birthday！",
    "今仔日你最大～"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}