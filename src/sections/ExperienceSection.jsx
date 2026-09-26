import React from 'react';

const roles = [
  {
    title: 'Software Engineer',
    org: 'PowerXchange',
    dates: 'Oct 2025 — Present',
    current: true,
    summary: 'Backend engineering for a peer-to-peer energy trading platform, across order processing and administration.',
    highlights: [
      'Build services for order placement, matching, and settlement.',
      'Connect trading workflows with blockchain records.',
      'Provide admin APIs for analytics, reporting, and operational dashboards.',
    ],
  },
  {
    title: 'Blockchain & Full-stack Developer',
    org: 'Freelance',
    dates: 'Jun 2024 — Oct 2025',
    current: false,
    summary: 'End-to-end decentralized applications, from smart contracts to web clients.',
    highlights: [
      'Develop and deploy smart contracts and connect them to web applications.',
      'Build decentralized frontends that interact with blockchain networks.',
      'Integrate transactions and authentication across the full stack.',
      'Design backend services for blockchain-backed products.',
      'Apply tokenization, NFT, and DeFi concepts in practical prototypes.',
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="scroll-mt-28 px-5 py-16 md:py-24">
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <p className="section-kicker">Career</p>
        <h2 className="display-title">Work Timeline</h2>
      </div>

      <ol className="relative border-l border-indigo-300/70 dark:border-indigo-400/30">
        {roles.map((role) => (
          <li key={`${role.org}-${role.title}`} className="mb-8 ml-8 last:mb-0">
            <span className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-paper bg-indigo-600 dark:border-night dark:bg-indigo-300" />
            <article className="surface-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                  {role.dates}
                </p>
                {role.current && (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Now
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-serif text-2xl text-ink dark:text-paper">{role.title}</h3>
              <p className="mt-1 text-sm font-medium text-ink/60 dark:text-paper/60">{role.org}</p>
              <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75">{role.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/75 dark:text-paper/75">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ExperienceSection;
