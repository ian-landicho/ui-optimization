'use client';
import * as React from 'react';
import ExpensiveComponent from './expensive-component';

export default function MoveState() {
  return (
    <>
      <Counter />
      <ExpensiveComponent />
    </>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className={`text-lg p-4`}>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
      <div className="mt-6">Count: {count}</div>
    </div>
  );
}

// Moving the state won't work if it is needed somewhere above the expensive component.
// We can't just simply extract and move the state into its own component.
// Example: If the count state is needed on top of the expensive component, we can't move it.
// For example we want to change the background color of the main container based on the count state.
function MoveStateLimitations() {
  const [count, setCount] = React.useState(0);

  return (
    <div
      className={`text-lg p-4 ${
        count % 2 === 0 ? 'bg-red-400' : 'bg-blue-400'
      }`}
    >
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
      <div className="mt-6">Count: {count}</div>
      <ExpensiveComponent />
    </div>
  );
}
