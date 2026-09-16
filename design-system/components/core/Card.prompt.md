The default container: 18px radius, hairline warm border, paper fill, flat by default.

```jsx
<Card tone="paper" padding="md">
  <p className="ds-label">Next up</p>
  <h3>Full blood panel</h3>
</Card>
```

Tints (`accent`, `calm`, `attention`) drop the border and are for one highlighted card per view. Reserve `elevation="raised"` for sheets and menus — stacked cards on a page stay `flat`.
