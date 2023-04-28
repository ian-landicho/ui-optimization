# UI Optimization

# Getting Started

```bash
# clone the repo
git clone [this repo]

# install dependencies
npm install

# start the app
npm run dev
```

# What are wasted renders?

- In `React`, these are the unnecessary render cycles caused by a state change

- This is one of the most common issues that affects performance

---

# Solution - `React.memo`

- See [`with-memo.tsx`](./src/app/with-memo.tsx)

# Drawbacks of `React.memo`

- Wrapping components in HoC makes your code bloated

- By default, it only runs shallow equality on objects

- If the component being wrapped contains `useState`, `useReducer`, or `useContext`, then the component will still re-render if its state or context change

---

# Solution - Move the `state`

- See [`with-move-state.tsx`](./src/app/with-move-state.tsx)

---

# Limitation of Moving the `state`

Moving the `state` won't work if it is needed somewhere above the expensive component.
We can't just simply extract and move the `state` into its own component.

---

# Solution - Use `children` prop

- See [`with-children.tsx`](./src/app/with-children.tsx)

# `React.context`

- See [`with-slow-provider.tsx`](./src/app/with-slow-provider.tsx)

# Issue with `React context`

All components subscribed to the context will re-render on state change

# Solution - Create sub `context`

- See [`with-fast-provider.tsx`](./src/app/with-fast-provider.tsx)

---

# Take Away

Before sprinkling `React.memo` all over our app, it will make more sense to examine our code and see how we could segregate components based on their responsibility and dependencies.

When using `context` api, creating sub contexts based on their responsibility will also avoid wasted renders.
