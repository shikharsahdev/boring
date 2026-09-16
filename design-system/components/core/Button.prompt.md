Buttons carry the single next step on a surface; use `primary` once per view and `secondary`/`quiet` for everything else.

```jsx
<Button variant="primary" size="lg" iconLeft="phone" fullWidth>Book a consult</Button>
<Button variant="secondary">See last panel</Button>
<Button variant="quiet" iconRight="arrow-right">How it works</Button>
```

- `size="lg"` (56px) on any screen a parent 60+ will use; `md` (48px) elsewhere. Never below `sm` (40px).
- `variant="inverse"` only on `--surface-inverse` grounds.
- Label copy is a plain verb phrase, sentence case, no exclamation: "Book a consult", not "Book Now!".
