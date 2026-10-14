# Placar do Galpão — Truco Gaudério

Placar mobile-first para partidas de **Truco Gaudério até 30 tentos**.

## Recursos
- **Identidade Galpão v2.4.0:** paleta fechada carvão, madeira tostada, couro, cobre, brasa, erva-mate e papel envelhecido; painéis com textura artesanal, botões de tábua e pregos, foco visível, fogo de chão animado e opção de movimento reduzido no sistema. O modal de Tirar no Rei preserva o visual original.
- **Como jogar (v2.3.0):** manual ilustrado responsivo no menu inicial e no placar, com regras de Truco, Envido, Real Envido, Falta Envido, Flor, Contra-Flor, Contra-Flor e o Resto, desempates, recusas, exemplos com cartas espanholas, consulta rápida e calculadora da Falta Envido com o placar atual.
- Partidas de 2, 4 ou 6 jogadores (1×1, 2×2 ou 3×3), com nomes e símbolos dos times editáveis
- Placar de 0 a 30
- Indicador **Ruins / Boas** na metade da partida
- Atalhos de pontuação: **Truco (+2), Retruco (+3), Vale 4 (+4)**
- Marcação manual de 1 a 10 tentos para Envido/Flor e combinações
- Desfazer, nova partida e histórico
- Persistência local no navegador
- Visual gaúcho inspirado em galpão, madeira, brasa e churrasco
- Responsivo para celular e desktop
- **Ordem das cartas (v2.2.1):** acesso pelo menu inicial e pela partida; ranking vertical de 14 faixas de força com as 40 cartas do baralho espanhol, naipes ilustrados, pips dos valores 1–7 e figuras simplificadas de sota, cavalo e rei.
- **Tirar no Rei (4 ou 6 jogadores):** sorteio animado dos times usando o baralho espanhol de 40 cartas, com quatro reis e opção de repetir ou pular a animação

App estático: HTML + CSS + JavaScript, sem backend.

## Regras consideradas
O guia documenta a variante **Truco Cego com ordem fixa das cartas**. O regulamento competitivo do MTG/RS (edição 2025 consultada) prevê partidas de **24 tentos** (12 ruins e 12 boas); este app é uma adaptação de **30 tentos (15+15)**, com placar manual. Na adaptação, Falta Envido = `30 − maior placar dos times`, e Contra-Flor e o Resto (duas Flores em disputa) = `6 + Falta`. Mesas e aplicativos podem divergir em múltiplas Flores ou critério de Falta: combinar antes de jogar. Fontes: [Regulamentos MTG/RS](https://www.mtg.org.br/regulamentos-do-mtg/), [Jogatina](https://www.jogatina.com/regras-como-jogar-truco-gauderio.html), [Truco Gaudério](https://trucogauderio.com.br/).

O placar usa a modalidade de 30 tentos e os valores de mão do Truco Gaudério/Argentino: Truco vale 2, Retruco 3 e Vale 4 vale 4. Envido/Flor podem variar conforme canto e situação, então há marcação manual de tentos.

## Sorteio de equipes — Tirar no Rei (v2.1.1)
- Usa **40 cartas**: quatro naipes (Espadas, Bastos, Ouros e Copas), com valores 1–7 e 10–12. Cada naipe contém um **rei (12)**.
- As cartas e a ordem de distribuição dos jogadores são embaralhadas por **Fisher–Yates** usando `crypto.getRandomValues()` e amostragem por rejeição, sem viés de módulo.
- A distribuição é **sem reposição**. Quem recebe um rei sai da distribuição e não recebe mais cartas nesta rodada.
- **4 jogadores:** o sorteio acaba assim que **duas pessoas diferentes** tirarem rei. Essas duas formam o Time 1, contra as duas que não tiraram rei (Time 2).
- **6 jogadores:** o sorteio acaba assim que **três pessoas diferentes** tirarem rei. Essas três formam o Time 1, contra as três que não tiraram rei (Time 2).
- A rodada termina imediatamente na carta que revela o último rei necessário, sem distribuir o restante do baralho.
- O resultado é calculado antes da animação: pular ou reduzir movimento não muda o sorteio. Os nomes no formulário só são reorganizados após **confirmar**; cancelar não altera nada.
- Funciona exclusivamente no navegador, sem APIs externas nem armazenamento adicional.

## Deploy
Deploy estático por GitHub Pages (workflow `.github/workflows/pages.yml`) e compatível também com a Vercel.

## Direção de arte v2.4.0

Paleta: carvão `#140d0a`, madeira tostada `#50301c`, madeira clara `#77502c`, cobre `#ad6637`, brasa `#e57834`, latão `#cda46a`, erva-mate `#708149`, papel `#ead7b1`. Tokens e materiais em `galpao.css`. Fogo de chão decorativo é CSS puro, sem imagens pesadas; `prefers-reduced-motion` desliga animações não essenciais. Placar, persistência, regras e sorteio não foram alterados.
