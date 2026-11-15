# Mapa dos Sintomas · protótipo navegável

Protótipo do app **Mapa dos Sintomas** (Draxora), para validar telas e fluxos no navegador.

- **Abrir:** `index.html` (no GitHub Pages, o endereço do repositório).
- **No computador:** a lista de telas fica à esquerda e o celular à direita.
- **No celular:** a tela ocupa o aparelho inteiro; o seletor no topo pula para qualquer tela.

## O que é e o que não é
- É um **protótipo**: os toques funcionam, mas **nada fica salvo**.
- Os dados são **de exemplo** (Marina, 27 anos, num domingo, 18/10/2026). Não há dados de pessoas reais.
- Não tem login de verdade, servidor nem notificação.

## Fluxos
- **Começar · login por usuário e proteção:** 01 Boas-vindas · entrar com Google, Apple ou e-mail, 02 Antes de começar · 1 de 2, 03 Seguro e na hora certa · 2 de 2, 04 Desbloqueio (digital ou PIN)
- **Hoje · as 3 saídas e o registro do dia:** 05 Hoje · 3 saídas, 06 Registrar meu dia, 07 Dia difícil · só o humor, 08 Registrado, 09 Corrigir ou apagar um dia, 10 Registro apagado · Desfazer, 11 Um sinal apareceu, 12 Estou em crise · meu plano, 13 Plano ainda não montado
- **Minha semana:** 14 Minha semana, 15 Primeira semana (vazio)
- **Consulta · a data e o relatório:** 16 Consulta · resumo em valores, 2 semanas, 17 Consulta · resumo em gráfico, 4 semanas, 18 Consulta sem data, 19 Página para o profissional (A4, 2 páginas)
- **Conta, plano de crise e pessoa próxima:** 20 Conta, 21 Excluir minha conta, 22 Montar meu plano de crise, 23 Alguém próximo · convite e permissões, 24 Modo apoio (Lúcia), 25 Lúcia registra a visão dela
- **Meus cuidados e módulos:** 26 Meus cuidados, 27 Bipolar · evolução e marcos, 28 Ansiedade · em manutenção, 29 Pergunta da semana, 30 Adicionar um cuidado, 31 Meus cuidados · nenhum ainda, 32 Borderline · uma crise passou, 33 TDAH · meu dia funcionou?
- **Design system:** 00 Design system

## Arquivos
- `*.html`: uma página por tela. `app.css`: o design system. `site.css`: ajustes só desta versão. `runtime.js`: o mini-motor que faz os toques funcionarem.
- As páginas são geradas a partir do canvas do protótipo. Não edite à mão: a próxima geração sobrescreve.

Material educativo. O app não faz diagnóstico e não substitui avaliação profissional. Em sofrimento intenso, ligue 188 (CVV). Emergência, 192.
