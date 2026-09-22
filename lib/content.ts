// Bilingual content for the Natal Capital Pro. site.
//
// Every string the page renders lives here, keyed by language, so a section
// component only has to read `content[lang]` and lay it out. The markup and
// styling (styles/globals.css) stay identical between FR and EN — only the
// text below changes.

export type Lang = 'fr' | 'en';

/** Icon keys resolved to SVGs in components/Icons.tsx. */
export type IconName =
  | 'services'
  | 'programs'
  | 'globe'
  | 'apply'
  | 'research'
  | 'bank'
  | 'valuation';

export interface NavItem {
  href: string;
  label: string;
}

export interface Door {
  href: string;
  icon: IconName;
  title: string;
  text: string;
}

export interface Service {
  icon: IconName;
  /** Anchor id, when the card is a link target (e.g. #expansion-marches). */
  id?: string;
  /** Optional photo shown above the icon. */
  thumb?: string;
  title: string;
  body: string;
}

export interface ProgramCard {
  title: string;
  items: string[];
}

export interface Term {
  title: string;
  body: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
  /** Plain grey lines shown under the links (tagline, office addresses…). */
  notes?: string[];
}

// ---------- Forms ----------

export type FieldType = 'text' | 'checkbox' | 'select' | 'textarea';

export interface Field {
  type: FieldType;
  /** Unique key: used as the input `name` and as the email field label. */
  name: string;
  /** Visible label. */
  label: string;
  /** Options for `select` (the first entry is the empty placeholder). */
  options?: string[];
}

export interface FieldRow {
  /** How many columns the row splits into on wide screens. */
  cols: 1 | 2 | 3;
  fields: Field[];
}

export interface FormBlock {
  title?: string;
  note?: string;
  rows: FieldRow[];
}

/** Subject / intro / reminder used for Web3Forms and the mailto fallback. */
export interface MailMeta {
  subject: string;
  intro: string;
  reminder?: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  ticker: { text: string; cta: string };
  utilityTagline: string;
  nav: NavItem[];
  hero: {
    titleLead: string;
    titleAccent: string;
    sub: string;
    ctaPrimary: string;
    ctaGhost: string;
  };
  doors: Door[];
  featured: { kicker: string; title: string; body: string; cta: string };
  services: {
    kicker: string;
    title: string;
    desc: string;
    serviceLink: string;
    items: Service[];
  };
  solutions: {
    bannerLabel: string;
    kicker: string;
    title: string;
    desc: string;
    cards: ProgramCard[];
    form: { title: string; note: string; blocks: FormBlock[]; submit: string };
    mail: MailMeta;
  };
  positioning: {
    tagLabel: string;
    tagValue: string;
    title: string;
    paragraphs: string[];
  };
  proof: {
    stats: { icon: IconName; value: string; label: string }[];
  };
  programs: {
    kicker: string;
    title: string;
    desc: string;
    renfort: {
      badge: string;
      name: string;
      tagline: string;
      body: string;
      items: string[];
      terms: Term[];
    };
    workingCapital: {
      badge: string;
      title: string;
      body: string;
      items: string[];
    };
    cta: string;
  };
  about: {
    kicker: string;
    title: string;
    name: string;
    role: string;
    quote: string;
    bio: string[];
  };
  articles: { kicker: string; title: string; categories: string[] };
  finance: {
    kicker: string;
    title: string;
    desc: string;
    blocks: FormBlock[];
    submit: string;
    mail: MailMeta;
  };
  contact: {
    kicker: string;
    title: string;
    desc: string;
    phoneLabel: string;
    emailLabel: string;
    ctaEmail: string;
    ctaCall: string;
  };
  footer: { tagline: string; columns: FooterColumn[]; copyright: string };
  formStatus: {
    sending: string;
    ok: string;
    errorPre: string;
    errorLink: string;
  };
}

// ---------- Shared constants (identical in both languages) ----------

export const CONTACT = {
  phone: '(438) 802-4007',
  phoneHref: 'tel:+14388024007',
  email: 'natcapro@gmail.com',
  emailHref: 'mailto:natcapro@gmail.com',
} as const;

export const IMAGES = {
  logo: '/logo.png',
  featured: '/featured-renfort.jpg',
  expansion: '/service-expansion.jpg',
  solutionsBanner: '/solutions-banner.jpg',
  marc: '/marc-nguesson.jpg',
} as const;

/** Partners & backers shown as a logo row (same in both languages). */
export const PARTNERS: { name: string; logo: string }[] = [
  { name: 'Mitacs', logo: '/mitacs.png' },
  { name: 'Exportation et développement Canada', logo: '/edc.png' },
  { name: "Centre de transfert d'entreprise du Québec", logo: '/cteq.png' },
  {
    name: 'Centre for Canadian Innovation and Competitiveness',
    logo: '/centre_canadien.png',
  },
  { name: 'Gouvernement du Québec', logo: '/quebec.png' },
  { name: 'Gouvernement du Canada', logo: '/canada.png' },
];

export const LEGAL_NAME = 'Natal Capital Projects Inc.';

// ---------- Content ----------

export const content: Record<Lang, SiteContent> = {
  fr: {
    meta: {
      title: 'Natal Capital Pro. | Recherche et conseil en investissement',
      description:
        "Natal Capital Pro. accompagne entrepreneurs, entreprises et institutions dans la structuration, le financement et le déploiement de leurs projets d'affaires et d'infrastructures.",
    },
    ticker: {
      text: "Nouveau : programmes de financement d'équipement disponibles partout au Canada.",
      cta: 'Faire une demande',
    },
    utilityTagline: 'A 360° view of the world & your needs',
    nav: [
      { href: '#services', label: 'Services' },
      { href: '#solutions', label: 'Solutions' },
      { href: '#programmes', label: 'Programmes' },
      { href: '#about', label: 'À propos' },
      { href: '#articles', label: 'Articles' },
      { href: '#financement', label: 'Demande' },
      { href: '#contact', label: 'Contact' },
    ],
    hero: {
      titleLead: 'Vous bâtissez votre entreprise.',
      titleAccent: 'Nous en structurons le financement.',
      sub: "Natal Capital Pro. accompagne entrepreneurs, entreprises et institutions dans la structuration, le financement et le déploiement de leurs projets d'affaires et d'infrastructures.",
      ctaPrimary: 'Nous écrire',
      ctaGhost: 'Voir les services',
    },
    doors: [
      {
        href: '#services',
        icon: 'services',
        title: 'Services',
        text: 'Conseil et structuration financière',
      },
      {
        href: '#programmes',
        icon: 'programs',
        title: 'Programmes',
        text: 'RENFORT et fonds de roulement, partout au Canada',
      },
      {
        href: '#expansion-marches',
        icon: 'globe',
        title: 'Expansion',
        text: "Marchés hors Québec et à l'international",
      },
      {
        href: '#financement',
        icon: 'apply',
        title: 'Demande',
        text: 'Déposer une demande de financement',
      },
    ],
    featured: {
      kicker: 'À la une',
      title: "RENFORT, un financement qui s'adapte à votre réalité.",
      body: "Structuré en partenariat avec un réseau de plus de 30 prêteurs spécialisés, RENFORT est notre programme unique de financement d'équipement, complété par un programme classique de financement du fonds de roulement.",
      cta: 'Voir les programmes',
    },
    services: {
      kicker: 'Ce que nous faisons',
      title: 'Des services de recherche et de conseil conçus pour la décision.',
      desc: "Une vision à 360° qui couvre l'analyse de marché, le financement, la gouvernance et la gestion du risque.",
      serviceLink: 'Discuter de ce service',
      items: [
        {
          icon: 'research',
          title: 'Recherche et analyse financière',
          body: "Études de marché, suivi des tendances macroéconomiques et recommandations chiffrées pour éclairer vos décisions d'affaires.",
        },
        {
          icon: 'bank',
          title: 'Financement corporatif',
          body: "Structuration de solutions de financement adaptées aux entreprises en croissance et aux projets d'envergure.",
        },
        {
          icon: 'valuation',
          title: "Évaluation d'entreprise",
          body: "Détermination de la juste valeur d'une entreprise pour soutenir les transactions de relève, portées par le nombre grandissant de baby boomers qui approchent la retraite au Canada, ainsi que les projets de croissance par acquisition.",
        },
        {
          icon: 'globe',
          id: 'expansion-marches',
          thumb: IMAGES.expansion,
          title: 'Expansion de marchés hors Québec',
          body: "Structuration financière et commerciale de l'expansion des produits québécois vers les autres provinces canadiennes et les marchés internationaux.",
        },
      ],
    },
    solutions: {
      bannerLabel: 'Infrastructures technologiques',
      kicker: 'Nos solutions',
      title: "Solutions pour vos projets d'infrastructures technologiques",
      desc: "Structuration et accompagnement de projets d'infrastructures technologiques et d'autres initiatives, de la conception au déploiement.",
      cards: [
        {
          title: 'Infrastructures fintech et paiement',
          items: [
            'Plateformes de financement numérique',
            'Automatisation des processus de traitement',
            'Digitalisation des institutions financières',
          ],
        },
        {
          title: 'Infrastructures de données',
          items: [
            'Architecture et hébergement de données',
            'Interconnexion de systèmes financiers',
            'Conformité et sécurité des plateformes',
          ],
        },
        {
          title: 'Logistique et supply chain numérique',
          items: [
            'Plateformes logistiques',
            'Supply chain numérique',
            'Technologies de gestion des flux',
          ],
        },
      ],
      form: {
        title: 'Décrire votre projet',
        note: 'Un agent communiquera avec vous à la suite de votre envoi.',
        submit: 'Soumettre ma demande',
        blocks: [
          {
            rows: [
              {
                cols: 2,
                fields: [
                  { type: 'text', name: 'Nom complet', label: 'Nom complet' },
                  { type: 'text', name: 'Organisation', label: 'Organisation' },
                ],
              },
              {
                cols: 2,
                fields: [
                  { type: 'text', name: 'Courriel', label: 'Courriel' },
                  { type: 'text', name: 'Téléphone', label: 'Téléphone' },
                ],
              },
              {
                cols: 1,
                fields: [
                  {
                    type: 'textarea',
                    name: 'Description du projet',
                    label: 'Description du projet',
                  },
                ],
              },
            ],
          },
        ],
      },
      mail: {
        subject: 'Demande de solution',
        intro: 'Demande de solution soumise depuis le site Natal Capital Pro.',
      },
    },
    positioning: {
      tagLabel: 'Secteur',
      tagValue: 'Services financiers et infrastructures',
      title: 'Un acteur du financement et des infrastructures numériques.',
      paragraphs: [
        "Natal Capital Pro accompagne les entreprises, institutions et porteurs de projets dans la structuration, le financement et le déploiement de projets d'entreprises et d'infrastructures numériques.",
        "La société développe des solutions qui répondent aux besoins de financement, de structuration financière et de transformation opérationnelle des entreprises, avec une expertise particulière dans les secteurs de la finance numérique et de la logistique.",
        "Natal Capital Pro intervient notamment dans la conception et la structuration de projets liés aux infrastructures fintech, plateformes de financement numérique, systèmes de paiement, digitalisation des institutions financières, infrastructures de données, plateformes logistiques, supply chain numérique et technologies de gestion des flux.",
      ],
    },
    proof: {
      stats: [
        { icon: 'apply', value: '500+', label: 'demandes reçues' },
        { icon: 'programs', value: '250+', label: 'projets accompagnés' },
        { icon: 'bank', value: '150+', label: 'projets financés' },
      ],
    },
    programs: {
      kicker: 'Nos programmes',
      title: 'Deux programmes de financement',
      desc: "Un programme d'équipement bâti sur mesure et un programme classique pour le fonds de roulement, structurés en partenariat avec un réseau de plus de 30 prêteurs spécialisés, accessibles partout au Canada.",
      renfort: {
        badge: 'Disponible partout au Canada',
        name: 'RENFORT',
        tagline: "Un financement qui s'adapte à votre réalité.",
        body: "Notre programme unique de financement d'équipement, qui remplace des offres autrefois séparées par vertical, pour financer tous les types d'équipements de votre entreprise à travers un seul programme, avec des conditions qui s'ajustent à la réalité de chaque secteur.",
        items: [
          'Véhicules, remorques et équipements de transport',
          "Équipements de construction, d'excavation et de garagiste",
          'Équipements agricoles, forestiers et industriels',
          'Équipement de conditionnement physique',
          'Équipements médicaux, dentaires et de restauration',
          'Matériel informatique et équipements spécialisés',
        ],
        terms: [
          {
            title: "Aucun effet sur votre capacité d'emprunt",
            body: "Le montant financé ne s'ajoute pas à votre utilisation de crédit personnel.",
          },
          {
            title: 'Mensualités déductibles',
            body: 'Les paiements de location sont entièrement déductibles à des fins fiscales.',
          },
          {
            title: 'Termes de 12 à 84 mois',
            body: 'Avec options de paiements flexibles pour les activités saisonnières.',
          },
        ],
      },
      workingCapital: {
        badge: 'Disponible partout au Canada',
        title: 'Financement du fonds de roulement',
        body: "Un programme de financement classique pour soutenir les opérations courantes de l'entreprise, en complément du programme RENFORT dédié à l'équipement.",
        items: [
          'Gestion des stocks et des délais de paiement',
          "Masse salariale et dépenses d'exploitation",
          'Liquidités pour les périodes de pointe saisonnière',
        ],
      },
      cta: 'Faire une demande',
    },
    about: {
      kicker: "L'équipe",
      title: 'À propos de nous',
      name: 'Marc Nguesson',
      role: 'Fondateur & Directeur | Services-Conseils',
      quote:
        '« Alors que la Comptabilité ressemble à un continent où tout est conquis, la Finance demeure un vaste océan où tout reste encore à conquérir. »',
      bio: [
        "Ma vision pour les dix prochaines années est de contribuer à redéfinir les infrastructures et les instruments financiers de demain, sans changer les façons de travailler des gens, mais en les optimisant grâce à des processus technologiques avancés.",
        "Fort d'un parcours solide en financement corporatif, en gestion de projets et en investissement, mon cheminement professionnel m'a amené à collaborer avec des entrepreneurs, des institutions publiques et des entreprises privées. J'aime simplifier la complexité, mobiliser les parties prenantes et contribuer à des projets innovants, qu'ils soient industriels, technologiques, financiers ou liés au développement durable.",
      ],
    },
    articles: {
      kicker: 'Publications',
      title: 'Articles',
      categories: ['Analyses financières', 'Perspectives économiques'],
    },
    finance: {
      kicker: "Passer à l'action",
      title: 'Demande de financement',
      desc: "Complétez les renseignements ci-dessous pour entamer votre demande. Vous pourrez joindre vos documents directement dans votre client courriel avant l'envoi.",
      submit: 'Envoyer ma demande par courriel',
      mail: {
        subject: 'Demande de financement',
        intro:
          'Demande de financement soumise depuis le site Natal Capital Pro.',
        reminder:
          "N'oubliez pas de joindre vos documents justificatifs à ce courriel avant l'envoi.",
      },
      blocks: [
        {
          title: 'Informations du demandeur',
          rows: [
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: "Nom légal de l'entreprise",
                  label: "Nom légal de l'entreprise",
                },
                {
                  type: 'checkbox',
                  name: "Je n'ai pas encore d'entreprise",
                  label: "Je n'ai pas encore d'entreprise",
                },
              ],
            },
            {
              cols: 1,
              fields: [{ type: 'text', name: 'Adresse', label: 'Adresse' }],
            },
            {
              cols: 3,
              fields: [
                { type: 'text', name: 'Ville', label: 'Ville' },
                { type: 'text', name: 'Province', label: 'Province' },
                { type: 'text', name: 'Code postal', label: 'Code postal' },
              ],
            },
            {
              cols: 2,
              fields: [
                { type: 'text', name: 'Téléphone', label: 'Téléphone' },
                {
                  type: 'text',
                  name: 'Personne contact',
                  label: 'Personne contact',
                },
              ],
            },
          ],
        },
        {
          title: 'Informations personnelles',
          rows: [
            {
              cols: 2,
              fields: [
                { type: 'text', name: 'Prénom', label: 'Prénom' },
                { type: 'text', name: 'Nom', label: 'Nom' },
              ],
            },
            {
              cols: 3,
              fields: [
                { type: 'text', name: 'Adresse (personnel)', label: 'Adresse' },
                { type: 'text', name: 'Ville (personnel)', label: 'Ville' },
                {
                  type: 'text',
                  name: 'Province (personnel)',
                  label: 'Province',
                },
              ],
            },
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: 'Code postal (personnel)',
                  label: 'Code postal',
                },
                {
                  type: 'text',
                  name: 'Téléphone (personnel)',
                  label: 'Téléphone',
                },
              ],
            },
          ],
        },
        {
          title: "Détails de l'entreprise",
          rows: [
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: "Quand l'entreprise a-t-elle démarré ?",
                  label: "Quand l'entreprise a-t-elle démarré ?",
                },
                {
                  type: 'text',
                  name: 'Quand avez-vous commencé à travailler dans cette industrie ?',
                  label:
                    'Quand avez-vous commencé à travailler dans cette industrie ?',
                },
              ],
            },
            {
              cols: 3,
              fields: [
                {
                  type: 'select',
                  name: "Type d'entreprise",
                  label: "Type d'entreprise",
                  options: [
                    'Sélectionner',
                    'Corporation',
                    'Société en nom collectif',
                    'Entreprise individuelle',
                  ],
                },
                {
                  type: 'text',
                  name: 'Quel montant de financement recherchez-vous ?',
                  label: 'Quel montant de financement recherchez-vous ?',
                },
                {
                  type: 'text',
                  name: 'Que désirez-vous financer avec les fonds que vous recherchez ?',
                  label:
                    'Que désirez-vous financer avec les fonds que vous recherchez ?',
                },
              ],
            },
          ],
        },
        {
          rows: [
            {
              cols: 1,
              fields: [
                {
                  type: 'textarea',
                  name: 'Message additionnel',
                  label: 'Message additionnel (facultatif)',
                },
              ],
            },
          ],
        },
      ],
    },
    contact: {
      kicker: 'Contact',
      title: 'Discutons ensemble de votre prochain projet.',
      desc: 'Notre équipe répond aux questions des entrepreneurs, des entreprises et des institutions.',
      phoneLabel: 'Téléphone',
      emailLabel: 'Courriel',
      ctaEmail: 'Écrire un courriel',
      ctaCall: 'Appeler maintenant',
    },
    footer: {
      tagline:
        'Financement corporatif, conseil stratégique et infrastructures numériques, partout au Canada.',
      columns: [
        {
          title: 'Services',
          links: [
            { href: '#services', label: 'Recherche financière' },
            { href: '#services', label: 'Financement corporatif' },
            { href: '#services', label: "Évaluation d'entreprise" },
            { href: '#expansion-marches', label: 'Expansion de marchés' },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { href: '#solutions', label: 'Fintech et paiement' },
            { href: '#solutions', label: 'Infrastructures de données' },
            { href: '#solutions', label: 'Logistique numérique' },
          ],
        },
        {
          title: 'Programmes',
          links: [
            { href: '#programmes', label: "RENFORT, financement d'équipement" },
            { href: '#programmes', label: 'Fonds de roulement' },
          ],
        },
        {
          title: 'Entreprise',
          links: [
            { href: '#about', label: 'À propos' },
            { href: '#articles', label: 'Articles' },
            { href: '#financement', label: 'Demande de financement' },
          ],
        },
        {
          title: 'Coordonnées',
          links: [
            { href: CONTACT.phoneHref, label: CONTACT.phone },
            { href: CONTACT.emailHref, label: CONTACT.email },
          ],
          notes: [
            'Partout au Canada',
            'Montréal, QC | 1436 Rue Mackay, H3G 2H8',
            'Toronto, ON | 55 Gerrard St W, M5G 0B9',
          ],
        },
      ],
      copyright: '© 2026 Natal Capital Pro. Tous droits réservés.',
    },
    formStatus: {
      sending: 'Envoi en cours…',
      ok: 'Merci ! Votre demande a bien été envoyée. Notre équipe vous recontactera rapidement.',
      errorPre: "Une erreur est survenue lors de l'envoi. ",
      errorLink: 'Envoyer plutôt par courriel',
    },
  },

  en: {
    meta: {
      title: 'Natal Capital Pro. | Investment research and advisory',
      description:
        'Natal Capital Pro. supports entrepreneurs, companies and institutions in the structuring, financing and deployment of their business ventures and infrastructure projects.',
    },
    ticker: {
      text: 'New: equipment financing programs now available across Canada.',
      cta: 'Apply now',
    },
    utilityTagline: 'A 360° view of the world & your needs',
    nav: [
      { href: '#services', label: 'Services' },
      { href: '#solutions', label: 'Solutions' },
      { href: '#programmes', label: 'Programs' },
      { href: '#about', label: 'About' },
      { href: '#articles', label: 'Articles' },
      { href: '#financement', label: 'Apply' },
      { href: '#contact', label: 'Contact' },
    ],
    hero: {
      titleLead: 'You build your business.',
      titleAccent: 'We structure its financing.',
      sub: 'Natal Capital Pro. supports entrepreneurs, companies and institutions in the structuring, financing and deployment of their business ventures and infrastructure projects.',
      ctaPrimary: 'Get in touch',
      ctaGhost: 'View services',
    },
    doors: [
      {
        href: '#services',
        icon: 'services',
        title: 'Services',
        text: 'Advisory and financial structuring',
      },
      {
        href: '#programmes',
        icon: 'programs',
        title: 'Programs',
        text: 'RENFORT and working capital, across Canada',
      },
      {
        href: '#expansion-marches',
        icon: 'globe',
        title: 'Expansion',
        text: 'Markets beyond Quebec and internationally',
      },
      {
        href: '#financement',
        icon: 'apply',
        title: 'Apply',
        text: 'Submit a financing request',
      },
    ],
    featured: {
      kicker: 'Featured',
      title: 'RENFORT, financing that adapts to your reality.',
      body: 'Structured in partnership with a network of more than 30 specialized lenders, RENFORT is our single equipment financing program, complemented by a classic working capital financing program.',
      cta: 'View programs',
    },
    services: {
      kicker: 'What we do',
      title: 'Research and advisory services built for decision making.',
      desc: 'A 360° view spanning market analysis, financing, governance and risk management.',
      serviceLink: 'Discuss this service',
      items: [
        {
          icon: 'research',
          title: 'Financial research & analysis',
          body: 'Market studies, macroeconomic tracking and clear recommendations to inform your business decisions.',
        },
        {
          icon: 'bank',
          title: 'Corporate financing',
          body: 'Financing solutions structured for growing companies and large scale projects.',
        },
        {
          icon: 'valuation',
          title: 'Business valuation',
          body: 'Determining the fair value of a business to support succession transactions, driven by the growing number of baby boomers approaching retirement across Canada, as well as growth projects through acquisition.',
        },
        {
          icon: 'globe',
          id: 'expansion-marches',
          thumb: IMAGES.expansion,
          title: 'Market expansion beyond Quebec',
          body: 'Financial and commercial structuring for the expansion of Quebec products into other Canadian provinces and international markets.',
        },
      ],
    },
    solutions: {
      bannerLabel: 'Technology infrastructure',
      kicker: 'Our solutions',
      title: 'Solutions for your technology infrastructure projects',
      desc: 'Structuring and support for technology infrastructure projects and other initiatives, from design to deployment.',
      cards: [
        {
          title: 'Fintech & payment infrastructure',
          items: [
            'Digital financing platforms',
            'Automated processing workflows',
            'Digitalization of financial institutions',
          ],
        },
        {
          title: 'Data infrastructure',
          items: [
            'Data architecture and hosting',
            'Interconnection of financial systems',
            'Platform compliance and security',
          ],
        },
        {
          title: 'Logistics & digital supply chain',
          items: [
            'Logistics platforms',
            'Digital supply chain',
            'Flow management technologies',
          ],
        },
      ],
      form: {
        title: 'Describe your project',
        note: 'An agent will contact you after you submit this form.',
        submit: 'Submit my request',
        blocks: [
          {
            rows: [
              {
                cols: 2,
                fields: [
                  { type: 'text', name: 'Full name', label: 'Full name' },
                  {
                    type: 'text',
                    name: 'Organization',
                    label: 'Organization',
                  },
                ],
              },
              {
                cols: 2,
                fields: [
                  { type: 'text', name: 'Email', label: 'Email' },
                  { type: 'text', name: 'Phone', label: 'Phone' },
                ],
              },
              {
                cols: 1,
                fields: [
                  {
                    type: 'textarea',
                    name: 'Project description',
                    label: 'Project description',
                  },
                ],
              },
            ],
          },
        ],
      },
      mail: {
        subject: 'Solution Request',
        intro: 'Solution request submitted from the Natal Capital Pro website.',
      },
    },
    positioning: {
      tagLabel: 'Sector',
      tagValue: 'Financial & Infrastructure Services',
      title: 'A partner in financing and digital infrastructure.',
      paragraphs: [
        'Natal Capital Pro supports companies, institutions and project leaders in the structuring, financing and deployment of business ventures and digital infrastructure projects.',
        "The firm develops solutions that address companies' financing, financial structuring and operational transformation needs, with particular expertise in digital finance and logistics.",
        'Natal Capital Pro is notably involved in the design and structuring of projects related to fintech infrastructure, digital financing platforms, payment systems, digitalization of financial institutions, data infrastructure, logistics platforms, digital supply chain and flow management technologies.',
      ],
    },
    proof: {
      stats: [
        { icon: 'apply', value: '500+', label: 'applications received' },
        { icon: 'programs', value: '250+', label: 'projects supported' },
        { icon: 'bank', value: '150+', label: 'projects financed' },
      ],
    },
    programs: {
      kicker: 'Our programs',
      title: 'Two financing programs',
      desc: 'A tailored equipment program and a classic working capital program, structured in partnership with a network of more than 30 specialized lenders, available across Canada.',
      renfort: {
        badge: 'Available across Canada',
        name: 'RENFORT',
        tagline: 'Financing that adapts to your reality.',
        body: 'Our single equipment financing program, replacing offers once separated by vertical, to finance every type of equipment your business needs through one program, with terms that adjust to the reality of each sector.',
        items: [
          'Vehicles, trailers and transport equipment',
          'Construction, excavation and garage equipment',
          'Agricultural, forestry and industrial equipment',
          'Fitness equipment',
          'Medical, dental and restaurant equipment',
          'Computer hardware and specialized equipment',
        ],
        terms: [
          {
            title: 'No effect on your borrowing capacity',
            body: 'The financed amount does not add to your personal credit usage.',
          },
          {
            title: 'Deductible monthly payments',
            body: 'Lease payments are fully deductible for tax purposes.',
          },
          {
            title: '12 to 84 month terms',
            body: 'With flexible payment options for seasonal activities.',
          },
        ],
      },
      workingCapital: {
        badge: 'Available across Canada',
        title: 'Working capital financing',
        body: "A classic financing program to support the company's day to day operations, complementing the RENFORT equipment program.",
        items: [
          'Inventory management and payment delays',
          'Payroll and operating expenses',
          'Liquidity for seasonal peak periods',
        ],
      },
      cta: 'Apply now',
    },
    about: {
      kicker: 'The team',
      title: 'About us',
      name: 'Marc Nguesson',
      role: 'Founder & Director | Advisory Services',
      quote:
        '"Where Accounting looks like a continent where everything is conquered, Finance remains a vast ocean where everything still remains to be conquered."',
      bio: [
        "My objective vision for the next ten years is to help redefine tomorrow's infrastructures and financial instruments without changing people's ways of working, but by streamlining them through advanced technological processes.",
        'With a solid track record in corporate financing, project management and investments, my career has led me to collaborate with entrepreneurs, public institutions and private companies. I enjoy simplifying complexity, mobilizing stakeholders and contributing to innovative projects, whether industrial, technological, financial or related to sustainable development.',
      ],
    },
    articles: {
      kicker: 'Publications',
      title: 'Articles',
      categories: ['Financial analysis', 'Economic outlooks'],
    },
    finance: {
      kicker: 'Get started',
      title: 'Financing Request',
      desc: 'Complete the information below to start your request. You will be able to attach your documents directly in your email client before sending.',
      submit: 'Send my request by email',
      mail: {
        subject: 'Financing Request',
        intro: 'Financing request submitted from the Natal Capital Pro website.',
        reminder:
          'Please remember to attach your supporting documents to this email before sending.',
      },
      blocks: [
        {
          title: 'Applicant information',
          rows: [
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: 'Legal company name',
                  label: 'Legal company name',
                },
                {
                  type: 'checkbox',
                  name: 'I do not have a company yet',
                  label: 'I do not have a company yet',
                },
              ],
            },
            {
              cols: 1,
              fields: [{ type: 'text', name: 'Address', label: 'Address' }],
            },
            {
              cols: 3,
              fields: [
                { type: 'text', name: 'City', label: 'City' },
                { type: 'text', name: 'Province', label: 'Province' },
                { type: 'text', name: 'Postal code', label: 'Postal code' },
              ],
            },
            {
              cols: 2,
              fields: [
                { type: 'text', name: 'Phone', label: 'Phone' },
                {
                  type: 'text',
                  name: 'Contact person',
                  label: 'Contact person',
                },
              ],
            },
          ],
        },
        {
          title: 'Personal information',
          rows: [
            {
              cols: 2,
              fields: [
                { type: 'text', name: 'First name', label: 'First name' },
                { type: 'text', name: 'Last name', label: 'Last name' },
              ],
            },
            {
              cols: 3,
              fields: [
                { type: 'text', name: 'Address (personal)', label: 'Address' },
                { type: 'text', name: 'City (personal)', label: 'City' },
                {
                  type: 'text',
                  name: 'Province (personal)',
                  label: 'Province',
                },
              ],
            },
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: 'Postal code (personal)',
                  label: 'Postal code',
                },
                { type: 'text', name: 'Phone (personal)', label: 'Phone' },
              ],
            },
          ],
        },
        {
          title: 'Business details',
          rows: [
            {
              cols: 2,
              fields: [
                {
                  type: 'text',
                  name: 'When did the company start?',
                  label: 'When did the company start?',
                },
                {
                  type: 'text',
                  name: 'When did you start working in this industry?',
                  label: 'When did you start working in this industry?',
                },
              ],
            },
            {
              cols: 3,
              fields: [
                {
                  type: 'select',
                  name: 'Type of company',
                  label: 'Type of company',
                  options: [
                    'Select',
                    'Corporation',
                    'General partnership',
                    'Sole proprietorship',
                  ],
                },
                {
                  type: 'text',
                  name: 'What amount of financing are you seeking?',
                  label: 'What amount of financing are you seeking?',
                },
                {
                  type: 'text',
                  name: 'What do you wish to finance with the funds you are seeking?',
                  label:
                    'What do you wish to finance with the funds you are seeking?',
                },
              ],
            },
          ],
        },
        {
          rows: [
            {
              cols: 1,
              fields: [
                {
                  type: 'textarea',
                  name: 'Additional message',
                  label: 'Additional message (optional)',
                },
              ],
            },
          ],
        },
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's discuss your next project together.",
      desc: 'Our team answers questions from entrepreneurs, companies and institutions.',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      ctaEmail: 'Send an email',
      ctaCall: 'Call now',
    },
    footer: {
      tagline:
        'Corporate financing, strategic advisory and digital infrastructure, across Canada.',
      columns: [
        {
          title: 'Services',
          links: [
            { href: '#services', label: 'Financial research' },
            { href: '#services', label: 'Corporate financing' },
            { href: '#services', label: 'Business valuation' },
            { href: '#expansion-marches', label: 'Market expansion' },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { href: '#solutions', label: 'Fintech & payment' },
            { href: '#solutions', label: 'Data infrastructure' },
            { href: '#solutions', label: 'Digital logistics' },
          ],
        },
        {
          title: 'Programs',
          links: [
            { href: '#programmes', label: 'RENFORT, equipment financing' },
            { href: '#programmes', label: 'Working capital' },
          ],
        },
        {
          title: 'Company',
          links: [
            { href: '#about', label: 'About' },
            { href: '#articles', label: 'Articles' },
            { href: '#financement', label: 'Financing request' },
          ],
        },
        {
          title: 'Contact',
          links: [
            { href: CONTACT.phoneHref, label: CONTACT.phone },
            { href: CONTACT.emailHref, label: CONTACT.email },
          ],
          notes: [
            'Across Canada',
            'Montréal, QC | 1436 Rue Mackay, H3G 2H8',
            'Toronto, ON | 55 Gerrard St W, M5G 0B9',
          ],
        },
      ],
      copyright: '© 2026 Natal Capital Pro. All rights reserved.',
    },
    formStatus: {
      sending: 'Sending…',
      ok: 'Thank you! Your request has been sent. Our team will get back to you shortly.',
      errorPre: 'Something went wrong while sending. ',
      errorLink: 'Send by email instead',
    },
  },
};
