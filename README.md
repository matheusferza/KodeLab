# KodeLab

KodeLab é uma plataforma de estudos interativa para aprender programação de forma visual e prática. A proposta é transformar conteúdo teórico em experiências de aula, laboratórios manipuláveis, desafios e feedback em tempo real.

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
- Módulo de estudo para React, Vite e Node

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
```

## Estrutura

```text
src/
  main.jsx
  styles.css
public/
  favicon.svg
```

## Próximos passos

- Separar componentes em arquivos menores
- Adicionar rotas reais
- Adicionar login e banco de dados
- Salvar histórico de exercícios
- Conectar uma API de IA
- Criar mais módulos interativos
