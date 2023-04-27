'use client';
import * as React from 'react';

export default function ExpensiveComponent() {
  console.log('Rendering expensive component...');

  const now = performance.now();
  while (performance.now() - now < 1500) {
    // delay 1.5 seconds
  }

  return (
    <div className="text-lg border-solid border-red-400 border-2 mt-10 p-2">
      Expensive component
    </div>
  );
}
