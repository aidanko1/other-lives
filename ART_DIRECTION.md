# Other Lives pixel art specification

The visual target is the compact, overhead, slightly angled GBA overworld language of Pokémon Emerald (2004). All artwork is original; do not reuse recognisable Pokémon characters, locations, buildings or game assets.

- Compose one static household strip: home left; player, co-residents and pets centre; present school, university or occupation right. No labels beneath sprites, walkable map or movement controls. Infants have a garden rather than a school/workplace.
- Base grid: 16 × 16 pixels. Strip: 384 × 128 native pixels. Adult characters fit approximately 16 × 32 pixels (current drawing 16 × 29); children 12 × 23, infants 10 × 14. Keep feet on a shared ground plane; use a second row for larger households.
- Camera: overhead ground with building fronts visible. No horizon, sky, isometric projection, perspective vanishing points or 3D lighting.
- Pixels: integer coordinates and compact clusters. Canvas smoothing off; CSS `image-rendering: pixelated`. No gradients, antialiasing, blur, fractional sprite scaling or artificial high-resolution pixel filters.
- Palette: grass #88b868 / #689850 / #a8d080; path #d8c898 / #b0a878 / #e8d8a8; outline #403038 / #485868; walls #e8d8a8 / #c8b078 / #a09870; glass #78b8c0 / #b0e0d0; roof #b86858 or #607890. Use 2–3 tones for each material and selective dark outlines.
- Characters: compact chibi silhouettes, restrained head/body ratio, one-pixel eyes, no elaborate expressions. Persistent skin, hair, clothing variants; inherited family resemblance with individual variation. White/grey hair and occasional walking aids reflect age. Appearance has no effect on ability, income, health or other simulation probabilities.
- Places: retain one pixel density and asset scale. Urban East Asian homes may use apartment blocks, rural homes lower roofs, poorer homes simpler materials. Grow the original tile catalogue for specific settings rather than presenting these templates as an exhaustive cultural representation.
- Current art is a code-drawn first pass against this specification. A definitive Emerald screenshot was requested but was not available in the current attachments; IMG_2211 is the Other Lives profile screenshot. Compare future assets with the user's Emerald reference when supplied, especially silhouettes, roofs and tile density.
