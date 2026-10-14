/* Sorteio "tirar no rei" — baralho espanhol de 40 cartas, sem reposição. */
(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const ranks = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  const suits = [
    {name: "ESPADAS", sign: "♠", red: false},
    {name: "BASTOS", sign: "♣", red: false},
    {name: "OUROS", sign: "♦", red: true},
    {name: "COPAS", sign: "♥", red: true}
  ];
  const dialog = $("#drawDialog");
  const button = $("#drawStart");
  const total = $("#drawCount");
  const kingCount = $("#drawKingCount");
  const progress = $("#drawMeter");
  const announcer = $("#drawNarration");
  const seats = $("#drawPlayers");
  const resultArea = $("#drawResults");
  const cardSpot = $("#drawDeck");
  const table = $("#drawTable");
  const skip = $("#drawSkip");
  const accept = $("#drawAccept");
  const retry = $("#drawRetry");
  const cancel = $("#drawCancel");
  const status = $("#drawStatus");
  let token = 0;
  let outcome = null;
  let currentNames = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Rejection sampling removes modulo bias from random 32-bit integers.
  function randomBelow(max) {
    if (!window.crypto || !window.crypto.getRandomValues) {
      throw new Error("Sorteio seguro indisponível neste navegador.");
    }
    const size = 4294967296;
    const ceiling = Math.floor(size / max) * max;
    const values = new Uint32Array(1);
    let value;
    do {
      window.crypto.getRandomValues(values);
      value = values[0];
    } while (value >= ceiling);
    return value % max;
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = randomBelow(i + 1);
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function makeDraw(names) {
    if (names.length !== 4 && names.length !== 6) {
      throw new Error("É preciso ter quatro ou seis jogadores.");
    }
    const targetKings = names.length / 2;
    const deck = shuffle(suits.flatMap((suit) =>
      ranks.map((rank) => ({rank, suit}))
    ));
    // Ordem dos assentos também aleatória: evita vantagem para Jogador 1.
    const seatOrder = shuffle(names.map((_, index) => index));
    const remaining = new Set(seatOrder);
    const steps = [];
    const kings = [];
    let turn = 0;
    for (const card of deck) {
      if (kings.length === targetKings) break;
      while (!remaining.has(seatOrder[turn % names.length])) turn++;
      const player = seatOrder[turn % names.length];
      const isKing = card.rank === 12;
      steps.push({player, card, isKing, kingNumber: isKing ? kings.length + 1 : 0});
      if (isKing) {
        kings.push(player);
        // Quem achou um rei sai da distribuição; ninguém recebe dois reis.
        remaining.delete(player);
      }
      turn++;
    }
    if (kings.length !== targetKings) throw new Error("Não foi possível completar o sorteio dos reis.");
    // Os primeiros 2 (ou 3) que tiram rei jogam contra todos os demais.
    const teams = [kings.slice(), names.map((_, index) => index).filter((index) => !kings.includes(index))];
    teams.forEach((members) => members.sort((a, b) => a - b));
    if (new Set(teams.flat()).size !== names.length ||
        teams.some((members) => members.length !== names.length / 2)) {
      throw new Error("Formação de equipes inválida.");
    }
    return {steps, teams, kings, targetKings, cardsDealt: steps.length};
  }

  function readNames() {
    const inputs = [...document.querySelectorAll("#teamSetup .player-name")];
    return inputs.map((input, index) => input.value.trim() || input.defaultValue || "Jogador " + (index + 1));
  }

  function updateAvailability() {
    const enabled = document.querySelectorAll("#teamSetup .player-name").length > 2;
    $("#drawPanel").hidden = !enabled;
    if (!enabled) status.textContent = "";
  }

  document.querySelectorAll("[data-count]").forEach((option) => {
    option.addEventListener("click", () => {
      updateAvailability();
      status.textContent = "";
    });
  });
  updateAvailability();

  function personCard(name, index) {
    const node = document.createElement("div");
    node.className = "draw-person";
    node.dataset.player = index;
    const title = document.createElement("span");
    title.className = "draw-person-name";
    title.textContent = name;
    const cards = document.createElement("div");
    cards.className = "draw-person-stack";
    cards.innerHTML = '<span class="draw-mini-back">♠</span><span class="draw-person-total">0 cartas</span>';
    const badge = document.createElement("div");
    badge.className = "draw-person-badge";
    badge.textContent = "À espera do rei";
    node.append(title, cards, badge);
    return node;
  }

  function resetStage() {
    seats.replaceChildren(...currentNames.map(personCard));
    resultArea.classList.add("hidden");
    resultArea.replaceChildren();
    seats.classList.remove("hidden");
    table.classList.remove("hidden");
    total.textContent = "0 / 40 CARTAS";
    kingCount.textContent = "0 / " + outcome.targetKings + " REIS";
    progress.style.width = "0%";
    announcer.textContent = "Baralho embaralhado. Distribuindo as cartas...";
    accept.classList.add("hidden");
    retry.classList.add("hidden");
    skip.classList.remove("hidden");
    cardSpot.classList.remove("draw-deck-finished");
  }

  function revealCard(step, index, length) {
    const seat = seats.querySelector('[data-player="' + step.player + '"]');
    const dealt = seat.querySelector(".draw-person-total");
    const count = Number(seat.dataset.dealt || "0") + 1;
    seat.dataset.dealt = count;
    dealt.textContent = count + (count === 1 ? " carta" : " cartas");
    seat.classList.remove("draw-receiving");
    void seat.offsetWidth;
    seat.classList.add("draw-receiving");
    total.textContent = (index + 1) + " / 40 CARTAS";
    progress.style.width = ((index + 1) / 40 * 100) + "%";
    if (step.isKing) {
      seat.classList.add("draw-king-seat");
      const badge = seat.querySelector(".draw-person-badge");
      badge.textContent = "♛ REI DE " + step.card.suit.name + " · TIME 1";
      badge.classList.add("draw-found-king");
      kingCount.textContent = step.kingNumber + " / " + outcome.targetKings + " REIS";
      announcer.textContent = "♛ " + currentNames[step.player] + " tirou REI DE " + step.card.suit.name + "!";
      const face = document.createElement("div");
      face.className = "draw-king-face" + (step.card.suit.red ? " draw-red" : "");
      face.innerHTML = '<span>12</span><strong>' + step.card.suit.sign + '</strong><small>REI</small>';
      seat.append(face);
      seat.classList.add("draw-king-burst");
      setTimeout(() => seat.classList.remove("draw-king-burst"), 750);
    } else if (index === 0 || (index + 1) % 5 === 0) {
      announcer.textContent = "Distribuindo... " + (index + 1) + " cartas na mesa.";
    }
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function throwCard(step, index, myToken) {
    const recipient = seats.querySelector('[data-player="' + step.player + '"]');
    if (!recipient) return;
    if (reduceMotion.matches) return;
    const deckRect = cardSpot.getBoundingClientRect();
    const seatRect = recipient.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const flyer = document.createElement("div");
    flyer.className = "draw-flyer";
    flyer.textContent = "♠";
    flyer.style.left = (deckRect.left - tableRect.left + deckRect.width / 2 - 21) + "px";
    flyer.style.top = (deckRect.top - tableRect.top + deckRect.height / 2 - 30) + "px";
    table.append(flyer);
    const dx = seatRect.left + seatRect.width / 2 - deckRect.left - deckRect.width / 2;
    const dy = seatRect.top + seatRect.height / 2 - deckRect.top - deckRect.height / 2;
    const animation = flyer.animate([
      {transform: "translate(0,0) rotate(-14deg) scale(1)", opacity: 1},
      {transform: "translate(" + dx + "px," + dy + "px) rotate(7deg) scale(.62)", opacity: 1}
    ], {duration: step.isKing ? 225 : 105, easing: "cubic-bezier(.17,.68,.22,1)", fill: "forwards"});
    try { await animation.finished; } catch (_) { /* diálogo fechado */ }
    flyer.remove();
    if (myToken !== token) return;
  }

  function showResult() {
    if (!outcome || !dialog.open) return;
    table.querySelectorAll(".draw-flyer").forEach((card) => card.remove());
    table.classList.add("hidden");
    resultArea.replaceChildren();
    const subtitle = document.createElement("p");
    subtitle.className = "draw-result-kicker";
    subtitle.textContent = "✦ OS REIS DECIDIRAM ✦";
    resultArea.append(subtitle);
    const columns = document.createElement("div");
    columns.className = "draw-result-columns";
    outcome.teams.forEach((members, i) => {
      const section = document.createElement("section");
      section.className = "draw-result-team";
      const heading = document.createElement("h3");
      heading.textContent = "TIME " + (i + 1);
      section.append(heading);
      members.forEach((p) => {
        const item = document.createElement("div");
        item.className = "draw-result-member";
        const crown = outcome.kings.includes(p) ? "♛ " : "✦ ";
        item.textContent = crown + currentNames[p];
        section.append(item);
      });
      columns.append(section);
    });
    resultArea.append(columns);
    const note = document.createElement("p");
    note.className = "draw-result-note";
    note.textContent = "Quem tirou rei joga no Time 1. Quem não tirou fica no Time 2.";
    resultArea.append(note);
    resultArea.classList.remove("hidden");
    announcer.textContent = outcome.targetKings + " reis encontrados em " + outcome.cardsDealt + " cartas. Sorteio encerrado!";
    progress.style.width = "100%";
    total.textContent = outcome.cardsDealt + " / 40 CARTAS";
    kingCount.textContent = outcome.targetKings + " / " + outcome.targetKings + " REIS";
    cardSpot.classList.add("draw-deck-finished");
    skip.classList.add("hidden");
    retry.classList.remove("hidden");
    accept.classList.remove("hidden");
    accept.focus();
  }

  async function animate(myToken) {
    for (let i = 0; i < outcome.steps.length; i++) {
      if (myToken !== token || !dialog.open) return;
      const step = outcome.steps[i];
      await throwCard(step, i, myToken);
      if (myToken !== token || !dialog.open) return;
      revealCard(step, i, outcome.steps.length);
      await wait(step.isKing ? 600 : 58);
    }
    if (myToken === token) showResult();
  }

  function begin() {
    const myToken = ++token;
    currentNames = readNames();
    try {
      outcome = makeDraw(currentNames);
    } catch (error) {
      outcome = null;
      announcer.textContent = error.message;
      skip.classList.add("hidden");
      return;
    }
    resetStage();
    if (!dialog.open) dialog.showModal();
    if (reduceMotion.matches) showResult();
    else animate(myToken);
  }

  button.addEventListener("click", begin);
  retry.addEventListener("click", begin);
  skip.addEventListener("click", () => {
    token++;
    showResult();
  });
  function abort() {
    token++;
    outcome = null;
    table.querySelectorAll(".draw-flyer").forEach((card) => card.remove());
  }
  cancel.addEventListener("click", () => dialog.close());
  $("#drawClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", abort);

  accept.addEventListener("click", () => {
    if (!outcome) return;
    const inputs = [...document.querySelectorAll("#teamSetup .player-name")];
    if (inputs.length !== currentNames.length) return;
    // Aplicamos somente depois da confirmação: cancelar não muda os times.
    for (let team = 0; team < 2; team++) {
      const positions = inputs.filter((input) => Number(input.dataset.team) === team);
      outcome.teams[team].forEach((player, position) => {
        positions[position].value = currentNames[player];
      });
    }
    const teamNames = outcome.teams.map((members) => members.map((index) => currentNames[index]).join(" + "));
    status.textContent = "♛ Sorteio aplicado! Time 1: " + teamNames[0] + " · Time 2: " + teamNames[1] + ". Você ainda pode editar os nomes.";
    $("#drawPanel").classList.remove("draw-applied");
    void $("#drawPanel").offsetWidth;
    $("#drawPanel").classList.add("draw-applied");
    dialog.close();
  });
})();
