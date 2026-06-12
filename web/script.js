// BANCO DE DADOS EM MEMÓRIA (Mantendo os dados exatos do Print de exemplo)
let dadosQuartos = [
    { numero: "101", tipo: "Standard" },
    { numero: "102", tipo: "Luxo" },
    { numero: "201", tipo: "Suíte" },
    { numero: "202", tipo: "Standard" }
];

let dadosReservas = [
    { id: 1, quartoNumero: "101", hospede: "João Silva", entrada: "2024-06-10", saida: "2024-06-12" },
    { id: 2, quartoNumero: "101", hospede: "Maria Souza", entrada: "2024-06-15", saida: "2024-06-18" },
    { id: 3, quartoNumero: "101", hospede: "Pedro Santos", entrada: "2024-06-20", saida: "2024-06-22" }
];

// VARIÁVEIS DE CONTROLE ATUAL
let quartoSelecionado = null;
let itemParaExcluir = null;
let tipoExclusaoAtual = ""; // "quarto" ou "reserva"

// INICIALIZADOR PRINCIPAL
document.addEventListener("DOMContentLoaded", () => {
    renderizarQuartos();

    // Ouvintes para o envio dos formulários
    document.getElementById("form-quarto").addEventListener("submit", salvarNovoQuarto);
    document.getElementById("form-reserva").addEventListener("submit", salvarNovaReserva);
});

// ALTERNAR ENTRE TELAS
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');

    // Controla o menu lateral ativo
    const menuQuartos = document.getElementById("menu-quartos");
    if(screenId === 'tela-lista-quartos' || screenId === 'tela-cadastro-quarto') {
        menuQuartos.classList.add('active');
    } else {
        menuQuartos.classList.remove('active');
    }
}

// 1. CARREGAR TABELA DE QUARTOS
function renderizarQuartos() {
    const tbody = document.getElementById("quartos-table-body");
    tbody.innerHTML = "";

    dadosQuartos.forEach(quarto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${quarto.numero}</td>
            <td>${quarto.tipo}</td>
            <td class="text-right">
                <button class="btn btn-action-blue" onclick="abrirReservasDoQuarto('${quarto.numero}')">Ver Reservas</button>
                <button class="btn btn-action-danger" onclick="abrirModalExclusao('quarto', '${quarto.numero}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 2. SALVAR NOVO QUARTO
function salvarNovoQuarto(e) {
    e.preventDefault();
    const numero = document.getElementById("quarto-numero").value;
    const tipo = document.getElementById("quarto-tipo").value;

    if (dadosQuartos.some(q => q.numero === numero)) {
        alert("Este número de quarto já existe!");
        return;
    }

    dadosQuartos.push({ numero, tipo });
    renderizarQuartos();
    document.getElementById("form-quarto").reset();
    showScreen('tela-lista-quartos');
}

// 3. CARREGAR TABELA DE RESERVAS DO QUARTO SELECIONADO
function abrirReservasDoQuarto(numeroQuarto) {
    quartoSelecionado = dadosQuartos.find(q => q.numero === numeroQuarto);
    
    document.getElementById("label-num-quarto").innerText = quartoSelecionado.numero;
    document.getElementById("label-tipo-quarto").innerText = quartoSelecionado.tipo;
    document.getElementById("form-reserva-num-quarto").innerText = quartoSelecionado.numero;
    document.getElementById("form-reserva-tipo-quarto").innerText = quartoSelecionado.tipo;

    renderizarReservas();
    showScreen('tela-reservas-quarto');
}

function renderizarReservas() {
    const tbody = document.getElementById("reservas-table-body");
    tbody.innerHTML = "";

    const reservasFiltradas = dadosReservas.filter(r => r.quartoNumero === quartoSelecionado.numero);

    if (reservasFiltradas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #888;">Nenhuma reserva para este quarto.</td></tr>`;
        return;
    }

    reservasFiltradas.forEach(reserva => {
        // Formata as datas de AAAA-MM-DD para DD/MM/AAAA conforme está no print
        const dEntrada = reserva.entrada.includes('-') ? reserva.entrada.split('-').reverse().join('/') : reserva.entrada;
        const dSaida = reserva.saida.includes('-') ? reserva.saida.split('-').reverse().join('/') : reserva.saida;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${reserva.id}</td>
            <td>${reserva.hospede}</td>
            <td>${dEntrada}</td>
            <td>${dSaida}</td>
            <td class="text-right">
                <button class="btn btn-action-danger" onclick="abrirModalExclusao('reserva', ${reserva.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 4. SALVAR NOVA RESERVA
function salvarNovaReserva(e) {
    e.preventDefault();
    const hospede = document.getElementById("reserva-hospede").value;
    const entrada = document.getElementById("reserva-entrada").value;
    const saida = document.getElementById("reserva-saida").value;

    const proxId = dadosReservas.length > 0 ? Math.max(...dadosReservas.map(r => r.id)) + 1 : 1;

    dadosReservas.push({
        id: proxId,
        quartoNumero: quartoSelecionado.numero,
        hospede,
        entrada,
        saida
    });

    renderizarReservas();
    document.getElementById("form-reserva").reset();
    showScreen('tela-reservas-quarto');
}

// 5. CONTROLE DE MODAIS DE EXCLUSÃO (TELAS 5 E 6)
function abrirModalExclusao(tipo, id) {
    tipoExclusaoAtual = tipo;
    itemParaExcluir = id;

    if (tipo === 'quarto') {
        document.getElementById("modal-quarto-id-label").innerText = id;
        document.getElementById("modal-excluir-quarto").classList.remove("hidden");
    } else {
        document.getElementById("modal-excluir-reserva").classList.remove("hidden");
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

// ACOPLAMENTO DOS BOTÕES DE EXCLUSÃO INTERNA DOS MODAIS
document.getElementById("confirmar-exclusao-quarto-btn").addEventListener("click", () => {
    dadosQuartos = dadosQuartos.filter(q => q.numero !== itemParaExcluir);
    dadosReservas = dadosReservas.filter(r => r.quartoNumero !== itemParaExcluir); // Apaga as reservas vinculadas a ele
    
    renderizarQuartos();
    closeModal("modal-excluir-quarto");
});

document.getElementById("confirmar-exclusao-reserva-btn").addEventListener("click", () => {
    dadosReservas = dadosReservas.filter(r => r.id !== itemParaExcluir);
    
    renderizarReservas();
    closeModal("modal-excluir-reserva");
});