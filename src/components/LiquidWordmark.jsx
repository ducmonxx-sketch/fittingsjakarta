import { useId, useLayoutEffect, useRef, useState } from 'react'
import styles from './LiquidWordmark.module.css'

const WORD = 'FITTINGS'

/* Drawn in a font-size-100 user space; the SVG is scaled by CSS width. */
const BASELINE = 100
/* getBBox() on SVG text reports the em box (ascent→descent), not the glyphs,
   so the vertical bounds come from Inter's cap height instead — otherwise the
   viewBox carries ~40 units of dead space above and below the caps. */
const CAP_HEIGHT = 72.7
const PAD = 3
const WAVELENGTH = 150
const AMPLITUDE = 3.5
/* 1 = the waterline finishes clear of the cap top, so the word ends solid */
const FILL_LEVEL = 1

/* A wave-topped slab: the surface oscillates around local y=0 so translating
   the slab vertically puts the waterline exactly at the translated value. */
function wavePath({ startX, width, depth, wavelength, amplitude }) {
  const half = wavelength / 2
  let d = `M ${startX} 0 q ${wavelength / 4} ${-amplitude * 2} ${half} 0`
  for (let x = half; x < width; x += half) d += ` t ${half} 0`
  const endX = startX + Math.ceil(width / half) * half + half
  return `${d} L ${endX} ${depth} L ${startX} ${depth} Z`
}

export default function LiquidWordmark() {
  const uid = useId().replace(/:/g, '')
  const textRef = useRef(null)
  const [width, setWidth] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      if (textRef.current) setWidth(textRef.current.getBBox().width)
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [])

  const clipId = `lw-clip-${uid}`
  const liquidId = `lw-liquid-${uid}`
  const ghostId = `lw-ghost-${uid}`

  const vbTop = BASELINE - CAP_HEIGHT - PAD
  const vbHeight = CAP_HEIGHT + PAD * 2
  const vbWidth = (width ?? 430) + PAD * 2
  const viewBox = `${-PAD} ${vbTop} ${vbWidth} ${vbHeight}`

  const waves = width && {
    // Extra width so a full wavelength of horizontal drift never exposes an edge
    front: wavePath({
      startX: -WAVELENGTH,
      width: width + WAVELENGTH * 2,
      depth: CAP_HEIGHT * 2,
      wavelength: WAVELENGTH,
      amplitude: AMPLITUDE,
    }),
    back: wavePath({
      startX: -WAVELENGTH * 1.5,
      width: width + WAVELENGTH * 2,
      depth: CAP_HEIGHT * 2,
      wavelength: WAVELENGTH * 1.35,
      amplitude: AMPLITUDE * 1.5,
    }),
  }

  return (
    <svg
      className={styles.svg}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={{
        /* Clear the deepest wave trough/crest by just enough that the word reads
           fully empty at the start and fully solid at the end — any more and the
           travel wastes duration outside the letters. */
        '--rise-from': `${BASELINE + AMPLITUDE * 1.8}px`,
        '--rise-to': `${BASELINE - CAP_HEIGHT * FILL_LEVEL - AMPLITUDE * 1.8}px`,
        '--wavelength': `${WAVELENGTH}px`,
        '--wavelength-back': `${WAVELENGTH * 1.35}px`,
        /* User units per 1px of font-size — lets CSS reproduce the original
           clamp() type scale exactly, whatever the font metrics turn out to be. */
        '--w-ratio': vbWidth / 100,
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <text className={styles.text} x="0" y={BASELINE}>{WORD}</text>
        </clipPath>

        <linearGradient id={ghostId} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#003070" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id={liquidId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d8bf0" />
          <stop offset="55%" stopColor="#0057b8" />
          <stop offset="100%" stopColor="#003070" />
        </linearGradient>
      </defs>

      {/* Empty vessel */}
      <text
        ref={textRef}
        className={styles.text}
        x="0"
        y={BASELINE}
        fill={`url(#${ghostId})`}
      >
        {WORD}
      </text>

      {/* Liquid, clipped to the letterforms */}
      {waves && (
        <g clipPath={`url(#${clipId})`}>
          <g className={styles.body}>
            <path className={styles.waveBack} d={waves.back} fill={`url(#${liquidId})`} />
            <path className={styles.waveFront} d={waves.front} fill={`url(#${liquidId})`} />
          </g>
        </g>
      )}

      {/* Outline last, so the edge stays crisp over the liquid */}
      <text
        className={`${styles.text} ${styles.outline}`}
        x="0"
        y={BASELINE}
        vectorEffect="non-scaling-stroke"
      >
        {WORD}
      </text>
    </svg>
  )
}
