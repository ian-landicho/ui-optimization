'use client';
import * as React from 'react';
import ExpensiveComponent from './expensive-component';

export default function WithMemo() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="text-lg">
      <p className="mb-6 text-xl">React.memo</p>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
      <div className="mt-6">Count: {count}</div>
      <MemoExpensiveComponent />
    </div>
  );
}

const MemoExpensiveComponent = React.memo(function MemoExpensiveComponent() {
  return <ExpensiveComponent />;
});

type Props = {
  payload: {
    message: string;
  };
};

// If the component being wrapped contains useState, useReducer, or useContext,
// then the component will still re-render if its state or context change

// More importantly, if we are passing a new object as a prop, the component will re-render
// even if the object has the same properties and values as the previous one.
// This is because React.memo does a shallow comparison of the props.

// To avoid this, we can use the second argument of React.memo, which is a function
// that receives the previous props and the next props and returns a boolean.
// If the function returns true, the component will not re-render.
// If the function returns false, the component will re-render.

// This is a good solution, but it is not perfect.
// This is an example of the check that React.memo does:
// prevProps.message === nextProps.message

const MemoExpensiveLimitation = React.memo(
  function MemoExpensiveLimitation(props: Props) {
    return <ExpensiveComponent />;
  },
  (prevProps, nextProps) => {
    return prevProps.payload.message === nextProps.payload.message;
  }
);
