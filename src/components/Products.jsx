import { useState, useRef, useEffect, useCallback } from 'react'
import anime from 'animejs'
import { useInView, FadeUp } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import styles from './Products.module.css'


/* ─── Product catalogue data ─────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'buttweld-fittings',
    name: 'Buttweld Fittings',
    img: '/buttweld_thumbnail_white.webp',
    imgAlt: 'Stainless steel pipe fittings berkualitas tinggi',
    desc: 'Fitting pipa stainless steel yang tahan korosi dan higienis, ideal untuk aplikasi industri kimia, makanan & minuman, serta kelautan.',
    features: ['304/L', '316/L', 'CS / A234', 'S40', 'S80'],
    items: [
      { name: 'SS 45D LR ELBOW',             size: '1/2" - 24"', img: '/Buttweld-SS/Rev - 45 Deg Long Radius Elbow.webp', group: 'Stainless Steel' },
      { name: 'SS 90D LR ELBOW',             size: '1/2" - 24"', img: '/Buttweld-SS/Rev - 90 Deg Radius Elbow.webp', group: 'Stainless Steel' },
      { name: 'SS EQUAL & REDUCING TEE',     size: '1/2" - 24"', img: '/Buttweld-SS/Rev - Equal & Reducing Tee.webp', group: 'Stainless Steel' },
      { name: 'SS CONC. & ECC. REDUCERS',    size: '1/2" - 24"', img: '/Buttweld-SS/Rev - Concentric & Eccentric Reducers.webp', group: 'Stainless Steel' },
      { name: 'SS PIPE CAP',                 size: '1/2" - 24"', img: '/Buttweld-SS/Rev - Pipe Cap.webp', group: 'Stainless Steel' },
      { name: 'CS 45D LR ELBOW',             size: '1/2" - 24"', img: '/Buttweld-CS/Rev - 45 Deg Long Radius Elbow.webp', group: 'Carbon Steel' },
      { name: 'CS 90D LR ELBOW',             size: '1/2" - 24"', img: '/Buttweld-CS/Rev - 90 Deg Radius Elbow.webp', group: 'Carbon Steel' },
      { name: 'CS EQUAL & REDUCING TEE',     size: '1/2" - 24"', img: '/Buttweld-CS/Rev - Equal & Reducing Tee.webp', group: 'Carbon Steel' },
      { name: 'CS CONC. & ECC. REDUCERS',    size: '1/2" - 24"', img: '/Buttweld-CS/Rev - Concentric & Eccentric Reducers.webp', group: 'Carbon Steel' },
      { name: 'CS PIPE CAP',                 size: '1/2" - 24"', img: '/Buttweld-CS/Rev - Pipe Cap.webp', group: 'Carbon Steel' },
    ],
  },
  {
    id: 'forged-fittings',
    name: 'Forged Fittings',
    img: '/forged_thumbnail_white.webp',
    imgAlt: 'Carbon steel pipe fittings untuk sistem perpipaan tugas berat',
    desc: 'Fitting pipa carbon steel yang kuat dan andal untuk sistem perpipaan industri, konstruksi, struktur, dan tekanan tinggi.',
    features: ['304/L', '316/L', 'A105'],
    items: [
      { name: 'SS FORGED ELBOWS (45 & 90)', size: '1/4" - 4"', img: '/Forged - SS/Rev - Forged Elbows.webp', group: 'Stainless Steel' },
      { name: 'SS FORGED TEE (EQ & RED)',   size: '1/4" - 4"', img: '/Forged - SS/Rev - Forged Tee.webp', group: 'Stainless Steel' },
      { name: 'SS FORGE COUPLING',          size: '1/4" - 4"', img: '/Forged - SS/Rev - Forge Coupling.webp', group: 'Stainless Steel' },
      { name: 'SS UNION',                   size: '1/4" - 4"', img: '/Forged - SS/Rev - Union.webp', group: 'Stainless Steel' },
      { name: 'SS OLETS',                   size: '1/4" - 4"', img: '/Forged - SS/Rev - Olets.webp', group: 'Stainless Steel' },
      { name: 'SS NIPPLE',                  size: '1/4" - 4"', img: '/Forged - SS/Rev - Nipple.webp', group: 'Stainless Steel' },
      { name: 'SS FORGED CAP',              size: '1/4" - 4"', img: '/Forged - SS/Rev - Forged Caps.webp', group: 'Stainless Steel' },
      { name: 'SS WELDING BOSS',            size: '1/4" - 4"', img: '/Forged - SS/Rev - Welding Boss.webp', group: 'Stainless Steel' },
      { name: 'CS FORGED ELBOWS (45 & 90)', size: '1/4" - 4"', img: '/Forged-CS/Rev - Forged Elbows.webp', group: 'Carbon Steel' },
      { name: 'CS FORGED TEE (EQ & RED)',   size: '1/4" - 4"', img: '/Forged-CS/Rev - Forged Tee.webp', group: 'Carbon Steel' },
      { name: 'CS FORGE COUPLING',          size: '1/4" - 4"', img: '/Forged-CS/Rev - Forge Coupling.webp', group: 'Carbon Steel' },
      { name: 'CS UNION',                   size: '1/4" - 4"', img: '/Forged-CS/Rev - Union.webp', group: 'Carbon Steel' },
      { name: 'CS OLETS',                   size: '1/4" - 4"', img: '/Forged-CS/Rev - Olets.webp', group: 'Carbon Steel' },
      { name: 'CS NIPPLE',                  size: '1/4" - 4"', img: '/Forged-CS/Rev - Nipple.webp', group: 'Carbon Steel' },
      { name: 'CS FORGED CAP',              size: '1/4" - 4"', img: '/Forged-CS/Rev - Forged Caps.webp', group: 'Carbon Steel' },
      { name: 'CS WELDING BOSS',            size: '1/4" - 4"', img: '/Forged-CS/Rev - Welding Boss.webp', group: 'Carbon Steel' },
    ],
  },
  {
    id: 'more-fittings',
    name: 'More Fittings',
    img: '/more_fittings_thumbnail_white.webp',
    imgAlt: 'Berbagai jenis fitting tambahan untuk kebutuhan perpipaan industri',
    desc: 'Koleksi fitting tambahan meliputi flange, gasket, bolt & nut, valve, dan aksesoris perpipaan lainnya untuk melengkapi sistem perpipaan Anda.',
    features: ['Multi-Category', 'All Materials', 'Custom Order'],
    items: [
      { name: 'SS Camlock',          size: '1/2" - 8"', img: '/More-Fittings/Camlock.webp', group: 'Camlock' },
      { name: 'Aluminium Camlock',   size: '1/2" - 8"', img: '/More-Fittings/Camlock-Aluminium.webp', group: 'Camlock' },
      { name: 'SS Pipe Nipple',      size: '1/8" - 4"', img: '/More-Fittings/Pipe Nipple.webp', group: 'Pipe Nipple' },
      { name: 'CS Pipe Nipple',      size: '1/8" - 4"', img: '/More-Fittings/Pipe Nipple-CS.webp', group: 'Pipe Nipple' },
      { name: '304/L Fitting SS #150', size: '1/8" - 4"', img: '/More-Fittings/304-316-150.webp', group: 'Fittings & Sanitary' },
      { name: '316/L Fitting SS #150', size: '1/8" - 4"', img: '/More-Fittings/304-316-150.webp', group: 'Fittings & Sanitary' },
      { name: 'Sanitary',            size: '1/2" - 4"', img: '/More-Fittings/sanitary.webp', group: 'Fittings & Sanitary' },
    ],
  },
]

/* ─── Helper: extract unique groups in order ────────────────── */
function getGroups(items) {
  const seen = new Set()
  return items.reduce((acc, item) => {
    if (!seen.has(item.group)) {
      seen.add(item.group)
      acc.push(item.group)
    }
    return acc
  }, [])
}

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

/* ─── Material tabs ──────────────────────────────────────────────── */
function MaterialTabs({ groups, activeGroup, onChange, items }) {
  const { t } = useLanguage()
  return (
    <div className={styles.materialTabs} role="tablist" aria-label="Material categories">
      {groups.map(g => {
        const count = items.filter(i => i.group === g).length
        const groupLabel = t(`products.groups.${g}`) || g
        return (
          <button
            key={g}
            role="tab"
            aria-selected={activeGroup === g}
            className={`${styles.materialTab} ${activeGroup === g ? styles.materialTabActive : ''}`}
            onClick={() => onChange(g)}
          >
            <span>{groupLabel}</span>
            <span className={styles.materialTabCount}>({count})</span>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Drawer content (grouped with material tabs) ────────────────── */
function DrawerContentGrouped({ product, isOpen }) {
  const { t } = useLanguage()
  const groups = getGroups(product.items)
  const [activeGroup, setActiveGroup] = useState(groups[0])
  const gridRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isOpen) {
      setActiveGroup(groups[0])
      isFirstRender.current = true
      product.items.forEach(item => {
        if (item.img) {
          const img = new Image()
          img.src = item.img
        }
      })
    }
  }, [isOpen])

  const handleTabChange = useCallback((group) => {
    setActiveGroup(group)
    isFirstRender.current = false
  }, [])

  useEffect(() => {
    if (!isOpen || isFirstRender.current) return
    const el = gridRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-glass-item]')
    if (items.length === 0) return

    anime({
      targets: items,
      translateY: [16, 0],
      opacity: [0, 1],
      delay: anime.stagger(40),
      duration: 500,
      easing: 'easeOutCubic',
    })
  }, [activeGroup, isOpen])

  const filtered = product.items.filter(i => i.group === activeGroup)
  const categoryKey = product.id.split('-')[0]
  const translatedName = t(`products.categories.${categoryKey}.name`) || product.name

  return (
    <div className={styles.drawerInner}>
      <div className={styles.drawerHeader}>
        <div className={styles.drawerMeta}>
          <span className={styles.drawerCount}>
            {product.items.length} {t('products.itemsCount')}
          </span>
          <h3 className={styles.drawerTitle}>{translatedName}</h3>
          {product.features && (
            <p className={styles.drawerMaterials}>
              {t('products.specMaterial')}: {product.features.join(', ')}
            </p>
          )}
        </div>
        <p className={styles.drawerNote}>
          {t('products.drawerNote')}
        </p>
      </div>

      <MaterialTabs
        groups={groups}
        activeGroup={activeGroup}
        onChange={handleTabChange}
        items={product.items}
      />

      <div className={styles.tabContent} role="tabpanel" aria-label={`Produk ${activeGroup}`}>
        <div className={styles.itemGrid} role="list" ref={gridRef}>
          {filtered.map((item, idx) => (
            <div
              key={`${activeGroup}-${idx}`}
              className={styles.glassItem}
              role="listitem"
              data-glass-item
              style={isOpen && isFirstRender.current
                ? { animationDelay: `${idx * 0.04}s` }
                : isOpen
                  ? {}
                  : { animation: 'none' }
              }
            >
              <div className={styles.glassItemImgWrap}>
                <img
                  src={item.img}
                  alt={item.name}
                  className={item.name.startsWith('SS ') ? styles.itemImgSS : styles.itemImg}
                />
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
      </div>

      <div className={styles.ctaBanner}>
        <p className={styles.ctaBannerText}>{t('products.ctaBannerText')}</p>
        <a
          href="https://wa.me/6221XXXXXXXX"
          className={`btn btn-primary ${styles.ctaBannerBtn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t('products.ctaBannerBtn')}
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
        <>
          <path d="M4 14h6v6" />
          <path d="M20 10h-6V4" />
          <path d="M14 10l7-7" />
          <path d="M3 21l7-7" />
        </>
      ) : (
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
  const { t } = useLanguage()
  const categoryKey = product.id.split('-')[0]
  const translatedName = t(`products.categories.${categoryKey}.name`) || product.name

  return (
    <div
      className={styles.imgWrap}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? `${t('products.hideSpecs')} ${translatedName}` : `${t('products.viewSpecs')} ${translatedName}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
    >
      <img src={product.img} alt={product.imgAlt} className={styles.img} loading="lazy" decoding="async" itemProp="image" />
      <div className={styles.imgOverlay} />
      <div className={styles.imgClickOverlay}>
        <span className={styles.imgClickIcon}>
          <ExpandIcon isOpen={isOpen} />
        </span>
        <span className={styles.imgClickLabel}>
          {isOpen ? t('products.hideSpecs') : t('products.viewSpecs')}
        </span>
      </div>
    </div>
  )
}

/* ── Toggle button ──────────────────────────────────────── */
function ToggleBtn({ isOpen, count, onClick, targetId }) {
  const { t } = useLanguage()
  return (
    <button
      className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={targetId}
    >
      <span className={styles.toggleLabel}>
        {isOpen ? t('products.hideSpecs') : t('products.viewSpecs')}
      </span>
      <span className={styles.toggleRight}>
        <span className={styles.toggleCount}>{count} {t('products.itemsCountSuffix')}</span>
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
  const { t } = useLanguage()
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
      <div className={`${styles.ambientGlow} ${expanded ? styles.ambientGlowActive : ''}`} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <div className={styles.sectionHeader}>
            <span className="badge">{t('products.tag')}</span>
            <h2 id="products-heading" className={`headline-md ${styles.title}`}>
              {t('products.title')}
            </h2>
            <p className={`body-lg ${styles.subtitle}`}>
              {t('products.subtitle')}
            </p>
          </div>
        </FadeUp>

        <div className={styles.mobileStack}>
          {PRODUCTS.map((p) => {
            const isOpen = expanded === p.id
            const drawerId = `drawer-mobile-${p.id}`
            const categoryKey = p.id.split('-')[0]
            const translatedName = t(`products.categories.${categoryKey}.name`) || p.name
            const translatedDesc = t(`products.categories.${categoryKey}.desc`) || p.desc

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
                    <h3 id={`product-m-${p.id}`} className={`headline-sm ${styles.name}`} itemProp="name">{translatedName}</h3>
                    <p className={`body-md ${styles.desc}`} itemProp="description">{translatedDesc}</p>
                    <ul className={styles.features} aria-label="Spesifikasi">
                      {p.features.map(f => <li key={f}><span className={styles.chip}>{f}</span></li>)}
                    </ul>
                    <ToggleBtn isOpen={isOpen} count={p.items.length} onClick={() => toggle(p.id)} targetId={drawerId} />
                  </div>
                  <SmoothDrawer id={drawerId} isOpen={isOpen}>
                    <DrawerContentGrouped product={p} isOpen={isOpen} />
                  </SmoothDrawer>
                </article>
              </div>
            )
          })}
        </div>

        <div className={styles.desktopGrid}>
          <div className={styles.grid}>
            {PRODUCTS.map((p) => {
              const isOpen = expanded === p.id
              const isDimmed = expanded !== null && !isOpen
              const drawerId = `drawer-desk-${p.id}`
              const categoryKey = p.id.split('-')[0]
              const translatedName = t(`products.categories.${categoryKey}.name`) || p.name
              const translatedDesc = t(`products.categories.${categoryKey}.desc`) || p.desc

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
                      <h3 id={`product-d-${p.id}`} className={`headline-sm ${styles.name}`} itemProp="name">{translatedName}</h3>
                      <p className={`body-md ${styles.desc}`} itemProp="description">{translatedDesc}</p>
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

          {PRODUCTS.map(p => (
            <SmoothDrawer key={p.id} id={`drawer-desk-${p.id}`} isOpen={expanded === p.id}>
              <DrawerContentGrouped product={p} isOpen={expanded === p.id} />
            </SmoothDrawer>
          ))}
        </div>
      </div>
    </section>
  )
}
