# Identidade visual — Fogo de Chão (v2.4.1)

## Conceito
O app é um objeto de galpão, não um painel de administração. Tábua queimada, couro curtido, pátina de ferro, papel envelhecido, erva-mate e fogo de chão. O visual deve ter textura e peso, mas os dados do jogo permanecem os mais fáceis de ler.

## Paleta
| Material | Hex | Uso |
| --- | --- | --- |
| Fuligem | \`#140d0a\` | ambiente |
| Madeira funda | \`#28170e\` | molduras |
| Madeira | \`#50301c\` | base de painéis e botões |
| Madeira clara | \`#77502c\` | fibras, relevo |
| Couro / cobre | \`#ad6637\` | bordas, reforço |
| Latão | \`#cda46a\` | gravação, pregos |
| Brasa | \`#e57834\` | ações fortes |
| Fogo | \`#ffbf65\` | destaque vivo |
| Erva-mate | \`#708149\` | ajuda, ações secundárias |
| Erva escura | \`#37492f\` | botões mate |
| Papel envelhecido | \`#ead7b1\` | conteúdo e textos |

## Componentes
- **Letreiro do galpão:** madeira e selo original em SVG de cuia e bomba, gravado na placa.
- **Botões:** madeira entalhada, pregos de latão, resposta ao toque por depressão e realce de borda.
- **Cena de fogo de chão:** SVG vetorial autoral, fogueira, toras, halo e cinco brasas animadas com transform/opacity; sem vídeo ou imagem remota.
- **Placar:** painel como mesa de madeira, time 1 em brasa, time 2 em erva-mate, tentos talhados e feedback já existente.
- **Configuração:** placas individuais e controles de escolha evidentes.
- **Histórico e modal de regras:** papel/couro e texto legível.
- **Modal Tirar no Rei:** preservado funcionalmente e visualmente.

## Performance e acessibilidade
- Respeitar \`prefers-reduced-motion\` e pausa em aba oculta.
- Botão persistente **Brasas acesas/apagadas** no rodapé, salvo em \`localStorage\`; não afeta sons nem pontuação.
- Usar \`transform\` e \`opacity\` nas chamas e partículas.
- Garantir botões adequados a touch, foco visível e cores legíveis.
- CSS principal em \`galpao.css\`; comportamentos adicionais em \`galpao.js\`. Sem frameworks, sem dependências novas.

## Fontes de referência de UX
- [NN/g — Skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/)
- [web.dev — CSS animations](https://web.dev/articles/animations-guide)
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion/)
- [W3C — WCAG 2.2 Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)

## QA
Checar desktop, 390px, 360px e 320px; validar botões, modais, som opt-in, histórico/localStorage, efeitos e layout do Sorteio no Rei.
