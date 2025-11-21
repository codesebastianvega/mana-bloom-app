# Shop Changes Documentation

## Overview
Implemented a comprehensive **7‑tier rarity system** and **composite pricing** for the Magic Shop. This introduces new visual cues, multi‑currency costs, and prepares the foundation for conditional unlocks (Divine tier).

## Files Modified
| File | Change Summary |
|------|----------------|
| `src/constants/shopCatalog.js` | Added `rarity` field to every item and replaced `price`/`currency` with a `cost` object supporting `mana`, `coin`, and `gem`. Defined `RARITY_TIERS` constants with colors/borders. |
| `src/components/home/ShopItemCard.js` | Updated UI to display a colored border based on rarity and render multiple currency chips (Mana, Coins, Gems). Adjusted CTA label to show full cost. |
| `src/screens/ShopScreen.js` | Refactored purchase logic: `isAffordable` now checks all required currencies, `handlePurchase` deducts each component via appropriate actions. Added helper `getCostLabel`. |
| `src/state/AppContext.js` | Confirmed reducer actions `PURCHASE_WITH_MANA`, `SPEND_COIN`, `SPEND_GEM` are used for multi‑currency deductions. |
| `CHANGELOG.md` | Added entry describing new rarity system, pricing model, UI updates, and impact. |

## Pricing Rationale
- **Basic** – cheap, often Mana‑only.
- **Uncommon** – Mana + Coins.
- **Rare** – Coins only.
- **Epic** – Coins + Gems.
- **Legendary** – Gems only.
- **Mythic** – Mana + Coins + Gems.
- **Divine** – Gems only, gated by future requirements (e.g., monthly tasks).

## Impact
- Clear visual rarity indicators for players.
- Flexible economy allowing future events and dynamic pricing.
- Purchase flow now robust across multiple currencies.
- Documentation ensures maintainability and easy onboarding for new developers.
