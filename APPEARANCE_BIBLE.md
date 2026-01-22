
# 🎨 Designová Bible: Studio Synthesis (v2.40)
Tento dokument definuje vizuální standardy a UI pravidla pro projekt FixIt Guru. Jakýkoliv budoucí zásah do kódu musí respektovat tyto principy.

---

## 🏗️ 1. Architektura a Layout
### Command Center (Pure List Mode)
- **Fullscreen Integration**: Rozhraní vždy zabírá 100 % plochy displeje.
- **Item Precision**: Každá položka v seznamu má fixní výšku **1.5 cm** (`h-[1.5cm]`).
- **No-Cell Policy**: Moduly nejsou uzavřeny v buňkách nebo kartách. Jsou to čisté řádky s jemným oddělovačem.

---

## 🌍 2. Environment & Display Modes (v2.40)
Systém nyní podporuje tři základní režimy okolního osvětlení:
1. **Light Mode**: Čistá, břidlicově bílá (#fbfbfd). Maximální čitelnost.
2. **Dark Mode**: Temné technické šero (#0f0f11). Snížený oční stress.
3. **Amoled Mode**: Čistá OLED černá (#000000). Extrémní úspora energie a kontrast.

---

## 📐 3. Background Matrix (Procedurální vzorce)
Pozadí HUDu je tvořeno dynamicky generovanými patterny:
- **Studio (Default)**: Dynamické akcentové záře na okrajích.
- **Blueprint**: Čtvercová síť 40x40px evokující technický výkres (Karel).
- **Topographic**: SVG vrstevnice simulující terén nebo organický růst (Dáša).
- **Neural**: Abstraktní síť bodů reprezentující propojenost AI asistentů.

---

## 💎 4. Vizuální Identita (Design Tokens)
### Barevná Paleta (Guru Colors)
- **KAREL (Hardware)**: `blue-600` (#2563eb).
- **LUCIE (Knowledge)**: `amber-600` (#d97706).
- **DÁŠA (Organic)**: `emerald-600` (#059669).
- **FRANTIŠEK (Force)**: `orange-600` (#ea580c).

---

## 🧪 5. Dynamické Nastavení (Modular UI)
- **Accent Logic**: Globální barva se mění podle vybraného specialisty.
- **Ambient Glow**: Nastavitelná intenzita rozostřeného podsvícení.
- **Pulse Mode**: Dynamická vizuální zpětná vazba pro indikaci AI procesů.
- **Contrast Booster**: SW filtr zvyšující sytost pro venkovní použití.

---
*Vytvořeno pro potřeby AI technického mozku Studio Synthesis.*
