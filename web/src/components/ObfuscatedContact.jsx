/**
 * src/components/ObfuscatedContact.jsx
 *
 * The web-exposed, bot-hidden email (the creadev `ObfuscatedContact` model,
 * labs/prd-dhaupin-portfolio.md section 4.5). The prerendered HTML ships only a
 * broken-up placeholder ("hello [at] creadev [dot] org"); the real mailto: href
 * and the readable address are assembled in an effect, so a browser that runs
 * JS sees them and a scraper reading the baked HTML gets no machine-readable
 * address.
 *
 * Hydration parity: the first client render MUST match the prerendered markup,
 * so state starts empty and the effect fills it in after mount. The address is
 * read from site.config.js (portfolio.contact), never hand-typed.
 */
import { useEffect, useState } from 'react'
import site from '../site.js'

export default function ObfuscatedContact() {
  const { user, domain } = site.contact
  const [addr, setAddr] = useState('')

  useEffect(() => {
    setAddr(`${user}@${domain}`)
  }, [user, domain])

  // The static placeholder: broken up so a naive email regex finds nothing.
  const placeholder = `${user} [at] ${domain.split('.').join(' [dot] ')}`

  if (!addr) {
    return <span className="obf-email">{placeholder}</span>
  }
  return <a className="obf-email" href={`mailto:${addr}`}>{addr}</a>
}
