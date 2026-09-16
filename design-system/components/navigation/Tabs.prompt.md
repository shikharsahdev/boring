Switches between views of the same thing (one parent's results, visits, documents). Not for top-level app navigation.

```jsx
<Tabs tabs={[{ value: "results", label: "Results", count: 6 }, { value: "visits", label: "Visits" }]} defaultValue="results" onChange={setView} />
```

Two to four tabs. Label them as nouns, not verbs.
