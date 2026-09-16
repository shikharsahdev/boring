A compact label for a status. Always include words so colour is not the only cue.

```jsx
<Badge status="normal">Visit confirmed</Badge>
<Badge status="attention">Review needed</Badge>
<Badge status="action">Report ready</Badge>
<Badge status="neutral" dot={false}>At home</Badge>
```

The existing status names remain compatible: normal uses sage, attention uses the attention pair, action uses sky and ink, and neutral uses warm paper. Validation errors use the dedicated error foreground/background tokens and actionable copy. Communicate urgent information clearly when it is needed.
