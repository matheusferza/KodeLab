# KodeLab

KodeLab é uma plataforma de estudos interativa para aprender programação de forma visual e prática. A proposta é transformar conteúdo teórico em experiências de aula, laboratórios manipuláveis, desafios e feedback em tempo real.

## Sobre o projeto

O KodeLab nasceu como um projeto educacional para tornar o estudo de programação mais dinâmico, visual e acessível. A ideia é substituir a experiência passiva de apenas ler materiais por uma jornada em que o aluno aprende, testa, modifica atributos e enxerga o resultado imediatamente na tela.

A plataforma foi pensada com uma proposta institucional, como um ambiente de faculdade de tecnologia: há um campus digital, trilhas de estudo, laboratórios práticos, área do aluno e acompanhamento de progresso. O objetivo é ajudar iniciantes a entenderem, na prática, como HTML, CSS, JavaScript, IA e ferramentas modernas como React, Vite e Node trabalham juntas na criação de aplicações web.

## Visão

Em vez de estudar apenas por PDFs ou apostilas estáticas, o aluno segue um fluxo guiado:

```text
Aula -> Conceito -> Exemplo -> Interação -> Desafio -> Feedback
```

O MVP usa a metáfora de um carro/site:

- HTML como estrutura
- CSS como aparência
- JavaScript como comportamento
- IA como apoio ao aprendizado
- React, Vite e Node como stack moderna do projeto

## Como abrir

Instale as dependências e rode o servidor local:

```bash
npm install
npm run dev
```

Depois abra `http://127.0.0.1:5173/`.

O progresso fica salvo no `localStorage`.

## Funcionalidades

- Campus institucional com navegação por áreas
- Aula interativa "Como um site funciona"
- Laboratório HTML com blocos adicionáveis e preview
- Playground CSS com sliders em tempo real
- Simulador JavaScript com `if/else`
- Gerador de prompt de IA simulado
- Área do aluno com progresso salvo localmente
- Badges, checklist de portfólio e diário de estudo
- Módulo de estudo para React, Vite e Node
- Deploy automatizado para GitHub Pages via GitHub Actions

## Stack

- React
- Vite
- Node.js
- CSS responsivo
- LocalStorage

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run check
```

## Estrutura

```text
.github/workflows/
  deploy.yml
src/
  main.jsx
  styles.css
public/
  favicon.svg
vite.config.js
```

## Deploy

O projeto está configurado para GitHub Pages com base `/KodeLab/`. A cada push na branch `main`, o workflow `Deploy KodeLab` instala dependências, gera o build e publica a pasta `dist`.

## Próximos passos

- Separar componentes em arquivos menores
- Adicionar rotas reais
- Adicionar login e banco de dados
- Salvar histórico de exercícios
- Conectar uma API de IA
- Criar mais módulos interativos
