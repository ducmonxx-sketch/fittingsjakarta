import { useState, useRef, useEffect } from 'react'
import anime from 'animejs'
import { useInView, FadeUp } from '../hooks'
import styles from './Products.module.css'

/* ─── Product catalogue data ─────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'buttweld-fittings',
    name: 'Buttweld Fittings',
    img: '/seamless.png',
    imgAlt: 'Stainless steel pipe fittings berkualitas tinggi',
    desc: 'Fitting pipa stainless steel yang tahan korosi dan higienis, ideal untuk aplikasi industri kimia, makanan & minuman, serta kelautan.',
    features: ['304/L', '306/L', 'CS / A234', 'S40', 'S80'],
    items: [
      { name: 'SS 45D LR ELBOW',             size: '1/2" - 24"', img: '/45-DEG-LONG-RADIUS-ELBOW.png' },
      { name: 'SS 90D LR ELBOW',             size: '1/2" - 24"', img: '/90-DEG-LONG RADIUS-ELBOW.png' },
      { name: 'SS EQUAL & REDUCING TEE',     size: '1/2" - 24"', img: '/EQUAL-REDUCING-TEE.png' },
      { name: 'SS CONC. & ECC. REDUCERS',    size: '1/2" - 24"', img: '/RED-ECC-RED-CON.png' },
      { name: 'SS PIPE CAP',                 size: '1/2" - 24"', img: '/PIPE-CAP.png' },
      { name: 'CS 45D LR ELBOW',             size: '1/2" - 24"', img: '/cs-45-elbow.png' },
      { name: 'CS 90D LR ELBOW',             size: '1/2" - 24"', img: '/cs-90-elbow.png' },
      { name: 'CS EQUAL & REDUCING TEE',     size: '1/2" - 24"', img: '/cs-tee.png' },
      { name: 'CS CONC. & ECC. REDUCERS',    size: '1/2" - 24"', img: '/cs-reducers.png' },
      { name: 'CS PIPE CAP',                 size: '1/2" - 24"', img: '/cs-pipe-cap.png' },
    ],
  },
  {
    id: 'forged-fittings',
    name: 'Forged Fittings',
    img: '/butt-welded.png',
    imgAlt: 'Carbon steel pipe fittings untuk sistem perpipaan tugas berat',
    desc: 'Fitting pipa carbon steel yang kuat dan andal untuk sistem perpipaan industri, konstruksi, struktur, dan tekanan tinggi.',
    features: ['304/L', '316/L', 'A105'],
    items: [
      { name: 'SS FORGED ELBOWS (45 & 90)', size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'SS FORGED TEE (EQ & RED)',   size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'SS FORGE COUPLING',          size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'SS UNION',                   size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'SS OLETS',                   size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'SS NIPPLE',                  size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'SS FORGED CAP',              size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'SS WELDING BOSS',            size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'IRON FORGED ELBOWS (45 & 90)', size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'IRON FORGED TEE (EQ & RED)',   size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'IRON FORGE COUPLING',          size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'IRON UNION',                   size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'IRON OLETS',                   size: '1/4" - 4"', img: '/fg-socket.png' },
      { name: 'IRON NIPPLE',                  size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'IRON FORGED CAP',              size: '1/4" - 4"', img: '/fg-threaded.png' },
      { name: 'IRON WELDING BOSS',            size: '1/4" - 4"', img: '/fg-socket.png' },
    ],
  },
  {
    id: 'more-fittings',
    name: 'More Fittings',
    img: '/more-fittings-thumb.png',
    imgAlt: 'Berbagai jenis fitting tambahan untuk kebutuhan perpipaan industri',
    desc: 'Koleksi fitting tambahan meliputi flange, gasket, bolt & nut, valve, dan aksesoris perpipaan lainnya untuk melengkapi sistem perpipaan Anda.',
    features: ['Multi-Category', 'All Materials', 'Custom Order'],
    items: [
      { name: 'SS Camlock',          size: '1/2" - 8"', img: '/bw-elbow.png' },
      { name: 'Aluminium Camlock',   size: '1/2" - 8"', img: '/bw-elbow.png' },
      { name: 'SS Pipe Nipple',      size: '1/8" - 4"', img: '/fg-threaded.png' },
      { name: 'CS Pipe Nipple',      size: '1/8" - 4"', img: '/fg-threaded.png' },
      { name: '304/L Fitting SS #150', size: '1/8" - 4"', img: '/sm-reducer.png' },
      { name: '306/L Fitting SS #150', size: '1/8" - 4"', img: '/sm-reducer.png' },
      { name: 'Sanitary',            size: '1/2" - 4"', img: '/fg-socket.png' },
    ],
  },
]

/* ─── Smooth height drawer ───────────────────────────────────────── */
function SmoothDrawer({ isOpen, children, id }) {
  const innerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    if (isOpen) {
      // Measure then animate to real height
      setHeight(el.scrollHeight)
    } else {
      // Snap to current scrollHeight first, then drop to 0 in next paint
      setHeight(el.scrollHeight)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setHeight(0))
      )
    }
  }, [isOpen])

  return (
    <div
      id={id}
      className={styles.drawer}
      style={{ maxHeight: isOpen ? height : 0 }}
      aria-hidden={!isOpen}
    >
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

/* ─── Drawer content ─────────────────────────────────────────────── */
function DrawerContent({ product, isOpen }) {
  return (
    <div className={styles.drawerInner}>
      {/* Header */}
      <div className={styles.drawerHeader}>
        <div className={styles.drawerMeta}>
          <span className={styles.drawerCount}>{product.items.length} Produk</span>
          <h3 className={styles.drawerTitle}>{product.name}</h3>
          {product.features && (
            <p className={styles.drawerMaterials}>
              Materials: {product.features.join(', ')}
            </p>
          )}
        </div>
        <p className={styles.drawerNote}>
          Hubungi kami via WhatsApp untuk stok &amp; harga terbaik.
        </p>
      </div>

      {/* Product grid */}
      <div className={styles.itemGrid} role="list">
        {product.items.map((item, idx) => (
          <div
            key={idx}
            className={styles.item}
            role="listitem"
            style={isOpen ? { animationDelay: `${idx * 0.04}s` } : { animation: 'none' }}
          >
            <div className={styles.itemImgWrap}>
              <img
                src={item.img}
                alt={item.name}
                className={styles.itemImg}
                loading="lazy"
                decoding="async"
              />
              {/* Spec overlay on hover */}
              <div className={styles.itemOverlay}>
                <div className={styles.itemSpec}>
                  <span className={styles.itemSpecName}>{item.name}</span>
                  <span className={styles.itemSpecSize}>{item.size}</span>
                </div>
              </div>
            </div>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemSize}>{item.size}</span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className={styles.drawerFooter}>
        <p className={styles.drawerFooterText}>Butuh spesifikasi khusus atau ukuran lain?</p>
        <a
          href="https://wa.me/6221XXXXXXXX"
          className={`btn btn-primary ${styles.drawerFooterBtn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ── Expand/collapse icon for image overlay ────────────────── */
function ExpandIcon({ isOpen }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {isOpen ? (
        /* Collapse icon (chevrons inward) */
        <>
          <path d="M4 14h6v6" />
          <path d="M20 10h-6V4" />
          <path d="M14 10l7-7" />
          <path d="M3 21l7-7" />
        </>
      ) : (
        /* Expand icon (arrows outward) */
        <>
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
        </>
      )}
    </svg>
  )
}

/* ── Clickable image wrapper ────────────────────────────── */
function ProductImage({ product, isOpen, onClick }) {
  return (
    <div
      className={styles.imgWrap}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? `Tutup ${product.name}` : `Lihat produk ${product.name}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
    >
      <img src={product.img} alt={product.imgAlt} className={styles.img} loading="lazy" decoding="async" itemProp="image" />
      <div className={styles.imgOverlay} />
      {/* Hover overlay with expand icon */}
      <div className={styles.imgClickOverlay}>
        <span className={styles.imgClickIcon}>
          <ExpandIcon isOpen={isOpen} />
        </span>
        <span className={styles.imgClickLabel}>
          {isOpen ? 'Tutup Produk' : 'Lihat Produk'}
        </span>
      </div>
    </div>
  )
}

/* ── Toggle button ──────────────────────────────────────── */
function ToggleBtn({ isOpen, count, onClick, targetId }) {
  return (
    <button
      className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={targetId}
    >
      <span className={styles.toggleLabel}>
        {isOpen ? 'Tutup Produk' : 'Lihat Produk'}
      </span>
      <span className={styles.toggleRight}>
        <span className={styles.toggleCount}>{count} item</span>
        <svg
          className={`${styles.toggleChevron} ${isOpen ? styles.toggleChevronOpen : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
    </button>
  )
}

/* ─── Main Products section ──────────────────────────────────────── */
export default function Products() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(prev => (prev === id ? null : id))
  
  const [sectionRef, inView] = useInView({ threshold: 0.1 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      anime({
        targets: '.product-card-stagger',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      })
    }
  }, [inView])

  return (
    <section id="products" className={`section ${styles.products}`} aria-labelledby="products-heading" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className={`${styles.ambientGlow} ${expanded ? styles.ambientGlowActive : ''}`} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <div className={styles.sectionHeader}>
            <span className="badge">Produk Kami</span>
            <h2 id="products-heading" className={`headline-md ${styles.title}`}>
              Kategori Produk Fitting Pipa Industri
            </h2>
            <p className={`body-lg ${styles.subtitle}`}>
              Tiga kategori utama fitting pipa industri berkualitas tinggi sesuai standar internasional.
              Klik <strong>gambar</strong> atau <strong>Lihat Produk</strong> untuk melihat daftar lengkap beserta spesifikasi ukuran.
            </p>
          </div>
        </FadeUp>

        {/* ── Mobile layout: drawer lives INSIDE each card ── */}
        <div className={styles.mobileStack}>
          {PRODUCTS.map((p, i) => {
            const isOpen = expanded === p.id
            const drawerId = `drawer-mobile-${p.id}`
            return (
              <div key={p.id} className="product-card-stagger" style={{ opacity: 0 }}>
                <article
                  className={`card ${styles.card} ${isOpen ? styles.cardActive : ''}`}
                  aria-labelledby={`product-m-${p.id}`}
                  itemScope itemType="https://schema.org/Product"
                >
                  <div className={styles.accentBar} />
                  <ProductImage product={p} isOpen={isOpen} onClick={() => toggle(p.id)} />
                  <div className={styles.body}>
                    <h3 id={`product-m-${p.id}`} className={`headline-sm ${styles.name}`} itemProp="name">{p.name}</h3>
                    <p className={`body-md ${styles.desc}`} itemProp="description">{p.desc}</p>
                    <ul className={styles.features} aria-label="Spesifikasi">
                      {p.features.map(f => <li key={f}><span className={styles.chip}>{f}</span></li>)}
                    </ul>
                    <ToggleBtn isOpen={isOpen} count={p.items.length} onClick={() => toggle(p.id)} targetId={drawerId} />
                  </div>
                  {/* Inline drawer — always inside card on mobile */}
                  <SmoothDrawer id={drawerId} isOpen={isOpen}>
                    <DrawerContent product={p} isOpen={isOpen} />
                  </SmoothDrawer>
                </article>
              </div>
            )
          })}
        </div>

        {/* ── Desktop layout: cards in row, drawer spans full width below ── */}
        <div className={styles.desktopGrid}>
          <div className={styles.grid}>
            {PRODUCTS.map((p, i) => {
              const isOpen = expanded === p.id
              const isDimmed = expanded !== null && !isOpen
              const drawerId = `drawer-desk-${p.id}`
              return (
                <div key={p.id} className={`product-card-stagger ${styles.staggerItem}`} style={{ opacity: 0 }}>
                  <article
                    className={`card ${styles.card} ${isOpen ? styles.cardActive : ''} ${isDimmed ? styles.cardDimmed : ''}`}
                    aria-labelledby={`product-d-${p.id}`}
                    itemScope itemType="https://schema.org/Product"
                  >
                    <div className={styles.accentBar} />
                    <ProductImage product={p} isOpen={isOpen} onClick={() => toggle(p.id)} />
                    <div className={styles.body}>
                      <h3 id={`product-d-${p.id}`} className={`headline-sm ${styles.name}`} itemProp="name">{p.name}</h3>
                      <p className={`body-md ${styles.desc}`} itemProp="description">{p.desc}</p>
                      <ul className={styles.features} aria-label="Spesifikasi">
                        {p.features.map(f => <li key={f}><span className={styles.chip}>{f}</span></li>)}
                      </ul>
                      <ToggleBtn isOpen={isOpen} count={p.items.length} onClick={() => toggle(p.id)} targetId={drawerId} />
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          {/* Full-width drawers below grid — one per category */}
          {PRODUCTS.map(p => (
            <SmoothDrawer key={p.id} id={`drawer-desk-${p.id}`} isOpen={expanded === p.id}>
              <DrawerContent product={p} isOpen={expanded === p.id} />
            </SmoothDrawer>
          ))}
        </div>
      </div>
    </section>
  )
}
