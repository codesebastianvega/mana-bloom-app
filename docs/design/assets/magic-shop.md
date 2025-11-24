// [MB] Módulo: Shop / Sección: Assets
// Afecta: MagicShop planning
// Propósito: Registrar los nuevos gráficos y proponer cómo integrar la tienda
// Puntos de edición futura: Actualizar costos, conectarlo con Context y pantalla
// Autor: Codex - Fecha: 2025-11-18

# Inventario inicial para la tienda mágica

Estos assets recién subidos serán la base para los módulos de compra/visualización de la tienda mágica. Tenerlos catalogados facilita armar los grids de ítems, las tarjetas de preview y los filtros por tipo/rareza.

## Iconografía elemental
- `assets/iconofuego.png`, `iconoagua`, `iconotierra`, `iconoviento`: íconos únicos que pueden usarse para badges de rareza, nodos de selección rápida y balance elemental en el hero.
- `assets/ritualicons/` (existente) se puede combinar con los iconos nuevos para mostrar efectos activos.

## Mascotas (`assets/pets`)
- Nuevas sprites listadas: `arturo1/2`, `babosa`, `bug1`, `caracol`, `cochinilla`, `cocoa`, `fly`, `goldenfish`, `merlin`, `polilla`, `spider`, `tokyo`, `turtle`, `warm` y otros (ant, bee, bunny, dragon, etc.).
- Cada pet puede llevar metadata (tipo elemental, coste en mana, bonus estético) para anidar en un objeto de configuración.

## Plantas (`assets/plants`)
- Incorporaciones destacadas: `carnivora`, `mushroom`, `ortiga`, además del roster existente (`abedul`, `appeltree`, `baobabmistico`, etc.).
- Considerar stages múltiples y poses para permitir previews en cards y para subir nuevas macros (por ejemplo, `dandelionstage1/2`).

## Cosméticos (`assets/cosmeticos`)
- Accesorios premium: `ala de mariposa`, `coronareal`, `maceta dorada`, `sombrero encantado`.
- Marcos y auras en `assets/cosmeticos/marcosaura/` como `aura arcana`, `arcoiris`, `de agua`, `de fuego`, `hojas susurrantes`, `nebulosa`, `auraviento`, `auta de tierra`.
- Usar estas capas como previews en el hero y botones de equipamiento; los marcos pueden aplicarse encima del PlantHero, y las auras podrían animarse mediante Reanimated o un overlay pulsante.

## Pociones (`assets/potions`)
- Nuevos frascos: `cristal de mana`, `cristalmagico`, `elixir de energia`, `pocion de sabiduria`, `pocion temporal`, `pocion verde`, `potion lila`, `relampago de foco`.
- Destacar efectos (mana regen, XP boost, cooldown) en overlays pequeños y reutilizar el mismo layout de tarjetas del hero para mantener consistencia.

## Herramientas (`assets/tools`)
- Ítems útiles: `baul`, `brujulamistica`, `curarplanta`, `escudo temporal`, `hacha enana`, `libro de hechizos`, `masterkey`, `misticegg`, `pala`, `pergaminomistico`, `relogmagico`, `ring`, `varitaelfica1`.
- Los tools pueden mapearse a skills o boosts temporales; crear un objeto `shop/tools.json` o similar con `stats`, `duracion`, `costo`.

## Próximos pasos para mañana
1. Crear un archivo de configuración (`src/data/shop-items.js` o similar) que liste cada asset con `id`, `tipo`, `costoMana`, `estado` (comprado/equipado).
2. Definir y diseñar `MagicShopScreen` y sus cards (`PetCard`, `PlantCard`, `CosmeticCard`, `PotionCard`, `ToolCard`) dentro de `src/components/shop/`.
3. Añadir navegación (tal vez un nuevo tab o stack) y usar Context/estado existente para compartir el mana actual.
4. Repasar el balance elemental/estadísticas de PlantScreen y vincular botones de acción directa (por ejemplo, “equipar aura”) desde la tienda.
