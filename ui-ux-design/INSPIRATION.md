# UI/UX Inspiration

## Reference direction

The neo-brutalist references reviewed for this pass consistently use flat color, high-contrast dark strokes, solid typography, and hard-edged shadows. They also warn against overwhelming mobile screens with too many oversized elements or competing colors.

References:

- [Neobrutalism UI resources](https://www.neobrutalism.dev/docs/resources)
- [Neobrutalism UI guide](https://dribbble.com/shots/20764973-Neobrutalism-UI-How-to)
- [Neo-brutalism UI design principles](https://www.onething.design/post/what-is-neo-brutalism-ui-design)

## Translate the inspiration into Kuvo

### Borrow

- `#0F1720` or near-black for outlines and text
- 2–3px borders on identity cards and primary controls
- hard offset shadows such as `4px 4px 0 #0F1720`
- solid green, purple, and orange blocks
- oversized but short headings in onboarding and empty states
- compact, geometric icons that survive small sizes

### Keep calm

- Chat screens should use mostly one accent at a time.
- Message bubbles should prioritize readable spacing over heavy decoration.
- Use one hard shadow for a primary action, not a shadow stack.
- Keep body text in Inter or another highly legible sans serif.
- Preserve familiar bottom navigation and back actions.

### Avoid

- Gradients, glassmorphism, and soft multi-layer shadows in the core identity
- All-caps paragraphs
- Decorative patterns behind message content
- Thin gray text on pastel backgrounds
- Turning every surface into a sticker or badge
- Literal cultural motifs used as a substitute for product clarity

## Suggested first-pass tokens

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0F1720` | Text, outlines, hard shadows |
| Kuvo Green | `#00C853` | Primary action and active state |
| Signal Purple | `#6C5CE7` | Secondary action and discovery |
| Pulse Orange | `#FF6B35` | Attention, status, and celebration |
| Paper | `#F7F8FC` | App background |
| White | `#FFFFFF` | Cards and message surfaces |
| Soft Line | `#D6D9E0` | Quiet dividers |

## Interaction notes

- Primary buttons should use a solid fill, dark border, and a small downward-right press state.
- Cards should lift only when they are interactive.
- Empty states should explain what to do next, not only show an illustration.
- A high-contrast focus or pressed state is required for every primary control.