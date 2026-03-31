// ===== PROFIL =====
function afficherProfil() {
    const { moy, appre, color, valides } = calculerMoyenne();
    const full = profil.prenom + " " + profil.nom;
    const initials = (profil.prenom[0] + profil.nom[0]).toUpperCase();

    document.getElementById("profileFullName").textContent = full;
    document.getElementById("profileEmailDisplay").textContent = profil.email;
    document.getElementById("cardPrenom").textContent = profil.prenom;
    document.getElementById("cardNom").textContent = profil.nom;
    document.getElementById("cardEmail").textContent = profil.email;
    document.getElementById("cardMoyenne").textContent = moy + " / 20";
    document.getElementById("cardValides").textContent = valides + " / " + notes.length + " modules";
    document.getElementById("cardAppreciation").textContent = appre;
    document.getElementById("cardAppreciation").style.color = color;

    // Sidebar mini profil
    document.getElementById("sidebarName").textContent = full;
    document.getElementById("sidebarEmail").textContent = profil.email;

    // Initiales / avatar
    document.getElementById("photoInitials").textContent = initials;
    document.getElementById("sidebarAvatar").innerHTML = profil.photo
        ? `<img src="${profil.photo}" alt="photo">`
        : initials;
}

function changerPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        profil.photo = e.target.result;
        const prev = document.getElementById("photoPreview");
        prev.src = e.target.result;
        prev.style.display = "block";
        document.getElementById("photoInitials").style.display = "none";
        document.getElementById("sidebarAvatar").innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.readAsDataURL(file);
}

function ouvrirEditProfil() {
    document.getElementById("editPrenom").value = profil.prenom;
    document.getElementById("editNom").value = profil.nom;
    document.getElementById("editEmail").value = profil.email;
    document.getElementById("editModal").classList.add("open");
}
function fermerEditProfil() {
    document.getElementById("editModal").classList.remove("open");
}
function sauvegarderProfil() {
    profil.prenom = document.getElementById("editPrenom").value.trim() || profil.prenom;
    profil.nom    = document.getElementById("editNom").value.trim()    || profil.nom;
    profil.email  = document.getElementById("editEmail").value.trim()  || profil.email;
    fermerEditProfil();
    afficherProfil();
}
