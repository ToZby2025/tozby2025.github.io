// 预设的正确生日（格式: MMDD）
const CORRECT_BIRTHDAY = "2004-04-30";

// 验证生日
function checkBirthday() {
  const input = document.getElementById("birthday-input").value;
  if (input === CORRECT_BIRTHDAY) {
    window.location.href = "main.html"; // 跳转到星空页
  } else {
    document.getElementById("error-message").textContent = "生日不对哦，再试试~";
  }
}

// 星空页逻辑
if (document.querySelector(".stars-container")) {
  const blessings = [
    "愿你岁岁平安！",
    "心想事成，万事如意！",
    "友谊长存，生日快乐！",
    // 添加更多祝福语...
  ];

  // 生成 50 颗随机位置的星星
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.onclick = () => showBlessing();
    document.querySelector(".stars-container").appendChild(star);
  }

  // 显示随机祝福
  function showBlessing() {
    const modal = document.getElementById("modal");
    const text = document.getElementById("blessing-text");
    text.textContent = blessings[Math.floor(Math.random() * blessings.length)];
    modal.classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }
}