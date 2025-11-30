import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserBirthData, SajuResult, FortuneType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchSajuFortune = async (data: UserBirthData): Promise<SajuResult> => {
  const modelId = "gemini-3-pro-preview";

  let focusInstructions = "";
  let requiredFields: string[] = ["sajuPillars", "luckyItems"];
  let schemaProperties: { [key: string]: Schema } = {
    sajuPillars: {
      type: Type.OBJECT,
      properties: {
        year: { type: Type.STRING, description: "Year Pillar (e.g., 갑진)" },
        month: { type: Type.STRING, description: "Month Pillar" },
        day: { type: Type.STRING, description: "Day Pillar" },
        time: { type: Type.STRING, description: "Time Pillar" },
      },
      required: ["year", "month", "day", "time"],
    },
    luckyItems: {
      type: Type.OBJECT,
      properties: {
        color: { type: Type.STRING, description: "Lucky Color" },
        number: { type: Type.STRING, description: "Lucky Number" },
        direction: { type: Type.STRING, description: "Lucky Direction" },
      },
      required: ["color", "number", "direction"],
    },
  };

  // Configure Prompt and Schema based on FortuneType
  switch (data.fortuneType) {
    case FortuneType.CUSTOM:
      focusInstructions = `
        사용자가 특별히 다음과 같은 고민을 상담했습니다: "${data.customQuestion}".
        사주풀이의 모든 초점을 이 질문에 대한 심도 깊은 답변에 맞추십시오. 
        질문의 의도를 파악하고, 용신과 기신, 대운의 흐름을 근거로 현실적이고 구체적인 조언을 제공하십시오.
        마치 전문 철학관에서 1:1 상담을 하듯이, 공감하면서도 냉철한 분석을 내놓아야 합니다.
        분량은 매우 상세해야 합니다 (최소 500자 이상).
      `;
      schemaProperties.customAnswer = { type: Type.STRING, description: "Detailed expert answer to user's custom question (Min 500 chars)" };
      requiredFields.push("customAnswer");
      break;

    case FortuneType.OVERALL:
      focusInstructions = `평생 총운(초년, 중년, 말년)과 타고난 기질, 성격, 그릇의 크기를 중점적으로 분석하십시오.`;
      schemaProperties.overall = { type: Type.STRING, description: "Detailed Lifetime Overall Fortune" };
      requiredFields.push("overall");
      break;

    case FortuneType.YEARLY:
      focusInstructions = `올해(${new Date().getFullYear()}년)의 신수와 1년 간의 흐름을 집중 분석하십시오. 직장, 재물, 건강, 인간관계 등 올해 일어날 주요 이슈를 다루십시오.`;
      schemaProperties.currentYear = { type: Type.STRING, description: "Detailed Current Year Fortune" };
      requiredFields.push("currentYear");
      break;

    case FortuneType.MONTHLY:
      focusInstructions = `이번 달(${new Date().getMonth() + 1}월)의 상세 운세를 분석하십시오. 날짜별 흐름이나 주의해야 할 주간, 기회 요인을 설명하십시오.`;
      schemaProperties.currentMonth = { type: Type.STRING, description: "Detailed Current Month Fortune" };
      requiredFields.push("currentMonth");
      break;

    case FortuneType.FULL:
    default:
      focusInstructions = `
        인생 총운, 올해 운세, 이달 운세, 재물, 연애, 직장, 학업, 건강 등 모든 분야를 망라하여 종합적으로 분석하십시오.
        각 항목마다 최소 5문장 이상 상세하게 기술하십시오.
      `;
      schemaProperties.overall = { type: Type.STRING };
      schemaProperties.currentYear = { type: Type.STRING };
      schemaProperties.currentMonth = { type: Type.STRING };
      schemaProperties.wealth = { type: Type.STRING };
      schemaProperties.love = { type: Type.STRING };
      schemaProperties.career = { type: Type.STRING };
      schemaProperties.academic = { type: Type.STRING };
      schemaProperties.health = { type: Type.STRING };
      requiredFields.push("overall", "currentYear", "currentMonth", "wealth", "love", "career", "academic", "health");
      break;
  }

  const prompt = `
    당신은 30년 경력의 저명한 명리학자이자 주역 전문가입니다.
    사용자 '${data.name}'님의 정보를 바탕으로 사주팔자를 분석합니다.
    
    [사용자 정보]
    - 이름: ${data.name}
    - 생년월일: ${data.year}년 ${data.month}월 ${data.day}일
    - 태어난 시간: ${data.hour}
    - 성별: ${data.gender}
    - 양력/음력: ${data.calendarType}
    - 요청 유형: ${data.fortuneType}

    [분석 지침]
    1. **호칭**: "**${data.name}님**"이라고 부르십시오.
    2. **전문성**: 음양오행, 십신, 12운성 등의 명리학 용어를 적절히 풀어서 설명하며 전문성을 드러내십시오.
    3. **상세함**: 단답형을 피하고 논리적이고 풍부한 서술을 하십시오.
    4. **초점**: ${focusInstructions}

    결과는 반드시 지정된 JSON 형식으로만 반환하십시오.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: `You are a Korean Saju Master. Address user as ${data.name}님. Provide very detailed responses. Output strictly in JSON.`,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: schemaProperties,
          required: requiredFields,
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("API responded with empty data.");
    }
    
    const parsedResult = JSON.parse(resultText) as SajuResult;
    parsedResult.userName = data.name;
    // Store original question for display if it exists
    if (data.customQuestion) {
      parsedResult.customQuestionOriginal = data.customQuestion;
    }
    
    return parsedResult;

  } catch (error) {
    console.error("Gemini Saju API Error:", error);
    throw error;
  }
};