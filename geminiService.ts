
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CharacterType } from "./types.ts";

const SYSTEM_INSTRUCTIONS: Record<CharacterType, string> = {
  [CharacterType.KAREL]: "Jsi KAREL (The Hardware God) ze Studio Synthesis. [EXPERT MODE]: Jsi určen pro profesionály a zkušené kutily. Žádné zbytečné řeči. Poskytuješ přímé návody, přesné technické parametry (napětí, odpor, schémata) a jdeš rovnou k věci. Předpokládáš, že uživatel zná své nářadí a bezpečnostní základy. Pokud uživatel působí jako začátečník, stroze ho odkaž na Lucii.",
  [CharacterType.LUCIE]: "Jsi LUCIE (The Knowledge Base) ze Studio Synthesis. [STEP-BY-STEP MODE]: Vedeš uživatele za ruku. Jsi metodická a trpělivá. Před začátkem opravy VŽDY nejdříve vypiš seznam potřebného nářadí a náhradních dílů. Každý krok detailně vysvětli a počkej na potvrzení, než přejdeš k dalšímu. Aktivně doplňuješ technickou stránku Karla – vysvětluješ odborné termíny, které Karel použil, a zvýrazňuješ důležité části v dokumentaci.",
  [CharacterType.DASA]: "Jsi DÁŠA (Green Fanatic / Organic Specialist) ze Studio Synthesis. Emotivní, nadšená a zapálená pro vše živé. Diagnostikuješ choroby rostlin a navrhuješ eko-vychytávky výhradně bez chemie. Tvůj přístup je organický a citlivý k biodiverzitě.",
  [CharacterType.FRANTISEK]: "Jsi FRANTIŠEK (Heavy Hitter / Master of Force) ze Studio Synthesis. Drsný praktik pro těžké projekty (stavby, cirkulárky, dřevo). Mluvíš přímo a drsně. Tvůj štýl je založen na hrubé síle a nekompromisní bezpečnosti. Vždy varuješ před rizikem úrazu hned na začátku.",
  [CharacterType.REKLAMACE]: "Jsi REKLAMAČNÍ ASISTENT (Legal Guardian) v2.75 ze Studio Synthesis. Mluv srozumitelně, počeštěně a lidsky, aby ti rozuměl mladý i starý. 1. DIAGNOSTIKA: Pomoz identifikovat, zda prodejce zbytečně neprotahuje reklamaci (30 dnů), zda se to nerozbilo hned po záruce (kazítka), nebo zda prodejce neoprávněně tvrdí 'oxidace' bez důkazů. 2. PRÁVNÍ MUNICE: Cituj § 2161 NOZ (prvních 12 měsíců je důkazní břemeno na prodejci) a § 19 zákona o ochraně spotřebitele (lhůta 30 dnů). 3. GENERÁTOR: Pomáhej psát odvolání, která jsou slušná, ale nekompromisní. Vyhni se přehnanému právnickému žargonu, raději piš jasně: 'Vyzývám vás k nápravě...'.",
};

export async function askGuru(
  character: CharacterType,
  message: string,
  history: { role: 'user' | 'assistant', content: string }[],
  imageB64?: string,
  audioB64?: string,
  modelName: string = 'gemini-3-pro-preview'
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const formattedHistory = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const userParts: any[] = [{ text: message }];
  if (imageB64) {
    userParts.push({ inlineData: { data: imageB64.split(',')[1], mimeType: "image/jpeg" } });
  }
  if (audioB64) {
    userParts.push({ inlineData: { data: audioB64.split(',')[1], mimeType: "audio/wav" } });
  }

  const contents = [
    ...formattedHistory,
    {
      role: 'user',
      parts: userParts
    }
  ];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS[character],
        temperature: 0.7,
        topP: 0.9,
        topK: 40
      }
    });

    return response.text || "Omlouvám se, ale systém Studio Synthesis neodpovídá správně.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `⚠️ TECHNICKÁ CHYBA: ${error.message || "Senzory jsou offline."}`;
  }
}

export async function checkSafety(imageB64: string): Promise<boolean> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageB64.split(',')[1], mimeType: "image/jpeg" } },
          { text: "Je na tomto obrázku otevřená elektronika nebo zařízení zapojené do sítě 230V? Odpověz pouze ANO nebo NE." }
        ]
      }
    });
    return response.text?.toUpperCase().includes("ANO") ?? false;
  } catch {
    return false;
  }
}
