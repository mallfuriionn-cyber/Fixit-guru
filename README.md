🔧 FixIt Guru v2.1 – Studio Synth Terminal
FixIt Guru je pokročilé AI rozhraní pro demokratizaci technických znalostí, boj FixIt plánovanému zastarávání věcí a podporu práva na opravu v digitálním věku.
🚀 Rychlý start (Run Locally)
Pro lokální nasazení aplikace postupujte podle těchto kroků:
 * Prerekvizity: Vyžaduje Node.js.
 * Instalace závislostí:
   npm install

 * Konfigurace: Nastavte svůj GEMINI_API_KEY v souboru .env.local.
 * Spuštění:
   npm run dev

📂 Přehled klíčových modulů
1. Registrace Identity (Identity Portal)
Zabezpečené rozhraní pro správu uživatelských profilů se zaoblenou estetikou a logikou Synthesis.
 * User Tiers: Přepínání mezi režimy Expert a Rodina (případně Začátečník/Zkušený/Profík).
 * E-mailový terminál: Centrální komunikační uzel (např. operator@synthesis.studio).
 * Secure Gate: Podpora biometrického ověření (Otisk) a integrace Google Auth.
2. Zlepšení (Backlog Synthesis)
Interaktivní platforma pro komunitní vývoj a návrhy nových funkcí.
 * Audio Diagnostika v3.0: Automatické rozpoznání frekvence zadřených ložisek a opotřebení uhlíků.
 * 3D STL Katalog: Databáze náhradních krytek a knoflíků pro přímý 3D tisk u vás doma.
 * Kniha přání: Modul pro zápis požadavků na nové specialisty v týmu Synthesis.
3. Právo & Ochrana (Compliance Core v2.89)
Právní průvodce Synthesis chránící vaše právo na údržbu a opravu.
 * Cítím se podveden: Okamžité spuštění reklamačního asistenta při detekci nefunkčního zařízení.
 * Právo na opravu (EU): Zákony nutící výrobce konstruovat věci tak, aby byly rozebíratelné běžným nářadím.
 * Dostupnost dílů (10 let): Povinnost výrobců držet náhradní díly a doručit je do 15 pracovních dnů.
 * Boj s kazítky: Ochrana proti záměrnému snižování životnosti softwaru nebo hardwaru.
 * Nárok na dokumentaci: Vyhledávání servisních manuálů a kódů, které dříve výrobci tajili (Asistentka Lucie).
🛠️ Technická architektura
Systém využívá modulární strukturu pro ukládání dat (JSON formáty) a dedikované AI agenty:
 * Karel: Specialista na hardware, PCB a měření.
 * Lucie: Expertka na dokumentaci, manuály a metodické vedení.
 * Dáša: Specialistka na ekologii a organickou údržbu.
 * František: Mistr síly, mechaniky a bezpečnosti práce.
⚖️ Bezpečnostní upozornění
> BEZPEČNOSTNÍ PROTOKOL: Práce na elektrických zařízeních (230V) vyžaduje odbornou způsobilost. Používáním systému potvrzujete znalost bezpečnostních standardů. Studio Synthesis neručí za škody na majetku či zdraví vzniklé neodbornou manipulací.
> 
Vytvořeno pro komunitu Studio Synthesis | 2026






---

## 🛠️ Automatizace a CI/CD (Novinky)

Aktuálně jsme do projektu integrovali plnou automatizaci přes **GitHub Actions**, která zajišťuje:

### 🚀 Živé statusy
![Sestavení a Release](https://img.shields.io/github/actions/workflow/status/mallfuriionn-cyber/Fixit-guru/release.yml?branch=main&label=Build%20%26%20Release&style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Web-Live_on_Pages-blue?style=for-the-badge)

### 📦 Automatické verze (Releases)
Pokaždé, když nahrajeme kód do větve `main`, robot automaticky:
1. **Sestaví projekt** v prostředí Deno.
2. **Vytvoří unikátní balíček** (.zip) s aktuálním kódem.
3. **Publikuje novou verzi** v sekci [Releases](./releases), kde si ji může kdokoli stáhnout.

### 🌐 Webová prezentace
Projekt je nyní nastaven pro automatické nasazení na **GitHub Pages**. Jakmile je repozitář veřejný, najdete živou ukázku na:
👉 `https://mallfuriionn-cyber.github.io/Fixit-guru/`

---
*Vytvořeno pro komunitu Studio Synthesis | 2026*
