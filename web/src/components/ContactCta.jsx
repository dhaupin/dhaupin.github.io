/**
 * src/components/ContactCta.jsx
 *
 * The shared contact call-to-action: one block, rendered on the footer and the
 * arms, so the email and the invitation cannot drift between placements
 * (labs/prd-dhaupin-portfolio.md section 4.5). The address itself comes from
 * ObfuscatedContact, so this file carries no literal.
 */
import ObfuscatedContact from './ObfuscatedContact.jsx'

export default function ContactCta() {
  return (
    <div className="contact-cta">
      <p className="cta-line">Have a project, an idea, or a question?</p>
      <p>
        Email <ObfuscatedContact /> - or open an issue on the repos if it is a
        bug or a request that belongs in the tracker.
      </p>
    </div>
  )
}
