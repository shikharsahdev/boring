Asks for one decision, or confirms one. Terracotta primary, secondary "Not now" — never a destructive-red pairing.

```jsx
<Dialog open={open} variant="sheet" title="Book the home visit?"
  description="Tuesday 18 March, 7–9am. A phlebotomist comes to your mother's address in Pune."
  onClose={close}
  footer={<><Button fullWidth>Confirm</Button><Button variant="secondary" fullWidth onClick={close}>Not now</Button></>} />
```

Requires `@keyframes boring-dialog-in` and a positioned ancestor; the UI kits include both.
