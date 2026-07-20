import type {
  ModeSchemaDatum,
  ResponsibilityDatum,
  ResponsibilityOwner,
  SequenceParticipant,
  SequenceStep,
  TimelineEvent,
} from "./agent-harness-data";

const numberFormatter = new Intl.NumberFormat("en-GB");

const relationshipStyles: Record<TimelineEvent["relationship"], string> = {
  architectural: "border border-secondary/15 bg-white text-secondary",
  "model-associated": "bg-secondaryGray text-black",
  "model-driven": "bg-black text-white",
};

const relationshipLabels: Record<TimelineEvent["relationship"], string> = {
  architectural: "Architectural",
  "model-associated": "Model-associated",
  "model-driven": "Explicitly model-driven",
};

const relationshipDescriptions: Record<TimelineEvent["relationship"], string> =
  {
    architectural:
      "A codebase change with no explicit model dependency in the diff.",
    "model-associated":
      "A change introduced alongside model-specific prompts or configuration.",
    "model-driven":
      "The code or metadata directly selects behaviour for a model.",
  };

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 fill-current"
      aria-hidden="true"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.98 10.98 0 0 1 12 6.11c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export function ArticleTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full min-w-[440px] border-collapse text-left">
        <thead>
          <tr className="border-b border-secondary/20">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-2 text-[12.5px] font-medium text-black first:pl-0 last:pr-0 ${index > 0 ? "text-right" : ""}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.join("-")}
              className="border-b border-secondary/10 last:border-0"
            >
              {row.map((cell, index) => (
                <td
                  key={`${index}-${cell}`}
                  className={`px-2 py-2 text-[12.5px] text-secondary first:pl-0 last:pr-0 ${index > 0 ? "text-right font-mono" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ArchitectureTimeline({ data }: { data: TimelineEvent[] }) {
  return (
    <figure className="my-8" aria-labelledby="architecture-timeline-caption">
      <div className="mb-6 flex flex-col gap-2 border-y border-secondary/10 py-3">
        {(
          Object.keys(relationshipLabels) as TimelineEvent["relationship"][]
        ).map((relationship) => (
          <div
            key={relationship}
            className="grid grid-cols-[132px_1fr] items-start gap-3"
          >
            <span
              className={`inline-flex min-h-6 items-center justify-center rounded px-2 py-1 text-center text-[10px] leading-tight ${relationshipStyles[relationship]}`}
            >
              {relationshipLabels[relationship]}
            </span>
            <span className="pt-0.5 text-[11px] leading-relaxed text-secondary">
              {relationshipDescriptions[relationship]}
            </span>
          </div>
        ))}
      </div>

      <ol className="relative ml-2 border-l border-secondary/15">
        {data.map((event, index) => (
          <li
            key={`${event.date}-${event.title}`}
            className="relative pb-6 pl-5 last:pb-0"
          >
            <span
              className="absolute -left-3 top-0 flex size-6 items-center justify-center rounded-full border border-secondary/15 bg-white font-mono text-[10px] text-secondary"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <time className="shrink-0 font-mono text-[12.5px] text-secondary/60 sm:w-20">
                {event.date}
              </time>
              <div className="min-w-0 flex-1">
                <a
                  href={event.source}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${event.title} on GitHub`}
                  className="inline-flex items-center gap-1.5 text-base text-black underline decoration-secondary/20 underline-offset-2 transition-colors hover:text-secondary"
                >
                  <GitHubIcon />
                  {event.title}
                </a>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded px-1.5 py-0.5 text-[10px] leading-tight ${relationshipStyles[event.relationship]}`}
                  >
                    {relationshipLabels[event.relationship]}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-secondary">
                  {event.detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <figcaption
        id="architecture-timeline-caption"
        className="mt-4 text-[12.5px] text-secondary/60"
      >
        Repository milestones are classified by the evidence connecting each
        change to a model. Temporal proximity alone does not establish
        causation.
      </figcaption>
    </figure>
  );
}

function ComparisonBars({
  data,
  field,
  label,
  format,
}: {
  data: ModeSchemaDatum[];
  field: "toolObjects" | "estimatedTokens";
  label: string;
  format: (value: number) => string;
}) {
  const maximum = Math.max(...data.map((item) => item[field]));

  return (
    <section aria-label={label}>
      <p className="mb-3 text-[12.5px] font-medium text-black">{label}</p>
      <div className="flex flex-col gap-3">
        {data.map((item) => {
          const value = item[field];
          return (
            <div
              key={item.mode}
              className="grid grid-cols-[88px_1fr_54px] items-center gap-2"
            >
              <span className="font-mono text-[11px] text-secondary">
                {item.mode}
              </span>
              <div
                className="h-2 overflow-hidden rounded-full bg-primaryGray"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-black"
                  style={{ width: `${(value / maximum) * 100}%` }}
                />
              </div>
              <span className="text-right font-mono text-[11px] text-black">
                {format(value)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ToolModeAndSchemaComparison({
  data,
}: {
  data: ModeSchemaDatum[];
}) {
  const summary = data
    .map(
      (item) =>
        `${item.mode}: ${item.toolObjects} visible tool objects and ${numberFormatter.format(item.estimatedTokens)} estimated schema tokens`,
    )
    .join("; ");

  return (
    <figure className="my-8" aria-labelledby="tool-mode-comparison-caption">
      <p className="sr-only">{summary}</p>
      <div className="grid gap-7 sm:grid-cols-2">
        <ComparisonBars
          data={data}
          field="toolObjects"
          label="Visible tool objects"
          format={(value) => String(value)}
        />
        <ComparisonBars
          data={data}
          field="estimatedTokens"
          label="Estimated schema tokens"
          format={(value) => numberFormatter.format(value)}
        />
      </div>
      <figcaption
        id="tool-mode-comparison-caption"
        className="mt-5 text-[12.5px] leading-relaxed text-secondary/60"
      >
        Matched GPT-5.5 controls. Token values are estimated as canonical schema
        characters divided by four, rounded up; they are not tokenizer output.
      </figcaption>
    </figure>
  );
}

const ownerLabels: Record<ResponsibilityOwner, string> = {
  harness: "Harness",
  shared: "Shared",
  model: "Model",
  model_generated_script: "Model-written script",
  not_available: "Not available",
};

const ownerStyles: Record<ResponsibilityOwner, string> = {
  harness: "bg-black text-white",
  shared: "bg-secondaryGray text-black",
  model: "border border-secondary/15 bg-white text-black",
  model_generated_script: "bg-secondary/15 text-black",
  not_available: "border border-dashed border-secondary/20 text-secondary/60",
};

function OwnerCell({ owner }: { owner: ResponsibilityOwner }) {
  return (
    <span
      className={`inline-flex min-h-7 w-full items-center justify-center rounded px-2 py-1 text-center text-[11px] leading-tight ${ownerStyles[owner]}`}
    >
      {ownerLabels[owner]}
    </span>
  );
}

export function ResponsibilityHeatmap({
  data,
  columns = ["Direct", "CodeModeOnly"],
}: {
  data: ResponsibilityDatum[];
  columns?: string[];
}) {
  return (
    <figure className="my-8" aria-labelledby="responsibility-heatmap-caption">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b border-secondary/15">
              <th className="py-2 pr-3 text-[12.5px] font-medium text-black">
                Responsibility
              </th>
              <th className="w-32 px-1 py-2 text-center text-[12.5px] font-medium text-black">
                {columns[0] ?? "Direct"}
              </th>
              <th className="w-32 py-2 pl-1 text-center text-[12.5px] font-medium text-black">
                {columns[1] ?? "CodeModeOnly"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.responsibility}
                className="border-b border-secondary/10 last:border-0"
              >
                <th className="py-2 pr-3 text-[12.5px] font-normal text-secondary">
                  {item.responsibility}
                </th>
                <td className="px-1 py-1.5">
                  <OwnerCell owner={item.direct} />
                </td>
                <td className="py-1.5 pl-1">
                  <OwnerCell owner={item.codeModeOnly} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption
        id="responsibility-heatmap-caption"
        className="mt-4 text-[12.5px] leading-relaxed text-secondary/60"
      >
        Architectural responsibility coding across 21 operations. Categories
        describe where work executes; they are not model-capability scores.
      </figcaption>
    </figure>
  );
}

export function SequenceDiagram({
  participants,
  steps,
  caption,
}: {
  participants: SequenceParticipant[];
  steps: SequenceStep[];
  caption?: string;
}) {
  const width = 660;
  const top = 52;
  const rowHeight = 42;
  const height = top + steps.length * rowHeight + 28;
  const spacing = (width - 100) / Math.max(participants.length - 1, 1);
  const xById = new Map(
    participants.map((participant, index) => [
      participant.id,
      50 + index * spacing,
    ]),
  );

  return (
    <figure
      className="mdx-wide my-8"
      aria-labelledby="sequence-diagram-caption"
    >
      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[640px]"
          role="img"
          aria-labelledby="sequence-diagram-title sequence-diagram-description"
        >
          <title id="sequence-diagram-title">Current Codex turn sequence</title>
          <desc id="sequence-diagram-description">
            A user request passes through the harness and context manager to the
            model. Model-written code requests nested tools through the harness,
            which applies policy, executes the tool, normalizes the result, and
            continues model inference.
          </desc>
          <defs>
            <marker
              id="sequence-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-black" />
            </marker>
          </defs>

          {participants.map((participant) => {
            const x = xById.get(participant.id) ?? 0;
            return (
              <g key={participant.id}>
                <rect
                  x={x - 46}
                  y={2}
                  width={92}
                  height={28}
                  rx={4}
                  className="fill-primaryGray stroke-secondary/15"
                />
                <text
                  x={x}
                  y={20}
                  textAnchor="middle"
                  className="fill-black text-[11px]"
                >
                  {participant.label}
                </text>
                <line
                  x1={x}
                  y1={30}
                  x2={x}
                  y2={height - 8}
                  className="stroke-secondary/20"
                  strokeDasharray="3 4"
                />
              </g>
            );
          })}

          {steps.map((step, index) => {
            const from = xById.get(step.from) ?? 0;
            const to = xById.get(step.to) ?? 0;
            const y = top + index * rowHeight;
            const isSelf = from === to;

            return (
              <g key={`${step.from}-${step.to}-${step.label}`}>
                {isSelf ? (
                  <path
                    d={`M ${from} ${y} h 34 v 18 h -33`}
                    fill="none"
                    className="stroke-black"
                    strokeDasharray={step.dashed ? "5 4" : undefined}
                    markerEnd="url(#sequence-arrow)"
                  />
                ) : (
                  <line
                    x1={from}
                    y1={y}
                    x2={to}
                    y2={y}
                    className="stroke-black"
                    strokeDasharray={step.dashed ? "5 4" : undefined}
                    markerEnd="url(#sequence-arrow)"
                  />
                )}
                <text
                  x={isSelf ? from + 40 : (from + to) / 2}
                  y={y - 6}
                  textAnchor={isSelf ? "start" : "middle"}
                  className="fill-secondary text-[10px]"
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption
        id="sequence-diagram-caption"
        className="mt-2 text-[12.5px] leading-relaxed text-secondary/60"
      >
        {caption ??
          "Direct calls skip the code-runtime lane, but both paths return through harness policy and execution."}
      </figcaption>
    </figure>
  );
}

const lifecycleStages = [
  ["01", "Harness", "Build turn context and assemble instructions"],
  ["02", "Harness", "Normalize history and check compaction thresholds"],
  ["03", "Harness", "Select and serialize the model-visible tool surface"],
  ["04", "Model", "Reason, select a direct tool, or write JavaScript"],
  [
    "05",
    "Code runtime",
    "Run model-written control flow and request nested tools",
  ],
  ["06", "Harness", "Route calls, enforce approvals, and apply the sandbox"],
  ["07", "Harness", "Normalize, truncate, persist, and record telemetry"],
  ["08", "Model + harness", "Synthesize and stream the final response"],
] as const;

export function CurrentTurnLifecycle() {
  return (
    <figure className="my-8" aria-labelledby="current-turn-caption">
      <ol className="border-y border-secondary/15">
        {lifecycleStages.map(([number, owner, stage]) => (
          <li
            key={number}
            className="grid grid-cols-[28px_92px_1fr] gap-2 border-b border-secondary/10 py-3 last:border-0"
          >
            <span className="font-mono text-[11px] text-secondary/40">
              {number}
            </span>
            <span className="font-mono text-[11px] text-black">{owner}</span>
            <span className="text-[12.5px] leading-relaxed text-secondary">
              {stage}
            </span>
          </li>
        ))}
      </ol>
      <figcaption
        id="current-turn-caption"
        className="mt-4 text-[12.5px] leading-relaxed text-secondary/60"
      >
        Programmable orchestration changes stages four and five. Context,
        policy, execution, and lifecycle controls remain harness-managed.
      </figcaption>
    </figure>
  );
}
