(function trucoRulesModule() {
  "use strict";
  const dialog=document.getElementById("rulesDialog");
  const pagesNode=document.getElementById("rulesPages");
  const navNode=document.getElementById("rulesTabs");
  if(!dialog||!pagesNode||!navNode)return;
  const C=(value,suit,brava=false)=>renderSpanishCard(value,suit,brava);
  const hand=(cards)=>'<div class="rg-hand">'+cards.map(([value,suit])=>C(value,suit)).join("")+'</div>';
  const chip=(number,label)=>'<div class="rg-token"><strong>'+number+'</strong><small>'+label+'</small></div>';
  const blocks=[
    {
      id:"inicio",symbol:"🧉",label:"Começar",
      body:`
        <div class="rg-hero">
          <span class="rg-kicker">MANUAL DO GALPÃO · TRUCO CEGO</span>
          <h3>O truco que se joga <em>no grito e na esperteza!</em></h3>
          <p>É baralho espanhol, estratégia, blefe e bons parceiros. Aprende as cantadas e não deixa ninguém te passar a perna.</p>
          <div class="rg-hero-stats">${chip("40","CARTAS")}${chip("3","POR JOGADOR")}${chip("30","TENTOS")}</div>
        </div>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🎯</span><div><small>OBJETIVO</small><h3>Primeiro a 30 ganha a peleia</h3></div></div>
          <div class="rg-halves"><div class="rg-half rg-half-ruins"><span>0 — 14 TENTOS</span><b>RUINS</b><small>Primeira metade</small></div><div class="rg-halves-divider">➜</div><div class="rg-half rg-half-boas"><span>15 — 29 TENTOS</span><b>BOAS</b><small>Reta final</small></div></div>
          <p>No nosso placar a partida termina ao chegar a 30 tentos: ao completar 15 a equipe entra nas boas. Há mesas que jogam a 24 (12 ruins + 12 boas), inclusive torneios do MTG; aqui adotamos <strong>30 como regra da casa</strong>.</p>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🃏</span><div><small>PASSO A PASSO</small><h3>Como acontece uma mão</h3></div></div>
          <div class="rg-timeline">
            <div class="rg-step"><span>01</span><div><b>Distribui três cartas</b><p>Para cada jogador, usando 40 cartas espanholas (1–7, 10, 11 e 12 dos quatro naipes).</p></div></div>
            <div class="rg-step"><span>02</span><div><b>Abrem-se os cantos</b><p>No início da mão pode entrar o Envido; quem tem Flor deve anunciá-la. A disputa da Flor prevalece sobre o Envido.</p></div></div>
            <div class="rg-step"><span>03</span><div><b>Joga-se até três vazas</b><p>Cada pessoa baixa uma carta por vaza. A carta mais forte vence; normalmente, quem fizer duas vazas leva a mão.</p></div></div>
            <div class="rg-step"><span>04</span><div><b>Anota os tentos</b><p>A mão vale 1 tento se ninguém pedir Truco. Envido e Flor são disputas separadas, com seus próprios pontos.</p></div></div>
          </div>
        </section>
        <section class="rg-card rg-wide-card">
          <div class="rg-heading"><span class="rg-icon">🤠</span><div><small>FORMATO</small><h3>Quem joga com quem?</h3></div></div>
          <div class="rg-three"><div><b>2 pessoas</b><small>1 × 1</small></div><div><b>4 pessoas</b><small>2 × 2</small></div><div><b>6 pessoas</b><small>3 × 3</small></div></div>
          <p>Em duplas ou trios, as cartas dos parceiros disputam contra as do outro time; <strong>o ponto de Envido/Flor não é a soma das mãos dos companheiros</strong>, mas a melhor combinação individual, salvo a contagem de várias Flores cantadas.</p>
          <button type="button" class="rg-inline-button" data-rg-open-cards>🃏 Ver a ordem das 40 cartas ↗</button>
        </section>`
    },
    {
      id:"truco",symbol:"🔥",label:"Truco",
      body:`
        <div class="rg-section-intro"><span class="rg-kicker">01 · DISPUTA DAS VAZAS</span><h3>TRUCO! RETRUCO! VALE QUATRO!</h3><p>O Truco aumenta o valor da <strong>mão</strong>, não dos pontos do Envido ou da Flor. Aposta-se para ganhar ou para botar pressão.</p></div>
        <section class="rg-card">
          <div class="rg-call-ladder">
            <div><span>MÃO NORMAL</span><b>1</b><small>tento</small></div><i>➜</i>
            <div><span>TRUCO</span><b>2</b><small>tentos</small></div><i>➜</i>
            <div><span>RETRUCO</span><b>3</b><small>tentos</small></div><i>➜</i>
            <div><span>VALE 4</span><b>4</b><small>tentos</small></div>
          </div>
          <div class="rg-heading"><span class="rg-icon">✋</span><div><small>ACEITAR OU CORRER</small><h3>Quem foge paga a aposta anterior</h3></div></div>
          <div class="rg-table-wrap"><table class="rg-table"><thead><tr><th>Canto</th><th>Quero (vence)</th><th>Não quero</th></tr></thead><tbody>
            <tr><td>Truco</td><td><b>2</b></td><td><b>1</b> ao outro time</td></tr>
            <tr><td>Retruco</td><td><b>3</b></td><td><b>2</b> ao outro time</td></tr>
            <tr><td>Vale 4</td><td><b>4</b></td><td><b>3</b> ao outro time</td></tr>
          </tbody></table></div>
          <div class="rg-story"><b>🎭 EXEMPLO DE MESA</b><p>Tu canta <strong>TRUCO</strong>. O adversário diz <strong>NÃO QUERO</strong>. Teu time recebe <strong>1 tento</strong>, não 2. Se aceitar, quem ganhar a mão leva <strong>2</strong>.</p></div>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🔁</span><div><small>ORDEM DOS CANTOS</small><h3>Como aumentar de novo?</h3></div></div>
          <p>Depois de um Truco aceito, <strong>o outro time</strong> pode responder com Retruco; quem recebeu e aceitou o Retruco pode ouvir um Vale 4 do lado oposto. Não vale pular degraus nem aumentar a própria aposta.</p>
          <p>Se a mão terminar sem nenhum pedido, vale <strong>1 tento</strong>. As vazas podem ser decididas em duas rodadas ou chegar à terceira.</p>
        </section>`
    },
    {
      id:"envido",symbol:"🪙",label:"Envido",
      body:`
        <div class="rg-section-intro"><span class="rg-kicker">02 · APOSTA DE PONTOS DAS CARTAS</span><h3>ENVIDO, REAL E FALTA</h3><p>O Envido é uma disputa paralela ao Truco. Vale a <strong>combinação numérica das cartas de cada pessoa</strong>, e não a força delas nas vazas.</p></div>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🧮</span><div><small>COMO CONTAR</small><h3>Duas do mesmo naipe? Soma 20!</h3></div></div>
          <p>Escolhe as duas cartas de mesmo naipe com a melhor soma. As cartas 1–7 valem seu número; <strong>10, 11 e 12 valem zero</strong> no Envido.</p>
          ${hand([[7,"ouros"],[6,"ouros"],[3,"copas"]])}
          <div class="rg-equation"><span>20<small>mesmo naipe</small></span><i>+</i><span>7<small>ouros</small></span><i>+</i><span>6<small>ouros</small></span><i>=</i><strong>33<small>máximo!</small></strong></div>
          <div class="rg-story"><b>SEM PAR DO MESMO NAIPE?</b><p>Conta só a maior carta numérica da mão. Exemplo: 7 de Espadas, 5 de Bastos e 2 de Copas = <strong>7 pontos</strong>.</p></div>
          <p>Se houver duas figuras do mesmo naipe, por exemplo 11 e 12, elas dão <strong>20 pontos</strong> (20 + 0 + 0).</p>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">📣</span><div><small>QUANDO E QUANTO</small><h3>As apostas do Envido</h3></div></div>
          <p>O primeiro pedido acontece no começo da <strong>primeira vaza</strong>, antes de quem pede jogar sua primeira carta. Revides e ordem das falas seguem a modalidade da mesa.</p>
          <div class="rg-table-wrap"><table class="rg-table"><thead><tr><th>Sequência</th><th>Se aceita</th><th>Se recusa</th></tr></thead><tbody>
            <tr><td>Envido</td><td><b>2</b></td><td>1</td></tr>
            <tr><td>Real Envido (sozinho)</td><td><b>3</b></td><td>1</td></tr>
            <tr><td>Envido + Envido</td><td><b>4</b></td><td>2</td></tr>
            <tr><td>Envido + Real Envido</td><td><b>5</b></td><td>2</td></tr>
            <tr><td>Envido + Envido + Real Envido</td><td><b>7</b></td><td>4</td></tr>
            <tr><td>Falta Envido (sozinho)</td><td><b>falta</b></td><td>1</td></tr>
            <tr><td>Envido + Real + Falta</td><td><b>falta</b></td><td>5</td></tr>
          </tbody></table></div>
          <p class="rg-fine">A recusa dá à equipe que fez o último canto os tentos já aceitos na sequência anterior; por isso o “não quero” não vale sempre 1.</p>
          <div class="rg-story"><b>🗣 EXEMPLO DE REVIDE</b><p>Time A: <strong>ENVIDO!</strong> Time B: <strong>REAL ENVIDO!</strong> Se A disser <strong>QUERO</strong>, quem tiver mais pontos faz <strong>5 tentos</strong>. Se A disser <strong>NÃO QUERO</strong>, B recebe <strong>2 tentos</strong>.</p></div>
        </section>
        <section class="rg-card rg-calculator">
          <div class="rg-heading"><span class="rg-icon">🏁</span><div><small>CONTA INTERATIVA</small><h3>Quanto vale a Falta Envido?</h3></div></div>
          <p>Para a nossa versão a 30, o valor é <strong>30 menos os tentos de quem está na frente</strong> (o ponteiro). É o valor se o pedido for aceito; caso recusem, vale a sequência anterior.</p>
          <div class="rg-score-inputs"><label>TIME 1<input id="rulesScoreA" type="number" inputmode="numeric" min="0" max="29" value="18" aria-label="Tentos do Time 1"></label><span>×</span><label>TIME 2<input id="rulesScoreB" type="number" inputmode="numeric" min="0" max="29" value="26" aria-label="Tentos do Time 2"></label></div>
          <div class="rg-falta-result" aria-live="polite"><small>FALTA ENVIDO NESTE PLACAR</small><div><strong id="rulesFaltaValue">4</strong><span>TENTOS</span></div><p id="rulesFaltaFormula">30 − 26 (ponteiro) = 4</p></div>
          <p class="rg-fine">Algumas mesas usam outro critério quando estão nas ruins. Combinem antes de jogar. O cálculo acima segue a falta do ponteiro até os 30.</p>
        </section>
        <section class="rg-card"><div class="rg-heading"><span class="rg-icon">🤝</span><div><small>EMPATE</small><h3>Se der a mesma pontuação...</h3></div></div><p>Ganha quem tem a preferência de <strong>mão</strong>, isto é, a pessoa que veio primeiro na ordem da jogada. Em duplas e trios, vence o melhor Envido individual do time, respeitando a ordem para desempatar.</p><p><strong>Flor cancela Envido</strong> naquela mão: se houver Flor cantada, ela tem prioridade.</p></section>`
    },
    {
      id:"flor",symbol:"🌺",label:"Flor",
      body:`
        <div class="rg-section-intro"><span class="rg-kicker">03 · TRÊS CARTAS DO MESMO NAIPE</span><h3>FLOR! CONTRA-FLOR! E O RESTO!</h3><p>A Flor aparece quando alguém recebe <strong>três cartas do mesmo naipe</strong>. Na tradição do Truco Cego, quem tem Flor deve cantá-la antes de prosseguir com os pontos.</p></div>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🌷</span><div><small>RECONHEÇA UMA FLOR</small><h3>Três iguais no naipe</h3></div></div>
          ${hand([[7,"copas"],[6,"copas"],[5,"copas"]])}
          <div class="rg-equation"><span>20<small>flor</small></span><i>+</i><span>7</span><i>+</i><span>6</span><i>+</i><span>5</span><i>=</i><strong>38<small>máximo!</small></strong></div>
          <p>Para comparar duas Flores: 20 + o valor das <strong>três</strong> cartas; figuras (10, 11, 12) valem zero na conta. O máximo é <strong>38</strong> com 7, 6 e 5 do mesmo naipe.</p>
          <div class="rg-story"><b>⚠️ FLOR MUDA O JOGO</b><p>A Flor tem prioridade sobre o Envido. <strong>Sem Flor adversária</strong>, quem cantou recebe <strong>3 tentos</strong> por Flor anunciada no seu time.</p></div>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">⚔️</span><div><small>QUANDO OS DOIS LADOS TÊM FLOR</small><h3>O desafio sobe!</h3></div></div>
          <div class="rg-flor-cards">
            <div class="rg-flor-card"><span>🌸 FLOR SIMPLES</span><strong>3</strong><small>por Flor sem contestação do outro lado</small></div>
            <div class="rg-flor-card"><span>🌼 FLOR × FLOR</span><strong>6</strong><small>duas Flores opostas disputadas</small></div>
            <div class="rg-flor-card"><span>🔥 CONTRA-FLOR</span><strong>6</strong><small>se aceita; se recusa: 4</small></div>
            <div class="rg-flor-card"><span>🏆 E O RESTO</span><strong>6 + FALTA</strong><small>se aceita, com duas Flores em disputa</small></div>
          </div>
          <div class="rg-table-wrap"><table class="rg-table"><thead><tr><th>Sequência</th><th>Quero</th><th>Me achico</th></tr></thead><tbody>
            <tr><td>Flor + Flor</td><td><b>6</b></td><td>depende das Flores cantadas</td></tr>
            <tr><td>Flor + Contra-Flor</td><td><b>6</b></td><td><b>4</b></td></tr>
            <tr><td>Flor + Contra-Flor e o Resto</td><td><b>6 + falta</b></td><td><b>4</b></td></tr>
            <tr><td>Flor + Contra-Flor + Contra-Flor e o Resto</td><td><b>6 + falta</b></td><td><b>6</b></td></tr>
          </tbody></table></div>
          <p class="rg-fine">“Resto” = o que falta ao time ponteiro para chegar a 30, na adaptação do nosso placar. Com mais de duas Flores, os tentos podem se acumular; a tabela mostra o caso básico de <strong>uma Flor por lado</strong>.</p>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">💬</span><div><small>RESPOSTAS</small><h3>O que significa “Me achico”?</h3></div></div>
          <p><strong>“Quero”</strong> aceita o desafio e compara os pontos das Flores. <strong>“Com Flor me achico”</strong> recusa o aumento e entrega os tentos de recusa conforme a sequência.</p>
          <p>Se houver <strong>várias Flores no mesmo time</strong>, elas podem somar 3 tentos por Flor cantada; com Flores dos dois lados, os pontos e recusas dependem das Flores efetivamente anunciadas. Para empate de valor, vale a preferência de <strong>mão</strong>.</p>
          <div class="rg-story"><b>👀 ATENÇÃO</b><p>Algumas plataformas usam regras próprias para aceitar múltiplas Flores ou encerrar a mão. Este guia segue a lógica tradicional do Truco Cego e apresenta exemplos simples para consulta rápida.</p></div>
        </section>`
    },
    {
      id:"empates",symbol:"🤝",label:"Empates",
      body:`
        <div class="rg-section-intro"><span class="rg-kicker">04 · PARDA E DESEMPATE</span><h3>EMPATOU? QUEM LEVA A MÃO?</h3><p>Empatar uma vaza é <strong>empardar</strong>. O resultado muda conforme a vaza em que aconteceu.</p></div>
        <section class="rg-card">
          <div class="rg-table-wrap"><table class="rg-table"><thead><tr><th>O que empatou?</th><th>Quem vence a mão?</th></tr></thead><tbody>
            <tr><td>1ª vaza</td><td>Quem ganhar a <b>2ª</b></td></tr>
            <tr><td>2ª vaza</td><td>Quem ganhou a <b>1ª</b></td></tr>
            <tr><td>1ª e 2ª</td><td>Quem ganhar a <b>3ª</b></td></tr>
            <tr><td>3ª vaza</td><td>Quem ganhou a <b>1ª</b></td></tr>
            <tr><td>As três vazas</td><td>O time que tem o <b>mão</b></td></tr>
          </tbody></table></div>
          <div class="rg-story"><b>🧉 EXEMPLO</b><p>A 1ª vaza empatou. Na 2ª, o time da cuia baixou a carta mais forte: <strong>ganhou a mão</strong>, sem precisar da 3ª.</p></div>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">📖</span><div><small>PALAVRAS DA CANCHA</small><h3>Pequeno dicionário do galpão</h3></div></div>
          <div class="rg-glossary">
            <div><b>Mão</b><p>Tanto o jogador com prioridade de saída quanto a disputa completa, conforme o contexto.</p></div>
            <div><b>Vaza</b><p>A rodada em que cada jogador põe uma carta na mesa.</p></div>
            <div><b>Empardar</b><p>Empatar as cartas mais fortes jogadas pelos dois lados.</p></div>
            <div><b>Ir ao baralho</b><p>Desistir da mão e entregar ao adversário o valor correspondente.</p></div>
            <div><b>Quero / Não quero</b><p>Aceitar ou recusar um desafio.</p></div>
            <div><b>Me achico</b><p>Recusar uma proposta na disputa de Flor.</p></div>
            <div><b>Tentos</b><p>Pontos anotados no placar.</p></div>
            <div><b>Pé</b><p>Posição do jogador que distribui as cartas na mão.</p></div>
          </div>
        </section>
        <section class="rg-card"><div class="rg-heading"><span class="rg-icon">🃏</span><div><small>FORÇA DAS CARTAS</small><h3>A carta mais forte ganha a vaza</h3></div></div><p>O baralho do nosso Truco Cego tem <strong>14 níveis de força</strong>. O Ás de Espadas é o mais forte; os quatros são os mais fracos.</p><button type="button" class="rg-inline-button" data-rg-open-cards>Ver todas as 40 cartas e seus níveis ↗</button></section>`
    },
    {
      id:"resumo",symbol:"📜",label:"Cola rápida",
      body:`
        <div class="rg-section-intro"><span class="rg-kicker">05 · CONSULTA DA PELEIA</span><h3>COLA DO GALPÃO</h3><p>Tabela resumida para tirar dúvidas no meio da partida. <strong>Não quero</strong> sempre depende do que já havia sido apostado.</p></div>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🔥</span><div><small>TRUCO</small><h3>Valor da mão</h3></div></div>
          <div class="rg-mini-values"><div><span>Normal</span><b>1</b></div><div><span>Truco</span><b>2</b></div><div><span>Retruco</span><b>3</b></div><div><span>Vale 4</span><b>4</b></div></div>
          <p><strong>Fugiu?</strong> Entrega 1 no Truco, 2 no Retruco e 3 no Vale 4.</p>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🪙</span><div><small>ENVIDO</small><h3>Valor da aposta</h3></div></div>
          <div class="rg-mini-values"><div><span>Envido</span><b>2</b></div><div><span>Real</span><b>3</b></div><div><span>Envido + Real</span><b>5</b></div><div><span>Falta</span><b>30 − líder</b></div></div>
          <p><strong>Recusou?</strong> Um canto isolado costuma dar 1; no revide, contam os tentos da proposta anterior já aceita.</p>
        </section>
        <section class="rg-card">
          <div class="rg-heading"><span class="rg-icon">🌺</span><div><small>FLOR</small><h3>Três do mesmo naipe</h3></div></div>
          <div class="rg-mini-values"><div><span>Simples</span><b>3</b></div><div><span>Flor × Flor</span><b>6</b></div><div><span>Contra-Flor</span><b>6</b></div><div><span>E o Resto</span><b>6 + falta</b></div></div>
          <p><strong>Sem Flor adversária?</strong> 3 por Flor. Com uma Contra-Flor recusada: 4 no caso básico; após revides, o valor pode ser maior.</p>
        </section>
        <section class="rg-card rg-disclaimer">
          <div class="rg-heading"><span class="rg-icon">📚</span><div><small>FONTES E COMBINADOS</small><h3>Qual regra estamos usando?</h3></div></div>
          <p>O aplicativo é um <strong>placar manual de Truco Cego a 30 tentos</strong>, com ordem fixa de cartas. O regulamento esportivo de Truco Cego do MTG/RS consultado (edição 2025) usa <strong>24 tentos</strong> (12 malos e 12 buenos), e o Truco de Amostra é outra modalidade.</p>
          <p>A <strong>Falta</strong> aqui corresponde aos tentos que faltam ao <strong>ponteiro</strong> até 30. Combinações de várias Flores, regras de torneio e diferenças regionais devem ser combinadas pelos jogadores antes da partida.</p>
          <div class="rg-sources">
            <a href="https://www.mtg.org.br/regulamentos-do-mtg/" target="_blank" rel="noopener noreferrer">↗ MTG/RS · Regulamentos (Truco Cego)</a>
            <a href="https://www.jogatina.com/regras-como-jogar-truco-gauderio.html" target="_blank" rel="noopener noreferrer">↗ Jogatina · Regras de Truco Gaudério</a>
            <a href="https://trucogauderio.com.br/" target="_blank" rel="noopener noreferrer">↗ Truco Gaudério · Como jogar</a>
          </div>
          <p class="rg-fine">O placar não analisa as cartas da mesa: quem joga decide quantos tentos venceu e os registra usando “Marcar pontos”.</p>
        </section>`
    }
  ];
  navNode.innerHTML=blocks.map((block,i)=>'<button type="button" role="tab" class="rg-tab" id="ruleTab-'+block.id+'" aria-controls="rulePanel-'+block.id+'" aria-selected="'+(i===0?"true":"false")+'" tabindex="'+(i===0?"0":"-1")+'" data-rg-tab="'+block.id+'"><span>'+block.symbol+'</span>'+block.label+'</button>').join("");
  pagesNode.innerHTML=blocks.map((block,i)=>'<div class="rg-page" role="tabpanel" id="rulePanel-'+block.id+'" aria-labelledby="ruleTab-'+block.id+'"'+(i?' hidden':'')+'>'+block.body+'</div>').join("");
  const tabButtons=Array.from(navNode.querySelectorAll(".rg-tab"));
  function selectTab(id,focus=false){
    blocks.forEach(block=>{
      const selected=block.id===id;
      const tab=document.getElementById("ruleTab-"+block.id);
      const page=document.getElementById("rulePanel-"+block.id);
      tab.setAttribute("aria-selected",selected?"true":"false");
      tab.tabIndex=selected?0:-1;
      page.hidden=!selected;
      if(selected&&focus)tab.focus();
    });
    pagesNode.scrollTop=0;
  }
  navNode.addEventListener("click",e=>{
    const tab=e.target.closest("[data-rg-tab]");
    if(tab)selectTab(tab.dataset.rgTab);
  });
  navNode.addEventListener("keydown",e=>{
    const current=tabButtons.indexOf(document.activeElement);
    if(current<0)return;
    let next;
    if(e.key==="ArrowRight")next=(current+1)%tabButtons.length;
    else if(e.key==="ArrowLeft")next=(current+tabButtons.length-1)%tabButtons.length;
    else if(e.key==="Home")next=0;
    else if(e.key==="End")next=tabButtons.length-1;
    else return;
    e.preventDefault();
    selectTab(tabButtons[next].dataset.rgTab,true);
  });
  pagesNode.addEventListener("click",e=>{
    if(e.target.closest("[data-rg-open-cards]")){
      dialog.close();
      document.getElementById("cardOrder").showModal();
    }
  });
  const inputA=document.getElementById("rulesScoreA");
  const inputB=document.getElementById("rulesScoreB");
  const result=document.getElementById("rulesFaltaValue");
  const formula=document.getElementById("rulesFaltaFormula");
  function validScore(input){
    const parsed=Number(input.value);
    if(!Number.isFinite(parsed))return 0;
    return Math.max(0,Math.min(29,Math.trunc(parsed)));
  }
  function updateFalta(){
    const a=validScore(inputA),b=validScore(inputB),lead=Math.max(a,b),falta=30-lead;
    result.textContent=String(falta);
    formula.textContent="30 − "+lead+" (ponteiro) = "+falta;
  }
  [inputA,inputB].forEach(input=>input.addEventListener("input",updateFalta));
  function openRules(){
    selectTab("inicio");
    if(typeof state!=="undefined"&&state&&Array.isArray(state.scores)&&!document.getElementById("game").classList.contains("hidden")){
      inputA.value=String(state.scores[0]);
      inputB.value=String(state.scores[1]);
    }else{
      inputA.value="18";
      inputB.value="26";
    }
    updateFalta();
    dialog.showModal();
  }
  document.getElementById("homeRules").addEventListener("click",openRules);
  document.getElementById("gameRules").addEventListener("click",openRules);
  document.getElementById("rulesClose").addEventListener("click",()=>dialog.close());
  document.getElementById("rulesCloseBottom").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
})();
