import React from 'react';
import { BISOnboarding } from './BISOnboarding';
import { BISDashboard } from './BISDashboard';

interface BusinessIntelligenceSuiteProps {
  config: { industry: string | null; focus: string | null };
  onOnboardingComplete: (industry: string, focus: string) => void;
}

export const BusinessIntelligenceSuite: React.FC<BusinessIntelligenceSuiteProps> = ({ config, onOnboardingComplete }) => {
  if (!config.industry || !config.focus) {
    return <BISOnboarding onComplete={onOnboardingComplete} />;
  }

  return <BISDashboard config={config} />;
};
