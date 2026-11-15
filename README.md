# Mapa dos Sintomas · protótipo navegável

Protótipo da **v1 de lançamento** do app **Mapa dos Sintomas** (Draxora), para validar telas e fluxos no navegador. É a base para o desenvolvimento do app (Flutter + backend).

- **Abrir:** `index.html` (no GitHub Pages, o endereço do repositório).
- **No computador:** a lista de telas fica à esquerda e o celular à direita.
- **No celular:** a tela ocupa o aparelho inteiro; o seletor no topo pula para qualquer tela.

## O que é e o que não é
- É um **protótipo**: os toques funcionam, mas **nada fica salvo**.
- Os dados são **de exemplo** (Marina, 27 anos, num domingo, 18/10/2026). Não há dados de pessoas reais.
- Não tem login de verdade, servidor nem notificação.

## Fluxos
- **1 · Entrar (conta e aceites):** 01 Boas-vindas · Google, Apple ou e-mail, 02 Antes de começar · aceites (LGPD), 03 Desbloqueio (se a pessoa ligar)
- **2 · Hoje: o registro do dia:** 04 Hoje · registrar o dia, 05 Ajuda na hora, 06 Dia salvo · vai para a Semana, 07 Corrigir ou apagar um dia, 08 Registro apagado · Desfazer, 09 Ajuda agora · 188 e 192
- **3 · Semana:** 10 Semana, 11 Semana anterior · avisos, 12 Primeira semana (vazio)
- **4 · Resumo para levar ao médico:** 13 Resumo · valores, 2 semanas, 14 Resumo · gráfico, 4 semanas, 15 Página para o profissional (A4)
- **5 · Conta:** 16 Conta, 17 Lembrete diário, 18 Pessoa próxima, 19 Convidar pelo WhatsApp, 20 Excluir minha conta, 32 Seu plano no lançamento (grátis)
- **6 · O app da pessoa próxima (Lúcia):** 21 Convite recebido, 22 Registrar o dia da Marina, 23 Registro salvo, 24 A semana da Marina, 25 Conta da Lúcia
- **7 · Estados: carregando, vazio, erro e sem internet:** 26 Carregando, 27 Salvo sem internet, 28 Resumo ainda vazio, 29 Erro ao entrar, 30 Convite vencido, 31 Acesso removido (app da Lúcia)
- **8 · Planos: Grátis, Pro e Pro Max (ligam na 1ª atualização):** 33 Planos e preços, 34 Recurso do Pro · aviso no Resumo, 35 Assinar · anual ou mensal, 36 Meu plano · Pro ativo, 37 Voltou ao Grátis, 38 Pro Max · até 3 pessoas próximas, 39 Pro Max · o que cada uma vê, 40 Pro Max · relatório completo
- **Design system:** 00 Design system

## Arquivos
- `*.html`: uma página por tela. `app.css`: o design system. `site.css`: ajustes só desta versão. `runtime.js`: o mini-motor que faz os toques funcionarem.
- As páginas são geradas a partir do canvas do protótipo. Não edite à mão: a próxima geração sobrescreve.

Material educativo. O app não faz diagnóstico e não substitui avaliação profissional. Em sofrimento intenso, ligue 188 (CVV). Emergência, 192.
