# Changelog

## 2025-11-21 - Advanced Shop System

### New Features
- Implemented a **7‑tier rarity system** (Basic, Uncommon, Rare, Epic, Legendary, Mythic, Divine) for all shop items.
- Added **composite pricing** allowing items to cost a combination of Mana, Coins, and Gems.
- Introduced **rarity‑based UI styling**: cards now display a colored border according to rarity tier.
- Updated `shopCatalog.js` to include `rarity` and `cost` objects for each item.
- Modified `ShopItemCard` to render multiple currency chips and apply rarity borders.
- Refactored purchase logic in `ShopScreen` to deduct each currency component and handle affordability checks.
- Extended `AppContext` reducer with actions `PURCHASE_WITH_MANA`, `SPEND_COIN`, and `SPEND_GEM` to support multi‑currency deductions.

### Pricing Rationale
- **Basic** items are free or cheap (≤ 100 Coins) and use only Mana.
- **Uncommon** items require Mana + Coins.
- **Rare** items are priced in Coins only.
- **Epic** items need a mix of Coins and Gems.
- **Legendary** items are purchased with Gems exclusively.
- **Mythic** items combine Mana, Coins, and Gems.
- **Divine** items are Gem‑only and gated behind monthly task/ritual completions (future implementation).

### Impact
- Players now see clear rarity indicators and understand resource requirements.
- The shop can support future event‑based pricing and conditional unlocks.
- Inventory counts and wallet UI remain consistent with new purchase flow.

---

*All changes have been tested locally and verified to work with existing state management.*
