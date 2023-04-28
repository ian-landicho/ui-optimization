'use client';
import * as React from 'react';

export default function WithSlowProvider() {
  return (
    <CountProvider>
      <div className="flex justify-between w-96">
        <CounterA />
        <CounterB />
      </div>
    </CountProvider>
  );
}

type Value = {
  countA: number;
  countB: number;
  setCountA: React.Dispatch<React.SetStateAction<number>>;
  setCountB: React.Dispatch<React.SetStateAction<number>>;
};

const CountContext = React.createContext<Value>({
  countA: 0,
  countB: 0,
  setCountA: () => {},
  setCountB: () => {},
});

function CountProvider({ children }: { children: React.ReactNode }) {
  const [countA, setCountA] = React.useState(0);
  const [countB, setCountB] = React.useState(0);
  const value = React.useMemo(
    () => ({ countA, countB, setCountA, setCountB }),
    [countA, countB]
  );

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function CounterA() {
  console.log('Rendering Counter A...');
  const { countA, setCountA } = React.useContext(CountContext);

  return (
    <div>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase mb-6"
        onClick={() => setCountA(c => c + 1)}
      >
        Increment A
      </button>
      <div>Counter A: {countA}</div>
    </div>
  );
}

function CounterB() {
  console.log('Rendering Counter B...');
  const { countB, setCountB } = React.useContext(CountContext);

  return (
    <div>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-1 rounded shadow-md uppercase mb-6"
        onClick={() => setCountB(c => c + 1)}
      >
        Increment B
      </button>
      <div>Counter B: {countB}</div>
    </div>
  );
}
