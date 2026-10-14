# Placar do Galpão — Truco Gaudério

Placar mobile-first para partidas de **Truco Gaudério até 30 tentos**.

## Recursos
- Partidas de 2, 4 ou 6 jogadores (1×1, 2×2 ou 3×3), com nomes e símbolos dos times editáveis
- Placar de 0 a 30
- Indicador **Ruins / Boas** na metade da partida
- Atalhos de pontuação: **Truco (+2), Retruco (+3), Vale 4 (+4)**
- Marcação manual de 1 a 10 tentos para Envido/Flor e combinações
- Desfazer, nova partida e histórico
- Persistência local no navegador
- Visual gaúcho inspirado em galpão, madeira, brasa e churrasco
- Responsivo para celular e desktop
- **Tirar no Rei (4 ou 6 jogadores):** sorteio animado dos times usando o baralho espanhol de 40 cartas, com quatro reis e opção de repetir ou pular a animação

App estático: HTML + CSS + JavaScript, sem backend.

## Regras consideradas
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
Preparado para deploy estático na Vercel.
