// Bilingual content for the Natal Capital Pro. site.
// All copy lives here so the active language can be rendered from one source
// and new content (e.g. the upcoming market-expansion service) can be added
// in a single place.

export type Lang = 'fr' | 'en';

export interface NavItem {
  href: string;
  label: string;
}

export type FormFieldType = 'text' | 'checkbox' | 'select' | 'textarea';

export interface FormField {
  type: FormFieldType;
  label: string;
  /** Overrides `label` when building the email body. */
  dataLabel?: string;
  /** Placeholder / empty option for `select` fields. */
  placeholder?: string;
  /** Options for `select` fields. */
  options?: string[];
}

export interface FormRow {
  /** Number of columns the row splits into on wide screens. */
  cols: number;
  fields: FormField[];
}

export interface FormBlock {
  title?: string;
  note?: string;
  rows: FormRow[];
}

export interface LangContent {
  meta: { title: string; description: string };
  nav: NavItem[];
  hero: { title: string; sub: string; ctaPrimary: string; ctaGhost: string };
  positioning: {
    sectorLabel: string;
    sectorValue: string;
    h2: string;
    paragraphs: string[];
  };
  services: {
    kicker: string;
    h2: string;
    desc: string;
    items: { h: string; p: string }[];
    feature: { tag: string; h: string; p: string };
  };
  programs: {
    kicker: string;
    h2: string;
    desc: string;
    badge: string;
    cards: { h: string; items: string[] }[];
    terms: { h: string; p: string }[];
    cta: string;
  };
  about: {
    kicker: string;
    h2: string;
    name: string;
    role: string;
    quote: string;
    quoteCite: string;
    bio: string[];
  };
  articles: {
    kicker: string;
    h2: string;
    desc: string;
    cards: { h: string; status: string; tag: string }[];
  };
  finance: {
    kicker: string;
    h2: string;
    desc: string;
    blocks: FormBlock[];
    attachNote: string;
    submit: string;
    sending: string;
    successMsg: string;
    errorMsg: string;
    errorMailLink: string;
    mailSubject: string;
    mailIntro: string;
    mailReminder: string;
  };
  contact: {
    kicker: string;
    h2: string;
    desc: string;
    phoneLabel: string;
    emailLabel: string;
    phone: string;
    phoneHref: string;
    email: string;
    ctaPrimary: string;
    ctaGhost: string;
  };
  footer: { links: NavItem[]; copyright: string };
}

export const content: Record<Lang, LangContent> = {
  fr: {
    meta: {
      title: `Natal Capital Pro. | Recherche et conseil en investissement`,
      description: `Natal Capital Pro. accompagne entrepreneurs, entreprises et institutions dans la structuration, le financement et le déploiement de leurs projets d'affaires et d'infrastructures.`,
    },
    nav: [
      { href: `#top`, label: `Accueil` },
      { href: `#services`, label: `Services` },
      { href: `#programmes`, label: `Programmes` },
      { href: `#about`, label: `À propos` },
      { href: `#articles`, label: `Articles` },
      { href: `#financement`, label: `Demande` },
      { href: `#contact`, label: `Contact` },
    ],
    hero: {
      title: `Voir loin, décider avec clarté.`,
      sub: `Natal Capital Pro. accompagne entrepreneurs, entreprises et institutions dans la structuration, le financement et le déploiement de leurs projets d'affaires et d'infrastructures.`,
      ctaPrimary: `Nous écrire`,
      ctaGhost: `Voir les services`,
    },
    positioning: {
      sectorLabel: `Secteur`,
      sectorValue: `Services financiers et infrastructures`,
      h2: `Un acteur du financement et des infrastructures numériques.`,
      paragraphs: [
        `Natal Capital Pro accompagne les entreprises, institutions et porteurs de projets dans la structuration, le financement et le déploiement de projets d'entreprises et d'infrastructures numériques.`,
        `La société développe des solutions qui répondent aux besoins de financement, de structuration financière et de transformation opérationnelle des entreprises, avec une expertise particulière dans les secteurs de la finance numérique et de la logistique.`,
        `Natal Capital Pro intervient notamment dans la conception et la structuration de projets liés aux infrastructures fintech, plateformes de financement numérique, systèmes de paiement, digitalisation des institutions financières, infrastructures de données, plateformes logistiques, supply chain numérique et technologies de gestion des flux.`,
      ],
    },
    services: {
      kicker: `Ce que nous faisons`,
      h2: `Des services de recherche et de conseil conçus pour la décision.`,
      desc: `Une vision à 360° qui couvre l'analyse de marché, le financement, la gouvernance et la gestion du risque.`,
      items: [
        { h: `Recherche et analyse financière`, p: `Études de marché, suivi des tendances macroéconomiques et recommandations chiffrées pour éclairer vos décisions d'affaires.` },
        { h: `Rapports institutionnels sur mesure`, p: `Production de rapports professionnels au format PDF, conçus pour les comités d'investissement, les partenaires et les conseils d'administration.` },
        { h: `Financement corporatif`, p: `Structuration de solutions de financement adaptées aux entreprises en croissance et aux projets d'envergure.` },
        { h: `Gestion du risque de portefeuille`, p: `Analyse et encadrement du risque afin de protéger la valeur des portefeuilles dans un contexte de marché changeant.` },
        { h: `Conseil stratégique`, p: `Accompagnement des dirigeants dans leurs choix stratégiques, de la structuration organisationnelle au positionnement de marché.` },
        { h: `Développement organisationnel`, p: `Mise en place de structures, de processus et de gouvernance pour soutenir la croissance durable des organisations.` },
      ],
      feature: {
        tag: `Nouveau · en développement`,
        h: `Expansion de marchés`,
        p: `Accompagnement des produits du Québec vers les autres provinces canadiennes et les marchés internationaux : accès aux réseaux de distribution, structuration commerciale et déploiement à l'échelle. Cette offre est en cours de développement — plus de détails à venir.`,
      },
    },
    programs: {
      kicker: `Nos programmes`,
      h2: `Programmes de financement d'équipement`,
      desc: `Trois programmes structurés en partenariat avec un réseau de plus de 30 prêteurs spécialisés, accessibles partout au Canada.`,
      badge: `Disponible partout au Canada`,
      cards: [
        {
          h: `Véhicules et équipements commerciaux`,
          items: [
            `Remorques et équipements de transport`,
            `Équipements de construction et d'excavation`,
            `Équipements forestiers et agricoles lourds`,
            `Équipements de garagiste et de manutention`,
          ],
        },
        {
          h: `Équipement de conditionnement physique`,
          items: [
            `Bancs d'entraînement, haltères, kettlebells`,
            `Machines à câble, racks de squat, machines pour jambes`,
            `Vélos, elliptiques, tapis roulants, rameurs`,
            `Grimpeurs et accessoires de plateau`,
          ],
        },
        {
          h: `Équipements agricoles et industriels`,
          items: [
            `Équipements agricoles et robotique de champ`,
            `Équipements industriels et matériel informatique`,
            `Équipements médicaux et dentaires`,
            `Équipements de restauration et d'impression`,
          ],
        },
      ],
      terms: [
        { h: `Aucun effet sur votre capacité d'emprunt`, p: `Le montant financé ne s'ajoute pas à votre utilisation de crédit personnel.` },
        { h: `Mensualités déductibles`, p: `Les paiements de location sont entièrement déductibles à des fins fiscales.` },
        { h: `Termes de 12 à 84 mois`, p: `Avec options de paiements flexibles pour les activités saisonnières.` },
        { h: `Approbation en 24 à 48 heures`, p: `Des dossiers traités rapidement pour trouver les meilleures conditions.` },
      ],
      cta: `Faire une demande`,
    },
    about: {
      kicker: `L'équipe`,
      h2: `À propos de nous`,
      name: `Marc Nguesson`,
      role: `Fondateur & Directeur | Services-Conseils`,
      quote: `« Alors que la Comptabilité ressemble à un continent où tout est conquis, la Finance demeure un vaste océan où tout reste encore à conquérir. »`,
      quoteCite: `Marc Nguesson`,
      bio: [
        `Notre vision pour les dix prochaines années est de contribuer à redéfinir les infrastructures et les instruments financiers de demain, sans changer les façons de travailler des gens, mais en les optimisant grâce à des processus technologiques avancés.`,
        `Forts d'un parcours solide en financement corporatif, en gestion de projets et en investissement, notre cheminement professionnel nous a amenés à collaborer avec des entrepreneurs, des institutions publiques et des entreprises privées. Nous aimons simplifier la complexité, mobiliser les parties prenantes et contribuer à des projets innovants, qu'ils soient industriels, technologiques, financiers ou liés au développement durable.`,
      ],
    },
    articles: {
      kicker: `Publications`,
      h2: `Articles`,
      desc: `Cette rubrique rassemble les analyses financières, les perspectives économiques et les études de cas géopolitiques rédigées par Natal Capital Pro. De nouveaux textes y seront publiés régulièrement.`,
      cards: [
        { h: `Analyses financières`, status: `Premiers articles à venir.`, tag: `À venir` },
        { h: `Perspectives économiques`, status: `Premiers articles à venir.`, tag: `À venir` },
        { h: `Études de cas géopolitiques`, status: `Premiers articles à venir.`, tag: `À venir` },
      ],
    },
    finance: {
      kicker: `Passer à l'action`,
      h2: `Demande de financement`,
      desc: `Complétez les renseignements ci-dessous pour entamer votre demande. Vous pourrez joindre vos documents directement dans votre client courriel avant l'envoi.`,
      blocks: [
        {
          title: `Informations du demandeur`,
          rows: [
            { cols: 2, fields: [
              { type: `text`, label: `Nom légal de l'entreprise` },
              { type: `checkbox`, label: `Je n'ai pas encore d'entreprise` },
            ] },
            { cols: 1, fields: [ { type: `text`, label: `Adresse` } ] },
            { cols: 3, fields: [
              { type: `text`, label: `Ville` },
              { type: `text`, label: `Province` },
              { type: `text`, label: `Code postal` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Téléphone` },
              { type: `text`, label: `Personne contact` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Nature de l'entreprise` },
              { type: `text`, label: `En affaires depuis` },
            ] },
          ],
        },
        {
          title: `Informations personnelles`,
          note: `Si moins de 3 ans en affaires ou entreprise non enregistrée.`,
          rows: [
            { cols: 3, fields: [
              { type: `text`, label: `Prénom` },
              { type: `text`, label: `Nom` },
              { type: `text`, label: `Date de naissance` },
            ] },
            { cols: 3, fields: [
              { type: `text`, label: `Adresse` },
              { type: `text`, label: `Ville` },
              { type: `text`, label: `Province` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Code postal` },
              { type: `text`, label: `Téléphone` },
            ] },
          ],
        },
        {
          title: `Détails de l'entreprise`,
          rows: [
            { cols: 2, fields: [
              { type: `text`, label: `Quand l'entreprise a-t-elle démarré ?` },
              { type: `text`, label: `Quand avez-vous commencé à travailler dans cette industrie ?` },
            ] },
            { cols: 2, fields: [
              { type: `select`, label: `Type d'entreprise`, placeholder: `Sélectionner`, options: [
                `Corporation`, `Société en nom collectif`, `Entreprise individuelle`,
              ] },
              { type: `text`, label: `Comment vont les finances de l'entreprise ?` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Quel montant de financement recherchez-vous ?` },
              { type: `text`, label: `Que désirez-vous financer avec les fonds que vous recherchez ?` },
            ] },
          ],
        },
        {
          rows: [
            { cols: 1, fields: [
              { type: `textarea`, label: `Message additionnel (facultatif)`, dataLabel: `Message additionnel` },
            ] },
          ],
        },
      ],
      attachNote: `Après l'envoi de votre demande, notre équipe vous recontactera pour récupérer vos documents justificatifs (pièces d'identité, états financiers, relevés).`,
      submit: `Envoyer ma demande`,
      sending: `Envoi en cours…`,
      successMsg: `Merci ! Votre demande a bien été envoyée. Notre équipe vous recontactera rapidement.`,
      errorMsg: `Une erreur est survenue lors de l'envoi. Veuillez réessayer.`,
      errorMailLink: `Envoyer plutôt par courriel`,
      mailSubject: `Demande de financement`,
      mailIntro: `Demande de financement soumise depuis le site Natal Capital Pro.`,
      mailReminder: `N'oubliez pas de joindre vos documents justificatifs à ce courriel avant l'envoi.`,
    },
    contact: {
      kicker: `Contact`,
      h2: `Discutons de votre prochaine décision financière.`,
      desc: `Notre équipe répond aux questions des entrepreneurs, des entreprises et des institutions.`,
      phoneLabel: `Téléphone`,
      emailLabel: `Courriel`,
      phone: `438 802 4007`,
      phoneHref: `tel:+14388024007`,
      email: `natcapro@gmail.com`,
      ctaPrimary: `Écrire un courriel`,
      ctaGhost: `Appeler maintenant`,
    },
    footer: {
      links: [
        { href: `#services`, label: `Services` },
        { href: `#programmes`, label: `Programmes` },
        { href: `#about`, label: `À propos` },
        { href: `#articles`, label: `Articles` },
        { href: `#financement`, label: `Demande` },
        { href: `#contact`, label: `Contact` },
      ],
      copyright: `© 2026 Natal Capital Pro. Tous droits réservés.`,
    },
  },

  en: {
    meta: {
      title: `Natal Capital Pro. | Investment research & advisory`,
      description: `Natal Capital Pro. supports entrepreneurs, companies and institutions in the structuring, financing and deployment of their business ventures and infrastructure projects.`,
    },
    nav: [
      { href: `#top`, label: `Home` },
      { href: `#services`, label: `Services` },
      { href: `#programmes`, label: `Programs` },
      { href: `#about`, label: `About` },
      { href: `#articles`, label: `Articles` },
      { href: `#financement`, label: `Apply` },
      { href: `#contact`, label: `Contact` },
    ],
    hero: {
      title: `See further, decide with clarity.`,
      sub: `Natal Capital Pro. supports entrepreneurs, companies and institutions in the structuring, financing and deployment of their business ventures and infrastructure projects.`,
      ctaPrimary: `Get in touch`,
      ctaGhost: `View services`,
    },
    positioning: {
      sectorLabel: `Sector`,
      sectorValue: `Financial & Infrastructure Services`,
      h2: `A partner in financing and digital infrastructure.`,
      paragraphs: [
        `Natal Capital Pro supports companies, institutions and project leaders in the structuring, financing and deployment of business ventures and digital infrastructure projects.`,
        `The firm develops solutions that address companies' financing, financial structuring and operational transformation needs, with particular expertise in digital finance and logistics.`,
        `Natal Capital Pro is notably involved in the design and structuring of projects related to fintech infrastructure, digital financing platforms, payment systems, digitalization of financial institutions, data infrastructure, logistics platforms, digital supply chain and flow management technologies.`,
      ],
    },
    services: {
      kicker: `What we do`,
      h2: `Research and advisory services built for decision making.`,
      desc: `A 360° view spanning market analysis, financing, governance and risk management.`,
      items: [
        { h: `Financial research & analysis`, p: `Market studies, macroeconomic tracking and clear recommendations to inform your business decisions.` },
        { h: `Custom institutional reports`, p: `Professional PDF reports built for investment committees, partners and boards.` },
        { h: `Corporate financing`, p: `Financing solutions structured for growing companies and large scale projects.` },
        { h: `Portfolio risk management`, p: `Risk analysis and oversight to protect portfolio value in a shifting market environment.` },
        { h: `Strategic advisory`, p: `Guidance for leaders on strategic choices, from organizational structuring to market positioning.` },
        { h: `Organizational development`, p: `Building the structures, processes and governance that support sustainable organizational growth.` },
      ],
      feature: {
        tag: `New · in development`,
        h: `Market expansion`,
        p: `Supporting Québec products into other Canadian provinces and international markets: access to distribution networks, commercial structuring and deployment at scale. This offering is currently in development — more details coming soon.`,
      },
    },
    programs: {
      kicker: `Our programs`,
      h2: `Equipment Financing Programs`,
      desc: `Three programs structured in partnership with a network of more than 30 specialized lenders, available across Canada.`,
      badge: `Available across Canada`,
      cards: [
        {
          h: `Commercial vehicles & equipment`,
          items: [
            `Trailers and transport equipment`,
            `Construction and excavation equipment`,
            `Forestry and heavy agricultural equipment`,
            `Garage and material handling equipment`,
          ],
        },
        {
          h: `Fitness equipment`,
          items: [
            `Training benches, free weights, kettlebells`,
            `Cable machines, squat racks, leg machines`,
            `Bikes, ellipticals, treadmills, rowers`,
            `Climbers and floor accessories`,
          ],
        },
        {
          h: `Agricultural & industrial equipment`,
          items: [
            `Agricultural equipment and field robotics`,
            `Industrial equipment and computer hardware`,
            `Medical and dental equipment`,
            `Restaurant and printing equipment`,
          ],
        },
      ],
      terms: [
        { h: `No effect on your borrowing capacity`, p: `The financed amount does not add to your personal credit usage.` },
        { h: `Deductible monthly payments`, p: `Lease payments are fully deductible for tax purposes.` },
        { h: `12 to 84 month terms`, p: `With flexible payment options for seasonal activities.` },
        { h: `24 to 48 hour approval`, p: `Files processed quickly to find the best terms.` },
      ],
      cta: `Apply now`,
    },
    about: {
      kicker: `The team`,
      h2: `About us`,
      name: `Marc Nguesson`,
      role: `Founder & Director | Advisory Services`,
      quote: `"Where Accounting looks like a continent where everything is conquered, Finance remains a vast ocean where everything still remains to be conquered."`,
      quoteCite: `Marc Nguesson`,
      bio: [
        `Our objective vision for the next ten years is to help redefine tomorrow's infrastructures and financial instruments without changing people's ways of working, but by streamlining them through advanced technological processes.`,
        `With a solid track record in corporate financing, project management and investments, our career has led us to collaborate with entrepreneurs, public institutions and private companies. We enjoy simplifying complexity, mobilizing stakeholders and contributing to innovative projects, whether industrial, technological, financial or related to sustainable development.`,
      ],
    },
    articles: {
      kicker: `Publications`,
      h2: `Articles`,
      desc: `This section gathers the financial analyses, economic outlooks and geopolitical case studies written by Natal Capital Pro. New pieces will be published here regularly.`,
      cards: [
        { h: `Financial analysis`, status: `First articles coming soon.`, tag: `Coming soon` },
        { h: `Economic outlooks`, status: `First articles coming soon.`, tag: `Coming soon` },
        { h: `Geopolitical case studies`, status: `First articles coming soon.`, tag: `Coming soon` },
      ],
    },
    finance: {
      kicker: `Get started`,
      h2: `Financing Request`,
      desc: `Complete the information below to start your request. You will be able to attach your documents directly in your email client before sending.`,
      blocks: [
        {
          title: `Applicant information`,
          rows: [
            { cols: 2, fields: [
              { type: `text`, label: `Legal company name` },
              { type: `checkbox`, label: `I do not have a company yet` },
            ] },
            { cols: 1, fields: [ { type: `text`, label: `Address` } ] },
            { cols: 3, fields: [
              { type: `text`, label: `City` },
              { type: `text`, label: `Province` },
              { type: `text`, label: `Postal code` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Phone` },
              { type: `text`, label: `Contact person` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Nature of business` },
              { type: `text`, label: `In business since` },
            ] },
          ],
        },
        {
          title: `Personal information`,
          note: `If less than 3 years in business or company not yet registered.`,
          rows: [
            { cols: 3, fields: [
              { type: `text`, label: `First name` },
              { type: `text`, label: `Last name` },
              { type: `text`, label: `Date of birth` },
            ] },
            { cols: 3, fields: [
              { type: `text`, label: `Address` },
              { type: `text`, label: `City` },
              { type: `text`, label: `Province` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `Postal code` },
              { type: `text`, label: `Phone` },
            ] },
          ],
        },
        {
          title: `Business details`,
          rows: [
            { cols: 2, fields: [
              { type: `text`, label: `When did the company start?` },
              { type: `text`, label: `When did you start working in this industry?` },
            ] },
            { cols: 2, fields: [
              { type: `select`, label: `Type of company`, placeholder: `Select`, options: [
                `Corporation`, `General partnership`, `Sole proprietorship`,
              ] },
              { type: `text`, label: `How are the company's finances?` },
            ] },
            { cols: 2, fields: [
              { type: `text`, label: `What amount of financing are you seeking?` },
              { type: `text`, label: `What do you wish to finance with the funds you are seeking?` },
            ] },
          ],
        },
        {
          rows: [
            { cols: 1, fields: [
              { type: `textarea`, label: `Additional message (optional)`, dataLabel: `Additional message` },
            ] },
          ],
        },
      ],
      attachNote: `After submitting your request, our team will contact you to collect your supporting documents (identification, financial statements, statements).`,
      submit: `Send my request`,
      sending: `Sending…`,
      successMsg: `Thank you! Your request has been sent. Our team will get back to you shortly.`,
      errorMsg: `Something went wrong while sending. Please try again.`,
      errorMailLink: `Send by email instead`,
      mailSubject: `Financing Request`,
      mailIntro: `Financing request submitted from the Natal Capital Pro website.`,
      mailReminder: `Please remember to attach your supporting documents to this email before sending.`,
    },
    contact: {
      kicker: `Contact`,
      h2: `Let's talk about your next financial decision.`,
      desc: `Our team answers questions from entrepreneurs, companies and institutions.`,
      phoneLabel: `Phone`,
      emailLabel: `Email`,
      phone: `438 802 4007`,
      phoneHref: `tel:+14388024007`,
      email: `natcapro@gmail.com`,
      ctaPrimary: `Send an email`,
      ctaGhost: `Call now`,
    },
    footer: {
      links: [
        { href: `#services`, label: `Services` },
        { href: `#programmes`, label: `Programs` },
        { href: `#about`, label: `About` },
        { href: `#articles`, label: `Articles` },
        { href: `#financement`, label: `Apply` },
        { href: `#contact`, label: `Contact` },
      ],
      copyright: `© 2026 Natal Capital Pro. All rights reserved.`,
    },
  },
};
