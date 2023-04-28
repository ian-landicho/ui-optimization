'use client';
import * as React from 'react';

export default function WithFastProvider() {
  return (
    <CountProvider>
      <div className="flex justify-between w-96">
        <CounterA />
        <CounterB />
      </div>
    </CountProvider>
  );
}

type ValueA = {
  countA: number;
  setCountA: React.Dispatch<React.SetStateAction<number>>;
};

type ValueB = {
  countB: number;
  setCountB: React.Dispatch<React.SetStateAction<number>>;
};

const CountContextA = React.createContext<ValueA>({
  countA: 0,
  setCountA: () => {},
});

const CountContextB = React.createContext<ValueB>({
  countB: 0,
  setCountB: () => {},
});

function CountProvider({ children }: { children: React.ReactNode }) {
  const [countA, setCountA] = React.useState(0);
  const [countB, setCountB] = React.useState(0);

  const valueA = React.useMemo(() => ({ countA, setCountA }), [countA]);
  const valueB = React.useMemo(() => ({ countB, setCountB }), [countB]);

  return (
    <CountContextA.Provider value={valueA}>
      <CountContextB.Provider value={valueB}>{children}</CountContextB.Provider>
    </CountContextA.Provider>
  );
}

function CounterA() {
  console.log('Rendering Counter A...');
  const { countA, setCountA } = React.useContext(CountContextA);

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
  const { countB, setCountB } = React.useContext(CountContextB);

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
