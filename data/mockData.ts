import { Article } from '../types';

export const genres = [
  'Politics', 'Technology', 'Health', 'Science', 'Business', 'Finance',
  'World News', 'National', 'Environment', 'Climate Change', 'Education',
  'Culture', 'Arts', 'Sports', 'Lifestyle', 'Travel', 'Food', 'Opinion',
  'Startups', 'Economy'
];

export const mockArticles: Article[] = [
  {
    id: '15',
    title: 'Opposition Parties Form Alliance Ahead of General Elections',
    source: 'Political Observer',
    publicationDate: '2023-10-16',
    genre: 'Politics',
    imageUrl: 'https://picsum.photos/seed/alliance/800/600',
    summary: 'In a significant political development, several key opposition parties have announced a formal alliance to challenge the ruling party in the upcoming elections.',
    fullText: 'Seeking to consolidate the anti-incumbency vote, three major opposition parties have officially formed a pre-poll alliance. The leaders held a joint press conference, vowing to set aside their differences to "protect democratic institutions." The alliance will contest seats with a common minimum program, focusing on issues like unemployment and inflation. Political analysts are divided on the impact of this coalition, with some seeing it as a formidable challenge to the ruling government, while others point to the historical instability of such alliances.',
    hook: "A new political alliance forms to challenge the government.",
    bullets: [
      "Three major opposition parties have united.",
      "Their focus is on unemployment and inflation.",
      "Analysts are divided on its potential impact."
    ],
    analysis: {
      primaryMetric: 'ideologicalLeaning',
      metrics: {
        ideologicalLeaning: -0.4,
        establishmentBias: -0.5,
        sensationalism: 0.2,
      },
      sentiment: { score: 'Neutral', value: 0.0 },
      topics: ['Politics', 'Elections', 'National', 'Government'],
      claims: [
        { statement: 'Three opposition parties formed a pre-poll alliance.', corroboration: 1.0 },
        { statement: 'The alliance will have a common minimum program.', corroboration: 0.8 },
      ],
      sourceCredibility: 0.88,
      explainability: ['significant development', 'challenge the ruling party', 'vowing to', 'formidable challenge'],
    },
    poll: {
      id: 'poll-15',
      question: 'Will this opposition alliance be effective in the next election?',
      options: [
        { id: 'opt1', text: 'Yes, it\'s a strong coalition.', votes: 124 },
        { id: 'opt2', text: 'No, internal conflicts will weaken it.', votes: 98 },
        { id: 'opt3', text: 'It\'s too early to tell.', votes: 215 },
      ]
    },
  },
  {
    id: '17',
    title: 'Ruling Party Defends Economic Record, Cites GDP Growth',
    source: 'The Statesman',
    publicationDate: '2023-10-16',
    genre: 'Politics',
    imageUrl: 'https://picsum.photos/seed/gdp/800/600',
    summary: 'The ruling party has defended its economic performance, pointing to strong GDP numbers and a stable macroeconomic environment as signs of progress.',
    fullText: 'Responding to criticism from the newly formed opposition alliance, the ruling party\'s spokesperson held a press conference to highlight the government\'s economic achievements. Citing a 7.5% GDP growth rate in the last quarter, the spokesperson asserted that the economy is on a strong footing. "Our policies have created jobs and fostered an environment for investment," he stated, dismissing the opposition\'s claims as "baseless fear-mongering." The party expressed confidence that voters would recognize the tangible benefits of their governance in the upcoming elections.',
    hook: "Government highlights a 7.5% GDP growth rate.",
    bullets: [
        "The ruling party defended its economic record.",
        "They claim policies have created jobs and investment.",
        "Opposition's claims are dismissed as 'baseless'."
    ],
    analysis: {
      primaryMetric: 'ideologicalLeaning',
      metrics: {
        ideologicalLeaning: 0.6,
        establishmentBias: 0.7,
        sensationalism: 0.3,
      },
      sentiment: { score: 'Positive', value: 0.6 },
      topics: ['Politics', 'Economy', 'Elections', 'Government'],
      claims: [
        { statement: 'The ruling party cited a 7.5% GDP growth rate.', corroboration: 0.9 },
        { statement: 'The party defended its economic record against opposition criticism.', corroboration: 1.0 },
      ],
      sourceCredibility: 0.86,
      explainability: ['defends economic performance', 'strong GDP numbers', 'signs of progress', 'baseless fear-mongering'],
    },
  },
  {
    id: '9',
    title: 'Astronomers Discover Water Vapor on Potentially Habitable Exoplanet',
    source: 'Cosmic Chronicles',
    publicationDate: '2023-10-19',
    genre: 'Science',
    imageUrl: 'https://picsum.photos/seed/exoplanet/800/600',
    summary: 'Using the James Webb Space Telescope, scientists have detected signs of water vapor in the atmosphere of an exoplanet located in the "habitable zone" of its star.',
    fullText: 'A groundbreaking discovery has been made by an international team of astronomers. Data from the James Webb Space Telescope indicates the presence of water vapor on K2-18b, an exoplanet eight times the mass of Earth. This planet orbits its star within the habitable zone, where conditions might be right for liquid water to exist on the surface. While the presence of water vapor does not confirm life, it is a tantalizing clue and makes K2-18b a prime candidate for further study in the search for extraterrestrial life. The findings represent a significant milestone in our ability to characterize worlds beyond our solar system.',
    hook: "Water vapor found on a potentially habitable exoplanet.",
    bullets: [
        "The discovery was made using the James Webb Telescope.",
        "The planet, K2-18b, is in the 'habitable zone'.",
        "It's a major clue in the search for extraterrestrial life."
    ],
    analysis: {
      primaryMetric: 'factualIntegrity',
      metrics: {
        factualIntegrity: 0.95,
        opinionation: 0.05,
        sensationalism: 0.6,
      },
      sentiment: { score: 'Positive', value: 0.9 },
      topics: ['Science', 'Astronomy', 'Space Exploration', 'Exoplanets'],
      claims: [
        { statement: 'Water vapor was detected on exoplanet K2-18b.', corroboration: 0.95 },
        { statement: 'K2-18b is in the habitable zone of its star.', corroboration: 0.9 },
        { statement: 'The discovery was made using the James Webb Space Telescope.', corroboration: 1.0 },
      ],
      sourceCredibility: 0.94,
      explainability: ['groundbreaking discovery', 'tantalizing clue', 'prime candidate', 'significant milestone'],
    },
  },
  {
    id: '2',
    title: 'New AI Breakthrough Could Revolutionize Medical Diagnostics',
    source: 'Tech Insights',
    publicationDate: '2023-10-26',
    genre: 'Technology',
    imageUrl: 'https://picsum.photos/seed/aihealth/800/600',
    summary: 'Researchers have developed a new AI model that can detect diseases from medical scans with unprecedented accuracy, potentially saving millions of lives.',
    fullText: 'A team of researchers at the Institute for Advanced AI has published a groundbreaking paper on a new deep learning model named "DiagnosNet". This AI can analyze medical images such as X-rays and MRIs to detect signs of various diseases, including cancer and heart conditions, with an accuracy rate of 99.5%. This is a significant improvement over current methods, which are often slower and more prone to human error. The team believes this technology could be deployed in hospitals worldwide within the next two years, making diagnostics cheaper, faster, and more accessible. While ethical considerations and regulatory approval are still hurdles to overcome, the potential to revolutionize healthcare is immense.',
    hook: "An AI achieved 99.5% accuracy in medical scans.",
    bullets: [
        "The model is named 'DiagnosNet'.",
        "It can detect cancer and heart conditions from X-rays.",
        "Could be deployed in hospitals within two years."
    ],
    analysis: {
      primaryMetric: 'hypeBias',
      metrics: {
        hypeBias: 0.8,
        sensationalism: 0.5,
      },
      sentiment: { score: 'Positive', value: 0.9 },
      topics: ['Artificial Intelligence', 'Healthcare', 'Medical Technology', 'Science'],
      claims: [
        { statement: 'New AI model "DiagnosNet" developed.', corroboration: 0.95 },
        { statement: 'Model achieves 99.5% accuracy in detecting diseases from scans.', corroboration: 0.8 },
        { statement: 'Technology could be deployed within two years.', corroboration: 0.4 },
      ],
      sourceCredibility: 0.92,
      explainability: ['breakthrough', 'revolutionize', 'unprecedented accuracy', 'immense potential'],
    },
    comments: [
      { id: 'c1', user: 'TechieTom', avatar: 'https://i.pravatar.cc/40?u=tom', text: 'This is huge for healthcare!', timestamp: '2h ago' },
      { id: 'c2', user: 'Dr. Anya', avatar: 'https://i.pravatar.cc/40?u=anya', text: 'As a doctor, I see the potential, but regulatory approval is a major challenge.', timestamp: '1h ago' },
    ]
  },
   {
    id: '8',
    title: 'Underdogs Clinch National Cricket Championship in Final-Ball Thriller',
    source: 'Sports Daily',
    publicationDate: '2023-10-20',
    genre: 'Sports',
    imageUrl: 'https://picsum.photos/seed/cricket/800/600',
    summary: 'In a match that will be remembered for ages, the underdog team won the national cricket title on the very last ball, capping a fairytale season.',
    fullText: 'It was a final for the history books. Needing three runs off the last ball, the striker hit a sensational six, sealing an improbable victory for a team that was ranked last at the start of the season. The stadium erupted as the players celebrated their first-ever championship. The captain called the victory a "dream come true" and a result of "unshakeable team spirit." Experts are calling it one of the greatest upsets in the history of the sport.',
    hook: "An underdog team won the cricket title on the final ball.",
    bullets: [
        "They needed 3 runs from the last ball and hit a six.",
        "The team was ranked last at the season's start.",
        "It's being called one of the greatest upsets in the sport."
    ],
    analysis: {
      primaryMetric: 'sentimentIntensity',
      metrics: {
        sentimentIntensity: 0.9,
        sensationalism: 0.8,
      },
      sentiment: { score: 'Positive', value: 1.0 },
      topics: ['Sports', 'Cricket', 'National'],
      claims: [
        { statement: 'The underdog team won the championship.', corroboration: 1.0 },
        { statement: 'The winning runs were scored on the final ball.', corroboration: 1.0 },
        { statement: 'It was the team\'s first-ever championship win.', corroboration: 0.9 },
      ],
      sourceCredibility: 0.85,
      explainability: ['remembered for ages', 'fairytale season', 'final-ball thriller', 'greatest upsets'],
    },
     comments: [
      { id: 'c3', user: 'CricketFan11', avatar: 'https://i.pravatar.cc/40?u=fan11', text: 'I was there! The stadium went absolutely wild!', timestamp: '5h ago' },
      { id: 'c4', user: 'Priya', avatar: 'https://i.pravatar.cc/40?u=priya', text: 'Best match I have ever seen. Unbelievable finish.', timestamp: '4h ago' },
      { id: 'c5', user: 'Rahul', avatar: 'https://i.pravatar.cc/40?u=rahul', text: 'Still getting goosebumps watching the highlights.', timestamp: '3h ago' },
    ]
  },
  {
    id: '1',
    eventId: 'green-energy-2023',
    title: 'Government Announces ₹20,000 Cr Investment in Green Energy',
    source: 'The Economic Times',
    publicationDate: '2023-10-27',
    genre: 'Economy',
    imageUrl: 'https://picsum.photos/seed/greenenergy/800/600',
    summary: 'The government has unveiled a massive investment plan aimed at boosting the nation\'s renewable energy sector and reducing carbon emissions.',
    fullText: 'In a landmark decision, the central government today announced a substantial ₹20,000 crore investment package for the green energy sector. This historic move is aimed at accelerating the transition to renewable energy sources like solar and wind power. Officials stated that this initiative, part of the National Green Mission, will not only combat climate change but also create thousands of new jobs and boost economic development. The investment will be phased over the next five years, with a focus on building new solar parks and upgrading the existing power grid infrastructure. Industry experts have lauded the decision as a "game-changer" for India\'s energy landscape, positioning the nation as a global leader in sustainable development.',
    hook: "Govt. invests ₹20,000 Cr in Green Energy.",
    bullets: [
        "The plan aims to boost solar and wind power.",
        "It's part of the National Green Mission.",
        "Experts are calling it a 'game-changer'."
    ],
    analysis: {
      primaryMetric: 'ideologicalLeaning',
      metrics: {
        ideologicalLeaning: 0.4,
        sensationalism: 0.2,
      },
      sentiment: { score: 'Positive', value: 0.8, },
      topics: ['Government Policy', 'Renewable Energy', 'Economy', 'Climate Change'],
      claims: [
        { statement: 'Government announced ₹20,000 Cr investment.', corroboration: 0.9 },
        { statement: 'Investment is part of the National Green Mission.', corroboration: 0.7 },
        { statement: 'Plan will create thousands of new jobs.', corroboration: 0.5 },
      ],
      sourceCredibility: 0.85,
      explainability: ['historic move', 'landmark decision', 'game-changer', 'boosts development'],
    },
    poll: {
      id: 'poll-1',
      question: 'Is this investment enough to make India a green energy leader?',
      options: [
        { id: 'opt1a', text: 'Yes, it\'s a great start.', votes: 310 },
        { id: 'opt2a', text: 'No, much more is needed.', votes: 152 },
        { id: 'opt3a', text: 'Depends on the implementation.', votes: 480 },
      ]
    },
  },
    {
    id: '10',
    eventId: 'green-energy-2023',
    title: 'New Green Energy Fund: A Bold Step or a Risky Gamble?',
    source: 'The People\'s Voice',
    publicationDate: '2023-10-28',
    genre: 'Opinion',
    imageUrl: 'https://picsum.photos/seed/greengamble/800/600',
    summary: 'While the government\'s ₹20,000 crore green energy plan is ambitious, critics question its feasibility and potential impact on taxpayers.',
    fullText: 'The recently announced ₹20,000 crore green energy fund has been met with both praise and skepticism. While supporters call it a necessary step towards a sustainable future, opposition voices raise concerns about the lack of a detailed roadmap and the potential for cronyism. Questions are being asked about where this substantial funding will be sourced from, with fears that it may lead to increased taxes on the common citizen. "While the goal is noble, the execution is what matters. We have seen grand announcements before that fail to deliver," said one policy analyst. The plan\'s success hinges on transparent allocation and overcoming significant bureaucratic hurdles.',
    hook: "Is the new ₹20,000 Cr fund a 'risky gamble'?",
    bullets: [
        "Critics question the plan's feasibility.",
        "There are fears of increased taxes.",
        "Concerns raised about potential cronyism."
    ],
    analysis: {
      primaryMetric: 'ideologicalLeaning',
      metrics: {
        ideologicalLeaning: -0.6,
        establishmentBias: -0.4,
        sensationalism: 0.4,
      },
      sentiment: { score: 'Negative', value: -0.5, },
      topics: ['Government Policy', 'Economy', 'Opinion', 'Renewable Energy'],
      claims: [
        { statement: 'A ₹20,000 crore green energy fund was announced.', corroboration: 1.0 },
        { statement: 'Critics are concerned about the plan\'s feasibility.', corroboration: 0.8 },
        { statement: 'There are fears of increased taxes.', corroboration: 0.4 },
      ],
      sourceCredibility: 0.75,
      explainability: ['risky gamble', 'critics question', 'fears', 'cronyism', 'bureaucratic hurdles'],
    },
  },
  {
    id: '11',
    eventId: 'green-energy-2023',
    title: 'India Allocates ₹20,000 Cr for Renewable Sector Expansion',
    source: 'Neutral News Network',
    publicationDate: '2023-10-27',
    genre: 'National',
    imageUrl: 'https://picsum.photos/seed/greenneutral/800/600',
    summary: 'The government has allocated ₹20,000 crore to expand the country\'s renewable energy capacity, focusing on solar and wind power projects.',
    fullText: 'The central government has formally allocated a budget of ₹20,000 crore for the renewable energy sector. The funds will be disbursed over a five-year period. The primary objective, according to the official release, is to increase the share of green energy in the national power grid. The plan involves the development of new solar parks and wind farms, as well as upgrading existing infrastructure to better integrate renewable sources. The Ministry of Power will oversee the allocation of the funds to various state-level and private projects based on a competitive bidding process.',
    hook: "₹20,000 Cr allocated for renewable energy.",
    bullets: [
      "Funds will be disbursed over five years.",
      "The goal is to increase green energy in the national grid.",
      "Ministry of Power will oversee the projects."
    ],
    analysis: {
      primaryMetric: 'ideologicalLeaning',
      metrics: {
        ideologicalLeaning: -0.05,
        sensationalism: 0.0,
      },
      sentiment: { score: 'Neutral', value: 0.0, },
      topics: ['Government Policy', 'National', 'Renewable Energy', 'Infrastructure'],
      claims: [
        { statement: '₹20,000 crore was allocated for the renewable sector.', corroboration: 1.0 },
        { statement: 'The funds will be disbursed over five years.', corroboration: 0.9 },
        { statement: 'The Ministry of Power will oversee the projects.', corroboration: 0.85 },
      ],
      sourceCredibility: 0.98,
      explainability: ['formally allocated', 'official release', 'primary objective', 'oversee the allocation'],
    },
  },
];