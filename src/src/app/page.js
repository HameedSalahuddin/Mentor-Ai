'use client';

import OnboardingWizard from '@/components/OnboardingWizard';

export default function Home() {
  const handleOnboardingComplete = (data) => {
    console.log('User Selections:', data);
    alert(`Learning plan generated for ${data.language}! Check your browser console.`);
  };

  return (
    <main>
      <OnboardingWizard onComplete={handleOnboardingComplete} />
    </main>
  );
}
