import { useState } from 'react';

const questions = [
  {
    q: "L'ostéopathie, c'est pour qui ?",
    a: "L'ostéopathie s'adresse à tous : nourrissons, enfants, adultes, femmes enceintes et personnes âgées. Elle traite les douleurs musculo-squelettiques, les maux de tête, les troubles digestifs, et bien d'autres situations. Chaque prise en charge est adaptée à l'âge et à l'état de santé du patient.",
  },
  {
    q: "Faut-il une ordonnance pour consulter ?",
    a: "Non. L'ostéopathie est accessible en accès direct, sans ordonnance médicale. Vous pouvez prendre rendez-vous directement au cabinet. Cependant, si vous avez un suivi médical en cours, il est utile d'en informer l'ostéopathe lors de la consultation.",
  },
  {
    q: "Combien de temps dure une séance ?",
    a: "Une première consultation dure entre 45 minutes et 1 heure. Elle inclut un entretien sur vos douleurs et votre historique médical, un bilan postural, puis le traitement. Les séances suivantes sont un peu plus courtes.",
  },
  {
    q: "L'ostéopathie est-elle remboursée ?",
    a: "La Sécurité Sociale ne rembourse pas les consultations d'ostéopathie. En revanche, de nombreuses mutuelles complémentaires prennent en charge tout ou partie du tarif. Renseignez-vous auprès de votre mutuelle avant votre premier rendez-vous.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

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
