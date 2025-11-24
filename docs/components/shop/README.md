# Shop Component

> **Screen:** `ShopScreen`  
> **Location:** `src/screens/ShopScreen.js`  
> **Last Updated:** 2025-11-23

## 📋 Overview

Mercado virtual donde los usuarios gastan sus recursos (Mana, Coins, Gems) para adquirir mejoras, cosméticos e items funcionales.

## 🎯 Features

- ✅ Catálogo de items (pociones, semillas, decoraciones)
- ✅ Sistema de compra con validación de recursos
- ✅ Inventario del usuario
- ✅ Categorías de tienda

## 🏗️ Architecture

### Data Flow

```
Shop Catalog (Constants) + User Resources (Context)
        ↓
ShopScreen
        ↓
Purchase Action
        ↓
Resource Deduction & Inventory Add
```

## 🔗 Connections

### Affects
- **Economy:** Consume recursos
- **Inventory:** Agrega items
- **Plant/Home:** Items comprados se usan allí

### Related Docs
- [Economy](../../mechanics/economy.md)
- [Shop Assets](../../design/assets/magic-shop.md)

## 📝 Changelog

### 2025-11-21 - Rarity System & Multi-Currency
- **Implemented 7-tier rarity system:** Basic, Uncommon, Rare, Epic, Legendary, Mythic, Divine.
- **Composite Pricing:** Items now cost a mix of Mana, Coins, and Gems.
- **UI Updates:** Colored borders based on rarity, multi-currency price chips.
- **Refactor:** `isAffordable` checks all currencies, `handlePurchase` deducts correctly.

---

*Documentación en construcción*
