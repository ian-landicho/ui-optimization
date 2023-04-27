# UI Optimization

### a.k.a. How to avoid wasted renders

---

# What are wasted renders?

- In `React`, these are the unnecessary render cycles caused by a state change

- This is one of the most common issues that affects performance

# Solution - `React.memo`

# Drawbacks of `React.memo`

- Wrapping components in HoC makes your code bloated

- By default, it only runs shallow equality on objects

- If the component being wrapped contains `useState`, `useReducer`, or `useContext`, then the component will still re-render if its state or context change

---

import SolutionMoveState from './src/solution-move-state';

# Solution - Move the `state`

<SolutionMoveState />

```jsx
export default function SolutionMoveState() {
  return (
    <>
      <Form />
      <VeryExpensiveComponent />
    </>
  );
}

function Form() {
  const [backgroundColor, setBackgroundColor] = React.useState('');

  return (
    <>
      <label>Enter my component background color</label>
      <input
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
      <div style={{ ...boxStyle, backgroundColor }}>My component</div>
    </>
  );
}
```

---

# Limitation of Moving the `state`

Moving the `state` won't work if it is needed somewhere above the expensive component.
We can't just simply extract and move the `state` into its own component.

---

import SlowApp2 from './src/slow-app-2';

# Slow App - `state` needed in the app

<SlowApp2 />

```jsx
export default function SlowApp2() {
  const [backgroundColor, setBackgroundColor] = React.useState('');

  return (
    <div style={{ backgroundColor }}>
      <label>Enter app background color</label>
      <input
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
      <div style={boxStyle}>My component</div>
      <VeryExpensiveComponent />
    </div>
  );
}
```

---

import SolutionUseChildren from './src/solution-use-children';

# Solution - Use `children` prop

<SolutionUseChildren />

```jsx
export default function SolutionUseChildren() {
  return (
    <AppBackgroundSetter>
      <div style={boxStyle}>My component</div>
      <VeryExpensiveComponent />
    </AppBackgroundSetter>
  );
}

function AppBackgroundSetter({ children }) {
  const [backgroundColor, setBackgroundColor] = React.useState('');

  return (
    <div style={{ backgroundColor }}>
      <label>Enter app background color</label>
      <input
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
      {children}
    </div>
  );
}
```

---

# What We Did?

We grouped the app into two components:

- `AppBackgroundSetter` that depends on the `backgroundColor` and the state itself:

```jsx
function AppBackgroundSetter({ children }) {
  const [backgroundColor, setBackgroundColor] = React.useState('');

  return (
    <div style={{ backgroundColor }}>
      <label>Enter app background color</label>
      <input
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
      {children}
    </div>
  );
}
```

- Our entry point which does not depend on the `backgroundColor` are passed to the `AppBackgroundSetter` as a `jsx`, aka the `children` prop:

```jsx
<AppBackgroundSetter>
  <div style={boxStyle}>My component</div>
  <VeryExpensiveComponent />
</AppBackgroundSetter>
```

## What's Happening?

When `backgroundColor` changes, `AppBackgroundSetter` re-renders. But its `children` prop still has the previous `jsx` content. This will tell `React` to skip the subcomponent
and consequently, `VeryExpensiveComponent` does not re-render.

---

import SlowApp3 from './src/slow-app-3';

# Issue with `React context`

All components subscribed to the context will re-render on state change

<SlowApp3 />

---

# Issue with `React context`

```jsx
const CountContext = React.createContext();

function CountProvider({ children }) {
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
      <div>Counter A: {countA}</div>
      <button onClick={() => setCountA(countA + 1)}>+ 1</button>
    </div>
  );
}

function CounterB() {
  console.log('Rendering Counter B...');
  const { countB, setCountB } = React.useContext(CountContext);

  return (
    <div>
      <div>Counter B: {countB}</div>
      <button onClick={() => setCountB(countB + 1)}>+ 1</button>
    </div>
  );
}
```

---

# Solution - Create sub `context`

```jsx
const CountAContext = React.createContext();
const CountBContext = React.createContext();

function CountProvider({ children }) {
  const [countA, setCountA] = React.useState(0);
  const [countB, setCountB] = React.useState(0);

  const valueA = React.useMemo(() => ({ countA, setCountA }), [countA]);
  const valueB = React.useMemo(() => ({ countB, setCountB }), [countB]);

  return (
    <CountAContext.Provider value={valueA}>
      <CountBContext.Provider value={valueB}>{children}</CountBContext.Provider>
    </CountAContext.Provider>
  );
}

function CounterA() {
  console.log('Rendering Counter A...');
  const { countA, setCountA } = React.useContext(CountAContext);

  return (
    <div>
      <div>Counter A: {countA}</div>
      <button onClick={() => setCountA(countA + 1)}>+ 1</button>
    </div>
  );
}

function CounterB() {
  console.log('Rendering Counter B...');
  const { countB, setCountB } = React.useContext(CountBContext);

  return (
    <div>
      <div>Counter B: {countB}</div>
      <button onClick={() => setCountB(countB + 1)}>+ 1</button>
    </div>
  );
}
```

---

import SolutionSubContexts from './src/solution-sub-contexts';

# Solution - Create sub `context`

<SolutionSubContexts />

---

# Take Away

Before sprinkling `React.memo` all over our app, it might make more sense to examine our code and see how we could segregate components based on their responsibility and dependencies.

When using `context` api, creating sub contexts based on their responsibility will also avoid wasted renders.

---

# Questions?
