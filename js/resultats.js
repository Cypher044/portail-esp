// ===== RÉSULTATS =====
function afficherNotes() {
    const tbody = document.getElementById("notesTableBody");
    tbody.innerHTML = "";
    notes.forEach(item => {
        const pass = item.note >= 10;
        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td style="font-weight:500;">${item.nom}</td>
                <td style="color:var(--muted);">${item.coef}</td>
                <td><span class="note-pill ${pass ? 'note-pass' : 'note-fail'}">${item.note}</span></td>
                <td><button class="reclamer-btn" onclick="ouvrirReclam('${item.nom}')">Réclamer</button></td>
            </tr>`);
    });

    const { moy, appre, color } = calculerMoyenne();
    document.getElementById("moyenneNum").textContent = moy + " / 20";
    const badge = document.getElementById("appreBadge");
    badge.textContent = appre;
    badge.style.background = color + "22";
    badge.style.color = color;
    badge.style.border = `1px solid ${color}55`;
}

// ===== RÉCLAMATION =====
function ouvrirReclam(matiere) {
    document.getElementById("reclamMatiere").value = matiere;
    document.getElementById("reclamTexte").value = "";
    document.getElementById("reclamModal").classList.add("open");
}
function fermerReclam() {
    document.getElementById("reclamModal").classList.remove("open");
}
function envoyerReclam() {
    if (!document.getElementById("reclamTexte").value.trim()) {
        alert("Veuillez saisir votre réclamation.");
        return;
    }
    alert("Réclamation enregistrée avec succès !");
    fermerReclam();
}

// Fermer les modales au clic extérieur
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay'))      fermerReclam();
    if (e.target.classList.contains('edit-modal-overlay')) fermerEditProfil();
});
