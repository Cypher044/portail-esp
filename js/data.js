// ===== DONNÉES =====
const notes = [
    { nom: "Données Semi-Structurées", coef: 0.75, note: 14 },
    { nom: "POO",                      coef: 0.75, note: 14 },
    { nom: "Gestion de Projet",        coef: 1,    note: 16 },
    { nom: "Réseaux Radio",            coef: 0.5,  note: 13 },
    { nom: "Admin Systèmes",           coef: 0.5,  note: 11 },
    { nom: "Sécurité",                 coef: 0.75, note: 15 },
    { nom: "Veille Technologique",     coef: 0.5,  note: 12 },
    { nom: "Multimédia",               coef: 0.5,  note: 10 },
    { nom: "SVA",                      coef: 0.5,  note: 11 },
    { nom: "SDN/SDR/NFV",             coef: 1,    note: 14.5 },
    { nom: "Mémoire",                  coef: 0.75, note: 15 },
    { nom: "Soutenance",               coef: 0.5,  note: 14 }
];

let profil = { prenom: "Test", nom: "User", email: "tuser@esp.sn", photo: null };

// ===== NAVIGATION =====
function showSection(name) {
    ['profil', 'resultats', 'emploi'].forEach(s => {
        const key = s.charAt(0).toUpperCase() + s.slice(1);
        document.getElementById('section' + key).classList.remove('active');
        document.getElementById('nav' + key).classList.remove('active');
    });
    const key = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('section' + key).classList.add('active');
    document.getElementById('nav' + key).classList.add('active');
}

// ===== CALCUL MOYENNE =====
function calculerMoyenne() {
    let sum = 0, coefSum = 0, valides = 0;
    notes.forEach(n => {
        sum += n.note * n.coef;
        coefSum += n.coef;
        if (n.note >= 10) valides++;
    });
    const moy = (sum / coefSum).toFixed(2);
    let appre = "", color = "";
    if      (moy >= 16) { appre = "Excellent";   color = "#bef264"; }
    else if (moy >= 14) { appre = "Très Bien";   color = "#86efac"; }
    else if (moy >= 12) { appre = "Bien";         color = "#6ee7b7"; }
    else if (moy >= 10) { appre = "Passable";     color = "#fde68a"; }
    else                { appre = "Insuffisant";  color = "#fca5a5"; }
    return { moy, appre, color, valides };
}

// ===== INITIALISATION =====
function initApp() {
    afficherNotes();
    afficherProfil();
    buildTimetable();
}
