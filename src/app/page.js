'use client';

import { useState } from 'react';
import OnboardingWizard from '@/components/OnboardingWizard';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [userPlan, setUserPlan] = useState(null);

  return (
    <main className="bg-gh-bg min-h-screen">
      {!userPlan ? (
        <OnboardingWizard onComplete={(data) => setUserPlan(data)} />
      ) : (
        <Dashboard planData={userPlan} onReset={() => setUserPlan(null)} />
      )}
    </main>
  );
}
