// ===== AUTHENTIFICATION =====
const CREDS = { email: "tuser@esp.sn", password: "1234" };

function login() {
    const em = document.getElementById("emailInput").value.trim();
    const pw = document.getElementById("pwdInput").value;
    if (em === CREDS.email && pw === CREDS.password) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("appShell").style.display = "flex";
        initApp();
    } else {
        document.getElementById("loginError").textContent = "Email ou mot de passe incorrect.";
    }
}

function logout() {
    document.getElementById("appShell").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("emailInput").value = "";
    document.getElementById("pwdInput").value = "";
    document.getElementById("loginError").textContent = "";
}
