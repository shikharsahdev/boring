Pill chip for filtering lists or showing a chosen value. Outlined by default, ink blue-tinted when selected.

```jsx
<Tag selected onClick={pick}>All results</Tag>
<Tag onRemove={() => remove("Thyroid")}>Thyroid</Tag>
```

Use `Badge` instead when the chip states a status rather than a choice.
