import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx'
import type { LessonPlanData } from '../types/lessonPlan'

// ── Constants ──────────────────────────────────────────────────────────────────
const STRATEGY_ROWS = 5
// 6.5 inches at 1" margins (1440 DXA = 1 inch)
const PAGE_WIDTH = 9360
const HALF = PAGE_WIDTH / 2
const COL_STRATEGY = Math.round(PAGE_WIDTH * 0.32)
const COL_QUESTIONS = Math.round(PAGE_WIDTH * 0.42)
const COL_WHO = Math.round(PAGE_WIDTH * 0.13)
const COL_ORDER = PAGE_WIDTH - COL_STRATEGY - COL_QUESTIONS - COL_WHO

const BORDER = { style: BorderStyle.SINGLE, size: 6, color: '1a1a1a' } as const
const ALL_BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER }

// ── Helpers ────────────────────────────────────────────────────────────────────
function filled(text: string | undefined): string {
  return text?.trim() || 'Not added yet.'
}

function run(text: string, bold = false, size = 22, color?: string): TextRun {
  return new TextRun({ text, bold, size, font: 'Calibri', color })
}

// One Paragraph per newline so whitespace-pre-line content transfers correctly
function textParas(text: string, bold = false, afterFirst = 80): Paragraph[] {
  return text.split('\n').map(
    (line, i) =>
      new Paragraph({
        spacing: { after: i === 0 ? afterFirst : 60 },
        children: [run(line, bold)],
      })
  )
}

function labeledCell(label: string, content: string, width: number): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [
      new Paragraph({
        spacing: { after: 120 },
        children: [run(label, true)],
      }),
      ...textParas(filled(content)),
    ],
  })
}

function headerCell(text: string, width: number): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [run(text, true)],
      }),
    ],
  })
}

function bodyCell(text: string, width: number, center = false): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [run(text)],
      }),
    ],
  })
}

function emptyCell(width: number): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({ children: [] })],
  })
}

// ── Document builder ───────────────────────────────────────────────────────────
export async function downloadLessonPlanDocx(data: LessonPlanData): Promise<void> {
  const strategies = Array.isArray(data.anticipatedStrategies) ? data.anticipatedStrategies : []

  // Section 1 — Learning Goals / Grade Level / Task Description / Task Launch
  const section1 = new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          labeledCell('Learning Goals', data.learningGoals, HALF),
          labeledCell('Grade Level', data.gradeLevel, HALF),
        ],
      }),
      new TableRow({
        children: [
          labeledCell('Task Description', data.taskDescription, HALF),
          labeledCell('Task Launch', data.taskLaunch, HALF),
        ],
      }),
    ],
  })

  // Section 2 — Anticipated Strategies / Questions / Who / Order
  const section2 = new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          headerCell('Anticipated Strategies and Misconceptions', COL_STRATEGY),
          headerCell('Assessing and Advancing Questions', COL_QUESTIONS),
          headerCell('Who', COL_WHO),
          headerCell('Order', COL_ORDER),
        ],
      }),
      ...Array.from({ length: STRATEGY_ROWS }).map((_, i) => {
        const row = strategies[i]
        return new TableRow({
          children: [
            bodyCell(row?.strategy ?? '', COL_STRATEGY),
            bodyCell(row?.questions ?? '', COL_QUESTIONS),
            bodyCell(row?.who ?? '', COL_WHO, true),
            bodyCell(row?.order ?? '', COL_ORDER, true),
          ],
        })
      }),
    ],
  })

  // Section 3 — Tentative Sequencing / Mathematical Connections
  const seqText = [data.tentativeSequencing, data.tentativeSequencingDetails]
    .filter(Boolean)
    .join('\n')
  const connText = [data.mathematicalConnections, data.mathematicalConnectionsDetails]
    .filter(Boolean)
    .join('\n')

  const section3 = new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          labeledCell('Tentative Sequencing Pathways', seqText, HALF),
          emptyCell(HALF),
        ],
      }),
      new TableRow({
        children: [
          labeledCell('Important Mathematical Connections', connText, HALF),
          emptyCell(HALF),
        ],
      }),
    ],
  })

  const spacer = new Paragraph({ spacing: { after: 280 }, children: [] })

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
            children: [
              run(
                'Thinking Through a Lesson Protocol (TTLP) Planning Template',
                true,
                26
              ),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Adopted from Smith, Margaret, Victoria Bill, and Elizabeth Hughes. “Thinking through a Lesson Protocol: A Key for Successfully Implementing High-Level Tasks.” Mathematics Teaching in the Middle School 14 no. 3 (2008): 132–38',
                size: 18,
                italics: true,
                font: 'Calibri',
                color: '666666',
              }),
            ],
          }),
          section1,
          spacer,
          section2,
          spacer,
          section3,
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'TTLP_Lesson_Plan.docx'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
