import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const modules = [
  {
    id: "site",
    title: "Como um site funciona",
    area: "Fundamentos",
    description: "HTML é o chassi, CSS é a pintura, JavaScript é o motor e IA é o apoio inteligente.",
    steps: ["Conceito", "Exemplo", "Interação", "Desafio"],
  },
  {
    id: "html",
    title: "HTML Interativo",
    area: "Estrutura",
    description: "Adicione títulos, parágrafos, imagens e links para ver o HTML sendo formado.",
    steps: ["Tags", "Semântica", "Preview", "Desafio"],
  },
  {
    id: "css",
    title: "CSS Interativo",
    area: "Aparência",
    description: "Altere cor, fonte, padding, largura, altura e arredondamento em tempo real.",
    steps: ["Seletores", "Box model", "Layout", "Desafio"],
  },
  {
    id: "js",
    title: "JavaScript Interativo",
    area: "Comportamento",
    description: "Teste variáveis, if/else, funções e eventos vendo a resposta mudar na tela.",
    steps: ["Variáveis", "Decisões", "Eventos", "Desafio"],
  },
  {
    id: "stack",
    title: "React, Vite e Node",
    area: "Stack do projeto",
    description: "Entenda as ferramentas usadas para construir esta plataforma e por que elas ajudam projetos modernos.",
    steps: ["React", "Vite", "Node", "Build"],
  },
];

const studyPath = [
  "Aula",
  "Conceito",
  "Exemplo",
  "Interação",
  "Desafio",
  "Feedback",
];

const quiz = [
  {
    question: "Na metáfora do carro/site, qual tecnologia representa a estrutura?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: "HTML",
    feedback: "HTML marca o que cada parte da página é: título, texto, imagem, link e estrutura.",
  },
  {
    question: "Qual propriedade CSS muda o espaço interno de um elemento?",
    options: ["margin", "padding", "if/else"],
    answer: "padding",
    feedback: "Padding cria respiro dentro do elemento, entre o conteúdo e a borda.",
  },
  {
    question: "Qual recurso do JavaScript permite escolher caminhos?",
    options: ["border-radius", "if/else", "h1"],
    answer: "if/else",
    feedback: "if/else permite decidir o que acontece quando uma condição é verdadeira ou falsa.",
  },
];

const initialBlocks = [
  { type: "h1", label: "Título", html: "<h1>Meu primeiro site</h1>" },
  { type: "p", label: "Parágrafo", html: "<p>Estou aprendendo HTML, CSS, JavaScript e IA.</p>" },
];

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (nextValue) => {
    const valueToSave = typeof nextValue === "function" ? nextValue(value) : nextValue;
    setValue(valueToSave);
    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, setStoredValue];
}

function App() {
  const [view, setView] = useState("campus");
  const [completed, setCompleted] = useStoredState("codelab-progress", {});
  const progress = Math.round((Object.keys(completed).length / modules.length) * 100);

  const completeModule = (id) => {
    setCompleted((current) => ({ ...current, [id]: true }));
  };

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} progress={progress} completed={completed} />
      <main>
        {view === "campus" && <Campus setView={setView} progress={progress} />}
        {view === "aulas" && <Lessons completed={completed} completeModule={completeModule} />}
        {view === "labs" && <Labs completeModule={completeModule} />}
        {view === "aluno" && <Student progress={progress} completed={completed} />}
      </main>
    </div>
  );
}

function Sidebar({ view, setView, progress, completed }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => setView("campus")}>
        <span>CL</span>
        <div>
          <strong>KodeLab</strong>
          <small>Aprenda, teste e interaja</small>
        </div>
      </button>
      <nav>
        {[
          ["campus", "Campus"],
          ["aulas", "Aulas"],
          ["labs", "Laboratórios"],
          ["aluno", "Área do aluno"],
        ].map(([id, label]) => (
          <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </nav>
      <section className="progress-card">
        <span>Progresso geral</span>
        <strong>{progress}%</strong>
        <div className="progress-track">
          <i style={{ width: `${progress}%` }} />
        </div>
        <small>{Object.keys(completed).length} de {modules.length} módulos concluídos</small>
      </section>
    </aside>
  );
}

function Campus({ setView, progress }) {
  return (
    <>
      <header className="hero">
        <div>
          <p className="eyebrow">Faculdade de tecnologia experimental</p>
          <h1>Conteúdo teórico transformado em prática interativa.</h1>
          <p>
            Uma plataforma institucional para estudar programação com aulas guiadas,
            laboratórios em tempo real, desafios, feedback e contador de progresso.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => setView("aulas")}>Entrar nas aulas</button>
            <button className="ghost" onClick={() => setView("labs")}>Abrir laboratórios</button>
          </div>
        </div>
        <section className="hero-panel">
          <span>Primeira entrega MVP</span>
          <h2>Módulo 01 - Como um site funciona</h2>
          <p>Baseado na lógica DevClub e expandido com React, Vite e Node, a stack usada neste protótipo.</p>
          <div className="progress-track large"><i style={{ width: `${progress}%` }} /></div>
        </section>
      </header>

      <section className="section">
        <div className="section-title">
          <p className="eyebrow">Trilha guiada</p>
          <h2>Aula → Conceito → Exemplo → Interação → Desafio → Feedback</h2>
        </div>
        <div className="path-grid">
          {studyPath.map((item, index) => (
            <article key={item} className="path-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section soft">
        <div className="section-title">
          <p className="eyebrow">Módulos</p>
          <h2>Áreas de estudo</h2>
        </div>
        <ModuleGrid setView={setView} />
      </section>
    </>
  );
}

function ModuleGrid({ setView }) {
  return (
    <div className="module-grid">
      {modules.map((module) => (
        <article key={module.id} className={module.id === "site" ? "module-card featured" : "module-card"}>
          <span>{module.area}</span>
          <h3>{module.title}</h3>
          <p>{module.description}</p>
          <button onClick={() => setView(module.id === "site" ? "aulas" : "labs")}>
            Estudar agora
          </button>
        </article>
      ))}
    </div>
  );
}

function Lessons({ completed, completeModule }) {
  const [stage, setStage] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const currentQuiz = quiz[quizIndex];
  const stagePercent = Math.round(((stage + 1) / 4) * 100);

  return (
    <div className="page-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Área de aulas</p>
          <h1>Módulo 01 - Como um site funciona</h1>
          <p>Monte o carro/site por etapas e veja estrutura, aparência, comportamento e IA entrando em cena.</p>
        </div>
        <section className="counter">
          <span>Progresso da aula</span>
          <strong>{stagePercent}%</strong>
          <div className="progress-track"><i style={{ width: `${stagePercent}%` }} /></div>
        </section>
      </header>

      <section className="lesson-layout">
        <aside className="stage-menu">
          {["HTML", "CSS", "JavaScript", "IA"].map((item, index) => (
            <button key={item} className={stage === index ? "active" : ""} onClick={() => setStage(index)}>
              Etapa {index + 1}
              <strong>{item}</strong>
            </button>
          ))}
        </aside>

        <article className="lesson-stage">
          <CarSiteStage stage={stage} />
          <div className="stage-actions">
            <button className="ghost" onClick={() => setStage(Math.max(0, stage - 1))}>Voltar</button>
            <button className="primary" onClick={() => setStage(Math.min(3, stage + 1))}>Avançar</button>
          </div>
        </article>
      </section>

      <section className="lesson-tools">
        <article className="quiz-box">
          <p className="eyebrow">Questionário</p>
          <h2>{currentQuiz.question}</h2>
          <div className="option-grid">
            {currentQuiz.options.map((option) => (
              <button
                key={option}
                className={answer === option ? (option === currentQuiz.answer ? "correct" : "wrong") : ""}
                onClick={() => setAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="feedback">{answer ? currentQuiz.feedback : "Escolha uma resposta para receber feedback."}</p>
          <button className="ghost" onClick={() => {
            setAnswer("");
            setQuizIndex((quizIndex + 1) % quiz.length);
          }}>
            Próxima pergunta
          </button>
        </article>

        <article className="challenge-box">
          <p className="eyebrow">Desafio final</p>
          <h2>Explique a metáfora do carro/site</h2>
          <p>Escreva em uma frase o papel de HTML, CSS, JavaScript e IA.</p>
          <textarea placeholder="Ex: HTML é..., CSS é..." />
          <button className="primary" onClick={() => completeModule("site")}>
            Marcar módulo concluído
          </button>
          {completed.site && <p className="success">Módulo concluído e salvo na área do aluno.</p>}
        </article>
      </section>

      <section className="section stack-section">
        <div className="section-title">
          <p className="eyebrow">Stack usada no projeto</p>
          <h2>React, Vite e Node também entram na trilha</h2>
        </div>
        <div className="stack-grid">
          <article>
            <span>React</span>
            <h3>Interface por componentes</h3>
            <p>Organiza a tela em partes reutilizáveis, como menu, aula, laboratório, quiz e área do aluno.</p>
          </article>
          <article>
            <span>Vite</span>
            <h3>Servidor rápido de desenvolvimento</h3>
            <p>Permite rodar o projeto localmente com atualização instantânea e gerar a versão final com build.</p>
          </article>
          <article>
            <span>Node</span>
            <h3>Ambiente de ferramentas</h3>
            <p>Executa o npm, instala dependências e roda scripts como dev, build e preview.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function CarSiteStage({ stage }) {
  const labels = [
    ["HTML entra como chassi", "A página ganha estrutura: título, texto, imagem e botão."],
    ["CSS aplica a pintura", "Cores, espaçamento, bordas e tipografia deixam a página apresentável."],
    ["JavaScript liga o motor", "O botão começa a reagir e a página responde ao usuário."],
    ["IA vira superpoder", "A IA sugere melhorias, exercícios e revisões para acelerar o estudo."],
  ];

  return (
    <div className="car-lab">
      <div className={`car-preview stage-${stage}`}>
        <div className="car-shell">
          <div className="car-window" />
          <div className="car-button">{stage >= 2 ? "Clique ativo" : "Botão"}</div>
          {stage >= 3 && <div className="ai-badge">IA sugerindo melhorias</div>}
        </div>
        <div className="wheel left" />
        <div className="wheel right" />
      </div>
      <div>
        <span className="pill">Etapa {stage + 1}</span>
        <h2>{labels[stage][0]}</h2>
        <p>{labels[stage][1]}</p>
      </div>
    </div>
  );
}

function Labs({ completeModule }) {
  const [activeLab, setActiveLab] = useState("html");

  return (
    <div className="page-wrap">
      <header className="page-header compact">
        <div>
          <p className="eyebrow">Laboratórios</p>
          <h1>Teste, mude atributos e veja o resultado.</h1>
          <p>O diferencial do projeto está aqui: conteúdo vivo, manipulável e visual.</p>
        </div>
      </header>
      <div className="lab-tabs">
        {[
          ["html", "Editor HTML"],
          ["css", "Playground CSS"],
          ["js", "Simulador JS"],
          ["stack", "React/Vite/Node"],
          ["ia", "Gerador com IA"],
        ].map(([id, label]) => (
          <button key={id} className={activeLab === id ? "active" : ""} onClick={() => setActiveLab(id)}>
            {label}
          </button>
        ))}
      </div>
      {activeLab === "html" && <HtmlLab completeModule={completeModule} />}
      {activeLab === "css" && <CssLab completeModule={completeModule} />}
      {activeLab === "js" && <JsLab completeModule={completeModule} />}
      {activeLab === "stack" && <StackLab completeModule={completeModule} />}
      {activeLab === "ia" && <AiLab />}
    </div>
  );
}

function HtmlLab({ completeModule }) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const html = blocks.map((block) => block.html).join("\n");

  const addBlock = (block) => setBlocks((current) => [...current, block]);

  return (
    <section className="lab-grid">
      <article className="control-panel">
        <p className="eyebrow">HTML Interativo</p>
        <h2>Monte a estrutura da página</h2>
        <div className="button-list">
          <button onClick={() => addBlock({ type: "h1", label: "Título", html: "<h1>Novo título</h1>" })}>Adicionar título</button>
          <button onClick={() => addBlock({ type: "p", label: "Parágrafo", html: "<p>Um novo parágrafo de estudo.</p>" })}>Adicionar parágrafo</button>
          <button onClick={() => addBlock({ type: "img", label: "Imagem", html: "<img src='https://placehold.co/480x220' alt='Exemplo visual' />" })}>Adicionar imagem</button>
          <button onClick={() => addBlock({ type: "a", label: "Link", html: "<a href='#'>Link de estudo</a>" })}>Adicionar link</button>
        </div>
        <pre>{html}</pre>
        <button className="primary" onClick={() => completeModule("html")}>Concluir HTML</button>
      </article>
      <LivePreview html={html} />
    </section>
  );
}

function CssLab({ completeModule }) {
  const [style, setStyle] = useState({
    backgroundColor: "#f25f5c",
    color: "#ffffff",
    fontSize: 18,
    padding: 16,
    radius: 8,
    width: 220,
    height: 62,
  });

  const cssText = `.botao {
  background-color: ${style.backgroundColor};
  color: ${style.color};
  font-size: ${style.fontSize}px;
  padding: ${style.padding}px;
  border-radius: ${style.radius}px;
  width: ${style.width}px;
  height: ${style.height}px;
}`;

  return (
    <section className="lab-grid">
      <article className="control-panel">
        <p className="eyebrow">CSS Interativo</p>
        <h2>Controle os atributos do botão</h2>
        <Control label="Cor do botão" type="color" value={style.backgroundColor} onChange={(value) => setStyle({ ...style, backgroundColor: value })} />
        <Control label="Tamanho da fonte" value={style.fontSize} min="12" max="36" onChange={(value) => setStyle({ ...style, fontSize: Number(value) })} />
        <Control label="Arredondamento" value={style.radius} min="0" max="40" onChange={(value) => setStyle({ ...style, radius: Number(value) })} />
        <Control label="Espaçamento interno" value={style.padding} min="4" max="36" onChange={(value) => setStyle({ ...style, padding: Number(value) })} />
        <Control label="Largura" value={style.width} min="140" max="360" onChange={(value) => setStyle({ ...style, width: Number(value) })} />
        <Control label="Altura" value={style.height} min="42" max="120" onChange={(value) => setStyle({ ...style, height: Number(value) })} />
        <pre>{cssText}</pre>
        <button className="primary" onClick={() => completeModule("css")}>Concluir CSS</button>
      </article>
      <article className="preview-panel center">
        <button className="live-button" style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          fontSize: `${style.fontSize}px`,
          padding: `${style.padding}px`,
          borderRadius: `${style.radius}px`,
          width: `${style.width}px`,
          height: `${style.height}px`,
        }}>
          Botão em tempo real
        </button>
      </article>
    </section>
  );
}

function JsLab({ completeModule }) {
  const [age, setAge] = useState(17);
  const canDrive = age >= 18;

  return (
    <section className="lab-grid">
      <article className="control-panel">
        <p className="eyebrow">JavaScript Vivo</p>
        <h2>Altere a idade e veja o if/else agir</h2>
        <label className="range-row">
          Idade: <strong>{age}</strong>
          <input type="range" min="10" max="80" value={age} onChange={(event) => setAge(Number(event.target.value))} />
        </label>
        <pre>{`const idade = ${age};

if (idade >= 18) {
  resultado = "Pode dirigir";
} else {
  resultado = "Não pode dirigir";
}`}</pre>
        <button className="primary" onClick={() => completeModule("js")}>Concluir JavaScript</button>
      </article>
      <article className="preview-panel center">
        <div className={canDrive ? "result-card ok" : "result-card no"}>
          <span>Resultado</span>
          <strong>{canDrive ? "Pode dirigir" : "Não pode dirigir"}</strong>
        </div>
      </article>
    </section>
  );
}

function AiLab() {
  const [goal, setGoal] = useState("Aprender Flexbox");
  const prompt = `Explique "${goal}" para um iniciante.
Inclua:
1. Uma explicação curta.
2. Um exemplo em código.
3. Um exercício prático.
4. Um checklist de correção.`;

  return (
    <section className="lab-grid">
      <article className="control-panel">
        <p className="eyebrow">IA aplicada aos estudos</p>
        <h2>Gerador de prompt educacional</h2>
        <input value={goal} onChange={(event) => setGoal(event.target.value)} />
        <p>Esta primeira versão simula a área de IA. Futuramente ela pode se conectar a uma API.</p>
      </article>
      <article className="preview-panel">
        <h3>Prompt gerado</h3>
        <pre>{prompt}</pre>
      </article>
    </section>
  );
}

function StackLab({ completeModule }) {
  return (
    <section className="lab-grid">
      <article className="control-panel">
        <p className="eyebrow">Stack do projeto</p>
        <h2>Como React, Vite e Node trabalham juntos</h2>
        <div className="stack-flow">
          <div><strong>Node</strong><span>roda npm e scripts</span></div>
          <div><strong>Vite</strong><span>serve e empacota o app</span></div>
          <div><strong>React</strong><span>renderiza a interface</span></div>
        </div>
        <pre>{`npm install
npm run dev
npm run build`}</pre>
        <button className="primary" onClick={() => completeModule("stack")}>Concluir stack</button>
      </article>
      <article className="preview-panel">
        <h3>Resumo para estudo</h3>
        <p><strong>React</strong> é a biblioteca que usamos para criar componentes e estados.</p>
        <p><strong>Vite</strong> é a ferramenta que abre o servidor local e prepara os arquivos finais.</p>
        <p><strong>Node</strong> é o ambiente que permite usar npm, instalar pacotes e executar scripts.</p>
      </article>
    </section>
  );
}

function Control({ label, value, onChange, type = "range", min, max }) {
  return (
    <label className="range-row">
      {label}: <strong>{value}</strong>
      <input type={type} min={min} max={max} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function LivePreview({ html }) {
  return (
    <article className="preview-panel">
      <h3>Resultado visual</h3>
      <div className="html-preview" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

function Student({ progress, completed }) {
  return (
    <div className="page-wrap">
      <header className="page-header compact">
        <div>
          <p className="eyebrow">Área do aluno</p>
          <h1>Seu acompanhamento de estudo</h1>
          <p>Resumo para apresentar na faculdade: aulas, progresso, desafios e competências.</p>
        </div>
      </header>
      <section className="student-grid">
        <article className="student-card big">
          <span>Progresso total</span>
          <strong>{progress}%</strong>
          <div className="progress-track large"><i style={{ width: `${progress}%` }} /></div>
        </article>
        {modules.map((module) => (
          <article key={module.id} className="student-card">
            <span>{module.area}</span>
            <h3>{module.title}</h3>
            <p>{completed[module.id] ? "Concluído" : "Em andamento"}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
