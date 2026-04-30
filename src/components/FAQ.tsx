import { useState } from 'react';

const questionsData = {
  fr: [
    {
      q: "L'ostéopathie s'adresse-t-elle à tout le monde ?",
      a: "Oui, de la naissance jusqu'au grand âge. Nourrissons, enfants, sportifs, femmes enceintes et seniors peuvent tous consulter. Cécile adapte son approche à chaque profil et à chaque situation.",
    },
    {
      q: "Faut-il une ordonnance pour consulter ?",
      a: "Non. L'ostéopathie est accessible sans ordonnance médicale. Vous pouvez prendre rendez-vous directement par téléphone. Si vous avez un suivi médical en cours, il est utile d'en informer Cécile lors de la consultation.",
    },
    {
      q: "L'ostéopathie est-elle remboursée ?",
      a: "Le remboursement varie selon votre mutuelle et votre formule. Nous vous invitons à vous renseigner directement auprès de votre organisme pour connaître vos conditions de prise en charge.",
    },
    {
      q: "Comment se préparer à une première séance ?",
      a: "Prévoyez une tenue confortable pour la séance. Si vous avez des radios ou IRM en lien avec votre douleur, pensez à les apporter. Cécile s'occupe du reste.",
    },
  ],
  en: [
    {
      q: "Is osteopathy suitable for everyone?",
      a: "Yes, from birth to old age. Infants, children, athletes, pregnant women and seniors can all benefit. Cécile adapts her approach to each individual and situation.",
    },
    {
      q: "Do I need a referral to book an appointment?",
      a: "No. Osteopathy is accessible without a medical prescription. You can book an appointment directly by phone. If you are currently under medical supervision, it is helpful to mention this to Cécile at the start of your consultation.",
    },
    {
      q: "Is osteopathy covered by insurance?",
      a: "Coverage depends on your health insurance plan. We recommend checking directly with your insurer to find out the reimbursement conditions included in your policy.",
    },
    {
      q: "How should I prepare for my first session?",
      a: "Wear comfortable clothing for the session. If you have X-rays or MRI scans related to your pain, bring them along. Cécile will take care of the rest.",
    },
  ],
};

export default function FAQ({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const [open, setOpen] = useState<number | null>(null);
  const questions = questionsData[lang];

  return (
    <div className="faq-list">
      {questions.map((item, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-label={item.q}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
          </button>
          <div className="faq-answer">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
      <style>{`
        .faq-list { max-width: 720px; margin: 0 auto; }
        .faq-item {
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .faq-question {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 22px 0; background: none; border: none; cursor: pointer;
          text-align: left; gap: 16px;
        }
        .faq-question span:first-child {
          font-size: 16px; font-weight: 500; color: var(--text-dark); line-height: 1.4;
        }
        .faq-icon {
          font-size: 22px; color: var(--sage); flex-shrink: 0;
          transition: transform 0.3s;
        }
        .faq-item.open .faq-icon { transform: rotate(0deg); }
        .faq-answer {
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
          padding: 0;
        }
        .faq-item.open .faq-answer {
          max-height: 600px;
          padding-bottom: 20px;
        }
        .faq-answer p {
          font-size: 15px; color: var(--text-mid); line-height: 1.8; margin: 0;
        }
      `}</style>
    </div>
  );
}
