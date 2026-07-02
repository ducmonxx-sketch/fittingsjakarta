import { useState } from 'react'
import { FadeUp } from '../hooks'
import styles from './FAQ.module.css'

const FAQS = [
  {
    q: 'Apa saja jenis fitting pipa yang tersedia di Fittings Jakarta?',
    a: 'Fittings Jakarta menyediakan tiga kategori utama: Butt Welded Fittings untuk sistem perpipaan tekanan tinggi, Seamless Fittings untuk instalasi tahan lama, dan Forged Fittings untuk aplikasi industri berat.',
  },
  {
    q: 'Apakah Fittings Jakarta melayani pembelian B2B (perusahaan)?',
    a: 'Ya, kami siap melayani B2B (Business to Business) maupun B2C. Tersedia harga khusus untuk pembelian dalam jumlah besar. Hubungi kami via WhatsApp untuk mendapatkan penawaran harga terbaik.',
  },
  {
    q: 'Berapa lama proses pengiriman ke luar Jakarta?',
    a: 'Pengiriman ke seluruh Indonesia tersedia dengan estimasi waktu tergantung lokasi. Untuk area Jakarta dan sekitarnya biasanya 1-2 hari kerja. Hubungi kami untuk konfirmasi ketersediaan stok dan jadwal pengiriman.',
  },
  {
    q: 'Apakah produk memenuhi standar internasional?',
    a: 'Seluruh produk kami memenuhi standar internasional ASME B16.9, ASME B16.11, ANSI, dan ISO. Dokumen material test report (MTR) tersedia sesuai kebutuhan proyek Anda.',
  },
  {
    q: 'Bagaimana cara mendapatkan penawaran harga terbaik?',
    a: 'Hubungi kami langsung via WhatsApp dengan menyertakan spesifikasi kebutuhan Anda: jenis fitting, ukuran, material, dan kuantitas. Tim kami akan merespons dengan cepat dan memberikan penawaran terbaik.',
  },
]

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span>{q}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={styles.answerWrap}
        style={{ maxHeight: isOpen ? '300px' : '0' }}
      >
        <p className={`body-md ${styles.answer}`}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(prev => prev === i ? null : i)

  return (
    <section className={`section ${styles.faq}`} aria-labelledby="faq-heading">
      <div className="container">
        <FadeUp>
          <div className={styles.header}>
            <span className="badge">FAQ</span>
            <h2 id="faq-heading" className={`headline-md ${styles.title}`}>
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className={`body-lg ${styles.sub}`}>
              Temukan jawaban atas pertanyaan umum seputar produk dan layanan kami.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className={styles.list} role="list">
            {FAQS.map((f, i) => (
              <FAQItem
                key={i}
                index={i}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
