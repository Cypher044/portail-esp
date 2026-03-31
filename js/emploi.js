// ===== EMPLOI DU TEMPS =====
function buildTimetable() {
    const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
    const days = [
        { label: 'Lundi',    date: 'mars 30', today: false },
        { label: 'Mardi',    date: 'mars 31', today: true  },
        { label: 'Mercredi', date: 'avr. 1',  today: false },
        { label: 'Jeudi',    date: 'avr. 2',  today: false },
        { label: 'Vendredi', date: 'avr. 3',  today: false },
        { label: 'Samedi',   date: 'avr. 4',  today: false },
    ];

    const container = document.getElementById("ttContainer");
    let html = `<div class="tt-header" style="border-right:1px solid var(--border);"></div>`;
    days.forEach(d => {
        html += `<div class="tt-header${d.today ? ' today' : ''}">${d.label}<span class="dt">${d.date}</span></div>`;
    });
    hours.forEach(h => {
        html += `<div class="tt-time">${h}</div>`;
        for (let i = 0; i < 6; i++) html += `<div class="tt-cell"></div>`;
    });
    container.innerHTML = html;

    const coursData = [
        { cls: 'course-programming green',  title: 'Approfondissement Programmation',   prof: 'MOUHAMED DIOP',    room: 'DGI-SS-205' },
        { cls: 'course-archinet',            title: 'Archi. Réseaux sécurisés CM',       prof: 'Abdou Assane Diop',room: 'DGI-SS-205' },
        { cls: 'course-techsec purple',      title: 'Technologie de Sécurités TD',        prof: 'Doudou Fall',      room: 'DGI-SS-205' },
        { cls: 'course-radiocm',             title: 'Ingénierie Réseaux Radio CM',        prof: 'Moussa Diallo',    room: 'DGI-SS-205' },
        { cls: 'course-sdn-td green',        title: 'SDN/SDR/NFV TD',                    prof: 'Ousmane SADIO',    room: 'DGI-SS-205' },
        { cls: 'course-multimedia purple',   title: 'Multimédia Télécoms CM',             prof: 'MOUSTAPHA MBAYE',  room: 'DGI-SS-205' },
        { cls: 'course-projvendredi',        title: 'Gestion de Projets CM',              prof: 'Mamadou DIAHAME',  room: 'DGI-SS-205' },
        { cls: 'course-projsamedi green',    title: 'Gestion de Projets TD',              prof: 'Mamadou DIAHAME',  room: 'DGI-SS-205' },
        { cls: 'course-semistruct',          title: 'Données Semi-Structurées CM',        prof: 'Ibrahima Fall',    room: 'DGI-SS-205' },
        { cls: 'course-sva purple',          title: 'SVA CM',                             prof: 'Moussa Diallo',    room: 'DGI-SS-205' },
        { cls: 'course-sdn-cm',             title: 'SDN/SDR/NFV CM',                    prof: 'Ousmane SADIO',    room: 'DGI-SS-205' },
        { cls: 'course-admin-cm green',      title: 'Admin. Supervision Systèmes CM',     prof: 'Babacar Fall',     room: 'DGI-SS-205' },
        { cls: 'course-veille purple',       title: 'Veille Technologique CM',            prof: 'Doudou Fall',      room: 'DGI-SS-205' },
    ];

    coursData.forEach(c => {
        const div = document.createElement('div');
        div.className = `course-block ${c.cls}`;
        div.innerHTML = `
            <span class="cb-title">${c.title}</span>
            <span class="cb-prof">${c.prof}</span>
            <span class="cb-room">📍 ${c.room}</span>`;
        container.appendChild(div);
    });
}
