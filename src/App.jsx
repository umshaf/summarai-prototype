import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, FileText, Brain, CheckCircle2, AlertTriangle, Sparkles, BarChart3, RefreshCw } from "lucide-react";

function Card({ className = "", children }) {
  return (
    <div className={`bg-white border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const aiSummary = {
  aim: "The study aims to investigate how artificial intelligence can support the classification and analysis of glioma-related research using structured academic data.",
  methodology: "The paper applies AI-based analysis to medical imaging data, using machine learning or deep learning methods to identify patterns linked to tumour classification and diagnostic decision-making.",
  results: "The reported findings suggest that AI methods can achieve strong performance in identifying or classifying glioma-related features, although performance depends on dataset quality, validation methods and study design.",
  limitations: "Key limitations include small or controlled datasets, limited external validation and reduced interpretability of some AI models, which may affect generalisability in real-world settings."
};

const comparisonFindings = [
  { type: "match", text: "Both summaries communicate the main study aim and general methodology." },
  { type: "warning", text: "The human summary includes slightly more contextual interpretation and evaluative detail." },
  { type: "match", text: "The AI summary is more consistent in structure and easier to compare across studies." },
  { type: "warning", text: "Study limitations are present in both summaries, but may require human review for deeper critical analysis." }
];

function SummaryCard({ title, children }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        <p className="text-sm leading-6 text-slate-700">{children}</p>
      </CardContent>
    </Card>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function SummarAIPrototype() {
  const [paperInput, setPaperInput] = useState("");
  const [summaryType, setSummaryType] = useState("Structured SLR Summary");
  const [stage, setStage] = useState("input");
  const [humanSummary, setHumanSummary] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  const similarityScore = useMemo(() => {
    if (!humanSummary.trim()) return 0;
    const lengthScore = Math.min(90, 60 + Math.floor(humanSummary.trim().length / 18));
    return Math.max(72, lengthScore);
  }, [humanSummary]);

  const generateSummary = () => {
    setStage("loading");
    setShowComparison(false);
    setTimeout(() => setStage("summary"), 1800);
  };

  const compareSummaries = () => {
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-sm">
              <Brain size={22} />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">SummarAI</p>
              <p className="text-xs text-slate-500">GenAI Literature Review Prototype</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#demo" className="hover:text-blue-700">Demo</a>
            <a href="#framework" className="hover:text-blue-700">Framework</a>
            <a href="#comparison" className="hover:text-blue-700">Comparison</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
              <Sparkles size={16} /> Proof-of-concept artefact
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              AI-Assisted Academic Literature Summarisation
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              A prototype interface demonstrating how a research paper can be summarised using GenAI, then compared against a human-written summary to support systematic literature review workflows.
            </p>
          </div>

          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Prototype purpose</h2>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={18} /> Generate structured academic summaries.</p>
                <p className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={18} /> Compare AI-generated and human-generated summaries.</p>
                <p className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={18} /> Highlight consistency, missing information and contextual differences.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="demo" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-1 text-xl font-bold">1. Add research paper</h2>
              <p className="mb-5 text-sm text-slate-500">Upload a PDF or provide a DOI/PubMed link. This prototype simulates the AI workflow.</p>

              <div className="mb-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <Upload className="mx-auto mb-3 text-blue-700" size={34} />
                <p className="font-semibold text-slate-800">Drag and drop paper PDF</p>
                <p className="mt-1 text-xs text-slate-500">Prototype upload area for demonstration only</p>
              </div>

              <label className="mb-2 block text-sm font-medium text-slate-700">DOI or PubMed URL</label>
              <div className="mb-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <LinkIcon size={18} className="text-slate-400" />
                <input
                  value={paperInput}
                  onChange={(e) => setPaperInput(e.target.value)}
                  placeholder="Paste DOI or PubMed link here..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <label className="mb-2 block text-sm font-medium text-slate-700">Summary type</label>
              <select
                value={summaryType}
                onChange={(e) => setSummaryType(e.target.value)}
                className="mb-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option>Structured SLR Summary</option>
                <option>Concise Summary</option>
                <option>Detailed Academic Summary</option>
              </select>

              <Button onClick={generateSummary} className="w-full rounded-2xl bg-blue-700 py-6 text-base hover:bg-blue-800">
                Generate AI Summary
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {stage === "input" && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                      <FileText className="mb-4 text-slate-300" size={52} />
                      <h2 className="text-xl font-bold">AI summary will appear here</h2>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Generate a summary to view the structured output used in the dissertation framework.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {stage === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                      <RefreshCw className="mb-5 animate-spin text-blue-700" size={44} />
                      <h2 className="text-xl font-bold">Generating structured summary...</h2>
                      <div className="mt-5 space-y-2 text-sm text-slate-600">
                        <p>Extracting paper content</p>
                        <p>Identifying methodology</p>
                        <p>Analysing findings and limitations</p>
                        <p>Creating structured summary</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {stage === "summary" && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold">2. AI-generated structured summary</h2>
                          <p className="text-sm text-slate-500">Summary type: {summaryType}</p>
                        </div>
                        <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Generated</div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <SummaryCard title="Study Aim">{aiSummary.aim}</SummaryCard>
                        <SummaryCard title="Methodology">{aiSummary.methodology}</SummaryCard>
                        <SummaryCard title="Results">{aiSummary.results}</SummaryCard>
                        <SummaryCard title="Limitations">{aiSummary.limitations}</SummaryCard>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-3">
                        <MetricCard label="Processing time" value="3.2 sec" />
                        <MetricCard label="Word reduction" value="78%" />
                        <MetricCard label="Key terms" value="12" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="comparison" className="rounded-3xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <h2 className="mb-1 text-xl font-bold">3. Add human summary</h2>
                      <p className="mb-4 text-sm text-slate-500">Paste a researcher-written summary to compare against the AI-generated output.</p>
                      <textarea
                        value={humanSummary}
                        onChange={(e) => setHumanSummary(e.target.value)}
                        placeholder="Paste human-written summary here..."
                        className="min-h-[150px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none focus:border-blue-400 focus:bg-white"
                      />
                      <Button onClick={compareSummaries} disabled={!humanSummary.trim()} className="mt-4 w-full rounded-2xl bg-slate-900 py-6 text-base hover:bg-slate-800">
                        Compare Summaries
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <AnimatePresence>
          {showComparison && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="mt-6"
            >
              <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <BarChart3 size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">4. Summary comparison analysis</h2>
                      <p className="text-sm text-slate-500">Prototype output based on similarity, structure and completeness criteria.</p>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
                    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center">
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Similarity Score</p>
                      <p className="mt-3 text-5xl font-black text-blue-900">{similarityScore}%</p>
                      <div className="mt-5 h-3 rounded-full bg-blue-100">
                        <div className="h-3 rounded-full bg-blue-700" style={{ width: `${similarityScore}%` }} />
                      </div>
                      <p className="mt-4 text-sm leading-6 text-blue-900">
                        The summaries show a high level of perceived equivalence, with some differences in contextual detail.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {comparisonFindings.map((item, index) => (
                        <div key={index} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          {item.type === "match" ? (
                            <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={20} />
                          ) : (
                            <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={20} />
                          )}
                          <p className="text-sm leading-6 text-slate-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Prototype insight</p>
                    <p className="mt-2 leading-7">
                      AI-generated summaries provide consistent structured outputs, while human summaries contribute stronger contextual interpretation and evaluative detail. This supports a hybrid approach to literature review workflows.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        <section id="framework" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Framework demonstrated by the prototype</h2>
          <div className="grid gap-3 text-center text-sm font-semibold text-slate-700 md:grid-cols-5">
            {["Paper Input", "AI Summary", "Human Summary", "Comparison", "Evaluation"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs text-white">{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
