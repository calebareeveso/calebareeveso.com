export type TimelineEvent = {
  date: string;
  title: string;
  detail: string;
  relationship: "architectural" | "model-associated" | "model-driven";
  source: string;
};

export const timelineData: TimelineEvent[] = [
  {
    date: "Sep 2025",
    title: "Model-specific instructions",
    detail: "GPT-5 Codex receives a dedicated prompt.",
    relationship: "model-associated",
    source:
      "https://github.com/openai/codex/commit/f037b2fd563856ebbac834ec716cbe0c582f25f4",
  },
  {
    date: "Sep 2025",
    title: "Model-specific auto-compaction",
    detail: "The harness enables automatic compaction for GPT-5 Codex.",
    relationship: "model-driven",
    source:
      "https://github.com/openai/codex/commit/2451b19d131e6d73920b68bd838490550188a6ee",
  },
  {
    date: "Dec 2025",
    title: "Data-driven model metadata",
    detail: "Model behavior moves into a static metadata catalog.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/927a6acbea7b68f8791f519cbac013350d576666",
  },
  {
    date: "Mar 2026",
    title: "Dedicated code-mode runtime",
    detail: "Model-written orchestration gets its own runtime crate.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/1746126881735edec2b5ac3a472998605da95343",
  },
  {
    date: "Mar 2026",
    title: "CodeModeOnly",
    detail: "The direct tool surface can be narrowed to a programmable entry point.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/477a2dd3458be962178abc891422215bf3c22f52",
  },
  {
    date: "Mar 2026",
    title: "V8 JavaScript runtime",
    detail: "Code mode runs model-written JavaScript in V8.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/e4eedd6170580d5b06fb539635a78f261a6b7369",
  },
  {
    date: "Apr 2026",
    title: "Deferred MCP schemas",
    detail: "MCP tools no longer need to be eagerly listed in the exec description.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/9c6d0386220071f3fd313c819c8eb3a8c54b6dec",
  },
  {
    date: "May 2026",
    title: "Model-selected tool mode",
    detail: "Tool mode becomes a model metadata field.",
    relationship: "model-driven",
    source:
      "https://github.com/openai/codex/commit/5577a9e1482ed867318dad51a01e5d18a5c5e5fa",
  },
  {
    date: "Jun 2026",
    title: "Process-owned code-mode host",
    detail: "The programmable runtime receives a separate process-owned host.",
    relationship: "architectural",
    source:
      "https://github.com/openai/codex/commit/7d8906b4785d9e2d6ebe8c75a163f97de4f7ca35",
  },
  {
    date: "Jul 2026",
    title: "GPT-5.6 selects CodeModeOnly",
    detail: "Sol, Terra, and Luna are associated with the programmable-only tool mode.",
    relationship: "model-driven",
    source:
      "https://github.com/openai/codex/commit/3380969a29134630d56feb6218e8e8dcc5e8196d",
  },
];

export type ModeSchemaDatum = {
  mode: string;
  toolObjects: number;
  schemaCharacters: number;
  estimatedTokens: number;
};

export const modeSchemaData: ModeSchemaDatum[] = [
  { mode: "Direct", toolObjects: 8, schemaCharacters: 7_377, estimatedTokens: 1_845 },
  { mode: "CodeMode", toolObjects: 10, schemaCharacters: 16_220, estimatedTokens: 4_055 },
  { mode: "CodeModeOnly", toolObjects: 4, schemaCharacters: 11_626, estimatedTokens: 2_907 },
];

export const modeSummaryTable = {
  columns: ["Mode", "Visible tool objects", "Estimated schema tokens"],
  rows: [
    ["Direct", "8", "1,845"],
    ["CodeMode", "10", "4,055"],
    ["CodeModeOnly", "4", "2,907"],
  ],
};

export const responsibilitySummaryTable = {
  columns: ["Owner", "Direct", "CodeModeOnly"],
  rows: [
    ["Harness", "6", "6"],
    ["Shared", "4", "2"],
    ["Model", "10", "3"],
    ["Model-written script", "0", "10"],
    ["Not available", "1", "0"],
  ],
};

export type ResponsibilityOwner =
  | "harness"
  | "shared"
  | "model"
  | "model_generated_script"
  | "not_available";

export type ResponsibilityDatum = {
  responsibility: string;
  direct: ResponsibilityOwner;
  codeModeOnly: ResponsibilityOwner;
};

export const responsibilityData: ResponsibilityDatum[] = [
  { responsibility: "Task interpretation", direct: "model", codeModeOnly: "model" },
  { responsibility: "Planning", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Repository search", direct: "shared", codeModeOnly: "model_generated_script" },
  { responsibility: "Context selection", direct: "shared", codeModeOnly: "shared" },
  { responsibility: "Tool selection", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Tool sequencing", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Script writing", direct: "not_available", codeModeOnly: "model_generated_script" },
  { responsibility: "Intermediate filtering", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Aggregation", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Branching", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Retry decisions", direct: "shared", codeModeOnly: "model_generated_script" },
  { responsibility: "Patch generation", direct: "model", codeModeOnly: "model_generated_script" },
  { responsibility: "Command execution", direct: "harness", codeModeOnly: "harness" },
  { responsibility: "Sandbox enforcement", direct: "harness", codeModeOnly: "harness" },
  { responsibility: "Approval enforcement", direct: "harness", codeModeOnly: "harness" },
  { responsibility: "Output truncation", direct: "harness", codeModeOnly: "harness" },
  { responsibility: "History normalization", direct: "harness", codeModeOnly: "harness" },
  { responsibility: "Compaction", direct: "shared", codeModeOnly: "shared" },
  { responsibility: "Result synthesis", direct: "model", codeModeOnly: "model" },
  { responsibility: "Final communication", direct: "model", codeModeOnly: "model" },
  { responsibility: "Telemetry", direct: "harness", codeModeOnly: "harness" },
];

export type SequenceParticipant = { id: string; label: string };

export type SequenceStep = {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
};

export const turnParticipants: SequenceParticipant[] = [
  { id: "user", label: "User" },
  { id: "harness", label: "Harness" },
  { id: "context", label: "Context" },
  { id: "model", label: "Model" },
  { id: "runtime", label: "Code runtime" },
  { id: "tools", label: "Tools" },
];

export const turnSequence: SequenceStep[] = [
  { from: "user", to: "harness", label: "Submit task" },
  { from: "harness", to: "context", label: "Build + normalize context" },
  { from: "harness", to: "model", label: "Instructions, context, tools" },
  { from: "model", to: "runtime", label: "Write JavaScript" },
  { from: "runtime", to: "harness", label: "Request nested tool call" },
  { from: "harness", to: "harness", label: "Approval + sandbox checks" },
  { from: "harness", to: "tools", label: "Execute allowed action" },
  { from: "tools", to: "harness", label: "Return result", dashed: true },
  { from: "harness", to: "harness", label: "Truncate + normalize" },
  { from: "harness", to: "runtime", label: "Return nested result", dashed: true },
  { from: "harness", to: "model", label: "Continue with result" },
  { from: "model", to: "user", label: "Final response", dashed: true },
];
