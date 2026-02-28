export const metricInfo = {
  ideologicalLeaning: {
    title: 'Ideological Leaning',
    description: 'Measures the political bias of an article on a scale from -1 (Left) to +1 (Right). A score near 0 indicates a more neutral or balanced perspective.'
  },
  establishmentBias: {
    title: 'Establishment Bias',
    description: 'Analyzes whether the article favors established institutions and official sources (positive score) or challenges them (negative score).'
  },
  factualIntegrity: {
    title: 'Factual Integrity',
    description: 'Represents the proportion of verifiable, evidence-based statements in the article. A higher score indicates a greater commitment to fact-based reporting.'
  },
  opinionation: {
    title: 'Opinionation',
    description: 'Measures the degree to which the article contains subjective opinions versus objective facts. A higher score means more opinion-based content.'
  },
  sensationalism: {
    title: 'Sensationalism',
    description: 'Detects the use of emotionally charged, exaggerated, or clickbait-style language designed to provoke a strong reaction rather than inform.'
  },
  hypeBias: {
    title: 'Hype / Fear Bias',
    description: 'Specific to technology news, this metric measures the tone on a scale from -1 (promoting fear/doubt) to +1 (promoting hype/overexcitement).'
  },
  sentimentIntensity: {
    title: 'Sentiment Intensity',
    description: 'Gauges the emotional charge of the article. A higher score indicates stronger positive or negative sentiment, common in sports or culture reporting.'
  },
  sourceCredibility: {
    title: 'Source Credibility Score',
    description: 'An overall score for the publication based on historical accuracy, journalistic standards, and transparency. It reflects the general trustworthiness of the source.'
  }
};
