let password = "";
const display = document.getElementById("passwordDisplay");
const keys = document.querySelectorAll(".key");
const enterBtn = document.getElementById("enter");
const clearBtn = document.getElementById("clear");
const errorMsg = document.getElementById("errorMsg");

keys.forEach(btn => {
  btn.addEventListener("click", () => {
    if (password.length < 6) {
      password += btn.dataset.num;
      display.textContent = "*".repeat(password.length);
    }
    enterBtn.disabled = password.length !== 6;
  });
});

clearBtn.addEventListener("click", () => {
  password = "";
  display.textContent = "";
  enterBtn.disabled = true;
  errorMsg.textContent = "";
});

enterBtn.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/auth/index", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha: password })
  });
  const data = await res.json();

  if (res.ok && data && !data.error) {
    localStorage.setItem("usuario", JSON.stringify(data));
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "ERRO: Senha incorreta.";
    password = "";
    display.textContent = "";
    enterBtn.disabled = true;
  }
});