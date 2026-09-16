Confirms a completed action in one short sentence, then leaves. Never used for errors that need a decision — those are a `Dialog` or an inline note.

```jsx
<Toast>Visit booked. We've texted your mother the timing.</Toast>
<Toast tone="attention" icon="clock">We'll call you back within the hour.</Toast>
```

Bottom-centre on mobile, bottom-left on desktop. ~4s, fade only.
