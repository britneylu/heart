const confirmBtn = document.getElementById("confirm");
const input = document.getElementById("input");
const love = document.getElementById("love");
const inputView = document.getElementById("inputView");

confirmBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    love.textContent = text;
    inputView.style.display = "none";
    love.style.display = "block";
};