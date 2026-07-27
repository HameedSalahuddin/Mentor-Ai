'use client';

import { useState } from 'react';
import Onboarding from '../components/OnboardingWizard';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [hasPlan, setHasPlan] = useState(false);

  return (
    <main>
      {!hasPlan ? (
        <Onboarding onComplete={() => setHasPlan(true)} />
      ) : (
        <Dashboard onReset={() => setHasPlan(false)} />
      )}
    </main>
  );
}


