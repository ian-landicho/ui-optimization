'use client';
import * as React from 'react';
import ExpensiveComponent from './expensive-component';

/**
 * What we did?
 *
 * 1. We created a Container that wraps the `count` and the state itself.
 * 2. Our entry point which does not depend on the `count` state passed the `ExpensiveComponent` as a `jsx`,
 *    also known as `children`.
 */

/**
 * What's happening?
 *
 * When `count` state changes, the `Container` component re-renders.
 * But its children prop still has the previous jsx content.
 * This will tell React to skip the subcomponent and consequently, `ExpensiveComponent` does not re-render.
 *
 */

export default function WithChildren() {
  return (
    <Container>
      <ExpensiveComponent />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);

  return (
    <div
      className={`text-lg p-4 ${
        count % 2 === 0 ? 'bg-red-400' : 'bg-blue-400'
      }`}
    >
      <p className="mb-6 text-xl">Using `children` prop</p>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
      <div className="mt-6">Count: {count}</div>
      {children}
    </div>
  );
}

/**
 * This approach does not suffer from the same limitations as React.memo.
 * Even if we pass the same object as a prop, the component will not re-render.
 */
type Props = {
  payload: {
    message: string;
  };
};

function ExpensiveComponentWithProps(props: Props) {
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
