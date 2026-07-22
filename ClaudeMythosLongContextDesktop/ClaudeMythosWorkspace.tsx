import { useMemo, useState } from 'react'

type WorkspaceMode = 'coding' | 'research' | 'documents' | 'writing'

interface WorkflowCard {
  id: WorkspaceMode
  title: string
  description: string
  prompt: string
}

const WORKFLOWS: WorkflowCard[] = [
  {
    id: 'coding',
    title: 'AI Coding Session',
    description: 'Review a repository, trace bugs, plan changes, and verify code.',
    prompt: 'Inspect the relevant code, list assumptions, propose a safe plan, then verify the result.',
  },
  {
    id: 'research',
    title: 'Deep Research',
    description: 'Compare sources, surface disagreements, and build a concise synthesis.',
    prompt: 'Separate sourced facts from inference and highlight evidence that still needs verification.',
  },
  {
    id: 'documents',
    title: 'Document Analysis',
    description: 'Extract decisions, risks, deadlines, and unresolved questions from long files.',
    prompt: 'Return an executive summary followed by decisions, risks, owners, dates, and open questions.',
  },
  {
    id: 'writing',
    title: 'Structured Writing',
    description: 'Create clear technical drafts with consistent terminology and tone.',
    prompt: 'Draft for a knowledgeable reader, prefer concrete language, and remove unsupported claims.',
  },
]

const palette = {
  ink: '#1f2430',
  muted: '#697386',
  panel: '#ffffff',
  accent: '#c45a3c',
  accentSoft: '#fff1ec',
  border: '#e7ded9',
  canvas: '#f8f5f2',
}

/**
 * Claude Mythos AI desktop workspace demo.
 * This component is self-contained so the source preview can run without project-specific UI modules.
 */
export default function ClaudeMythosWorkspace() {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>('coding')
  const [contextSize, setContextSize] = useState(38)
  const [draft, setDraft] = useState('')

  const activeWorkflow = useMemo(
    () => WORKFLOWS.find((workflow) => workflow.id === activeMode) ?? WORKFLOWS[0],
    [activeMode],
  )

  return (
    <main
      style={{
        minHeight: '100vh',
        background: `radial-gradient(circle at top left, ${palette.accentSoft}, transparent 34%), ${palette.canvas}`,
        color: palette.ink,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '32px',
        boxSizing: 'border-box',
      }}
    >
      <section style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '24px',
            alignItems: 'center',
            marginBottom: '28px',
          }}
        >
          <div>
            <div style={{ color: palette.accent, fontWeight: 800, letterSpacing: '0.08em', fontSize: '12px' }}>
              CLAUDE MYTHOS AI FREE DESKTOP
            </div>
            <h1 style={{ margin: '8px 0 6px', fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.05 }}>
              Long-context reasoning workspace
            </h1>
            <p style={{ margin: 0, color: palette.muted, maxWidth: '720px', lineHeight: 1.6 }}>
              Organize AI coding, deep research, document analysis, and writing in one focused desktop session.
            </p>
          </div>
          <div
            aria-label="Local session status"
            style={{
              flex: '0 0 auto',
              padding: '10px 14px',
              border: `1px solid ${palette.border}`,
              borderRadius: '999px',
              background: palette.panel,
              color: palette.muted,
              fontSize: '13px',
            }}
          >
            ● Local workspace ready
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 0.8fr) minmax(0, 1.8fr)', gap: '20px' }}>
          <aside
            style={{
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              borderRadius: '22px',
              padding: '14px',
              boxShadow: '0 18px 45px rgba(70, 52, 44, 0.08)',
            }}
          >
            <h2 style={{ fontSize: '14px', margin: '6px 8px 12px', color: palette.muted }}>Choose a workflow</h2>
            {WORKFLOWS.map((workflow) => {
              const selected = workflow.id === activeMode
              return (
                <button
                  key={workflow.id}
                  type="button"
                  onClick={() => setActiveMode(workflow.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    border: selected ? `1px solid ${palette.accent}` : '1px solid transparent',
                    borderRadius: '14px',
                    padding: '13px',
                    marginBottom: '8px',
                    background: selected ? palette.accentSoft : 'transparent',
                    color: palette.ink,
                    cursor: 'pointer',
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: '4px' }}>{workflow.title}</strong>
                  <span style={{ color: palette.muted, fontSize: '12px', lineHeight: 1.4 }}>{workflow.description}</span>
                </button>
              )
            })}
          </aside>

          <section
            style={{
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              borderRadius: '22px',
              padding: '26px',
              boxShadow: '0 18px 45px rgba(70, 52, 44, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'baseline' }}>
              <h2 style={{ margin: 0 }}>{activeWorkflow.title}</h2>
              <span style={{ color: palette.muted, fontSize: '13px' }}>Context loaded: {contextSize}%</span>
            </div>

            <p style={{ color: palette.muted, lineHeight: 1.6 }}>{activeWorkflow.description}</p>

            <label style={{ display: 'block', margin: '22px 0 8px', fontWeight: 700, fontSize: '13px' }}>
              Session context
            </label>
            <input
              aria-label="Session context percentage"
              type="range"
              min="0"
              max="100"
              value={contextSize}
              onChange={(event) => setContextSize(Number(event.target.value))}
              style={{ width: '100%', accentColor: palette.accent }}
            />

            <label htmlFor="mythos-draft" style={{ display: 'block', margin: '22px 0 8px', fontWeight: 700, fontSize: '13px' }}>
              Prompt draft
            </label>
            <textarea
              id="mythos-draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={activeWorkflow.prompt}
              rows={8}
              style={{
                width: '100%',
                resize: 'vertical',
                boxSizing: 'border-box',
                border: `1px solid ${palette.border}`,
                borderRadius: '14px',
                padding: '14px',
                color: palette.ink,
                background: '#fffdfb',
                font: 'inherit',
                lineHeight: 1.55,
                outlineColor: palette.accent,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
              <span style={{ color: palette.muted, fontSize: '12px' }}>{draft.length} characters · review secrets before sending</span>
              <button
                type="button"
                disabled={!draft.trim()}
                style={{
                  border: 0,
                  borderRadius: '12px',
                  padding: '11px 18px',
                  background: draft.trim() ? palette.accent : '#d7cec9',
                  color: '#fff',
                  fontWeight: 800,
                  cursor: draft.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Start reasoning session
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
