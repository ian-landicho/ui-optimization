'use client';
import * as React from 'react';
import ExpensiveComponent from './expensive-component';

export default function SlowCounter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="text-lg">
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
      <div className="mt-6">Count: {count}</div>
      <ExpensiveComponent />
    </div>
  );
}
