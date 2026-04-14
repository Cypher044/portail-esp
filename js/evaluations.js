// ===== DONNÉES PROFS =====
const profs = [
    { id: 'fall_doudou',    nom: 'Doudou Fall',        modules: ['Technologie de Sécurités', 'Veille Technologique'] },
    { id: 'sadio_ousmane',  nom: 'Ousmane SADIO',      modules: ['SDN/SDR/NFV CM', 'SDN/SDR/NFV TD'] },
    { id: 'diop_mouhamed',  nom: 'MOUHAMED DIOP',      modules: ['Approfondissement Programmation'] },
    { id: 'diop_abdou',     nom: 'Abdou Assane Diop',  modules: ['Architecture Réseaux sécurisés'] },
    { id: 'diallo_moussa',  nom: 'Moussa Diallo',      modules: ['Ingénierie Réseaux Radio', 'SVA'] },
    { id: 'mbaye_moustapha',nom: 'MOUSTAPHA MBAYE',    modules: ['Multimédia Télécoms'] },
    { id: 'diahame_mamadou',nom: 'Mamadou DIAHAME',    modules: ['Gestion de Projets'] },
    { id: 'fall_ibrahima',  nom: 'Ibrahima Fall',      modules: ['Données Semi-Structurées'] },
    { id: 'fall_babacar',   nom: 'Babacar Fall',       modules: ['Admin. & Supervision Systèmes'] },
];

const criteresLabels = ['Clarté', 'Disponibilité', 'Pédagogie'];

// Stockage local des évaluations
let evaluations = JSON.parse(localStorage.getItem('esp_evaluations') || '{}');

// ===== BUILD PAGE ÉVALUATIONS =====
function buildEvaluations() {
    const container = document.getElementById('profsGrid');
    if (!container) return;
    container.innerHTML = '';

    profs.forEach(prof => {
        const eval_ = evaluations[prof.id] || null;
        const initiales = prof.nom.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

        const card = document.createElement('div');
        card.className = 'prof-card';
        card.id = `card-${prof.id}`;

        // Critères HTML
        const criteresHTML = criteresLabels.map((label, ci) => `
            <div class="criterion">
                <span class="criterion-label">${label}</span>
                <div class="criterion-stars" id="crit-${prof.id}-${ci}">
                    ${[1,2,3,4,5].map(s => `
                        <span class="star ${eval_ && eval_.criteres[ci] >= s ? 'filled' : ''}"
                              data-prof="${prof.id}" data-crit="${ci}" data-val="${s}"
                              onclick="setCritere('${prof.id}', ${ci}, ${s})"
                              onmouseenter="hoverCritere('${prof.id}', ${ci}, ${s})"
                              onmouseleave="unhoverCritere('${prof.id}', ${ci})">★</span>
                    `).join('')}
                </div>
            </div>`).join('');

        // Note globale actuelle
        const noteActuelle = eval_ ? eval_.note : 0;
        const commentActuel = eval_ ? eval_.commentaire : '';
        const dejaNotes = !!eval_;

        card.innerHTML = `
            <div class="prof-card-header">
                <div class="prof-avatar">${initiales}</div>
                <div>
                    <div class="prof-name">${prof.nom}</div>
                    <div class="prof-module">${prof.modules.join(' · ')}</div>
                </div>
            </div>

            <div class="stars-row">
                <div class="stars" id="stars-${prof.id}">
                    ${[1,2,3,4,5].map(s => `
                        <span class="star ${noteActuelle >= s ? 'filled' : ''}"
                              data-prof="${prof.id}" data-val="${s}"
                              onclick="setNote('${prof.id}', ${s})"
                              onmouseenter="hoverStars('${prof.id}', ${s})"
                              onmouseleave="unhoverStars('${prof.id}')">★</span>
                    `).join('')}
                </div>
                <span class="stars-label" id="label-${prof.id}">
                    ${noteActuelle > 0 ? noteLabel(noteActuelle) : 'Non noté'}
                </span>
            </div>

            <div class="criteria-list">${criteresHTML}</div>

            <textarea class="prof-comment-input" id="comment-${prof.id}"
                placeholder="Commentaire optionnel..."
                ${dejaNotes ? 'disabled' : ''}>${commentActuel}</textarea>

            <button class="submit-eval-btn" id="btn-${prof.id}"
                onclick="soumettrEval('${prof.id}')"
                ${dejaNotes ? 'disabled' : ''}>
                ${dejaNotes ? '✓ Évaluation enregistrée' : 'Soumettre l\'évaluation'}
            </button>
        `;

        container.appendChild(card);

        // Stocker la note en mémoire de travail si pas encore notée
        if (!eval_) {
            workingEvals[prof.id] = { note: 0, criteres: [0, 0, 0], commentaire: '' };
        }
    });

    updateSummary();
}

// Notes de travail (avant soumission)
let workingEvals = {};

// ===== ÉTOILES GLOBALES =====
function setNote(profId, val) {
    if (evaluations[profId]) return; // déjà soumis
    workingEvals[profId] = workingEvals[profId] || { note: 0, criteres: [0,0,0], commentaire: '' };
    workingEvals[profId].note = val;
    renderStars(profId, val);
    document.getElementById(`label-${profId}`).textContent = noteLabel(val);
}
function hoverStars(profId, val) {
    if (evaluations[profId]) return;
    const stars = document.querySelectorAll(`#stars-${profId} .star`);
    stars.forEach((s, i) => {
        s.classList.toggle('hovered', i < val);
        s.classList.remove('filled');
    });
}
function unhoverStars(profId) {
    if (evaluations[profId]) return;
    const current = (workingEvals[profId] || {}).note || 0;
    renderStars(profId, current);
}
function renderStars(profId, val) {
    const stars = document.querySelectorAll(`#stars-${profId} .star`);
    stars.forEach((s, i) => {
        s.classList.remove('hovered');
        s.classList.toggle('filled', i < val);
    });
}

// ===== CRITÈRES =====
function setCritere(profId, critIdx, val) {
    if (evaluations[profId]) return;
    workingEvals[profId] = workingEvals[profId] || { note: 0, criteres: [0,0,0], commentaire: '' };
    workingEvals[profId].criteres[critIdx] = val;
    renderCritere(profId, critIdx, val);
}
function hoverCritere(profId, critIdx, val) {
    if (evaluations[profId]) return;
    const stars = document.querySelectorAll(`#crit-${profId}-${critIdx} .star`);
    stars.forEach((s, i) => {
        s.classList.toggle('hovered', i < val);
        s.classList.remove('filled');
    });
}
function unhoverCritere(profId, critIdx) {
    if (evaluations[profId]) return;
    const current = (workingEvals[profId]?.criteres || [])[critIdx] || 0;
    renderCritere(profId, critIdx, current);
}
function renderCritere(profId, critIdx, val) {
    const stars = document.querySelectorAll(`#crit-${profId}-${critIdx} .star`);
    stars.forEach((s, i) => {
        s.classList.remove('hovered');
        s.classList.toggle('filled', i < val);
    });
}

// ===== SOUMISSION =====
function soumettrEval(profId) {
    const w = workingEvals[profId] || {};
    if (!w.note || w.note === 0) {
        alert("Veuillez donner au moins une note globale (étoiles).");
        return;
    }
    w.commentaire = document.getElementById(`comment-${profId}`).value.trim();
    evaluations[profId] = { ...w, date: new Date().toLocaleDateString('fr-FR') };
    localStorage.setItem('esp_evaluations', JSON.stringify(evaluations));

    // Mettre à jour le bouton et textarea
    const btn = document.getElementById(`btn-${profId}`);
    btn.textContent = '✓ Évaluation enregistrée';
    btn.disabled = true;
    document.getElementById(`comment-${profId}`).disabled = true;

    updateSummary();
}

// ===== RÉSUMÉ =====
function updateSummary() {
    const total = profs.length;
    const evalCount = Object.keys(evaluations).length;
    const moyennes = Object.values(evaluations).map(e => e.note);
    const moy = moyennes.length > 0 ? (moyennes.reduce((a,b) => a+b, 0) / moyennes.length).toFixed(1) : '—';
    const stars = moyennes.length > 0 ? '★'.repeat(Math.round(parseFloat(moy))) + '☆'.repeat(5 - Math.round(parseFloat(moy))) : '☆☆☆☆☆';

    document.getElementById('evalCount').textContent = evalCount;
    document.getElementById('evalTotal').textContent = '/ ' + total + ' profs';
    document.getElementById('evalMoy').textContent = moy === '—' ? '—' : moy + '/5';
    document.getElementById('evalStars').textContent = moyennes.length > 0 ? stars : '';
}

// ===== UTILITAIRE =====
function noteLabel(n) {
    if (n >= 5) return 'Excellent';
    if (n >= 4) return 'Très bien';
    if (n >= 3) return 'Bien';
    if (n >= 2) return 'Passable';
    return 'Insuffisant';
}
