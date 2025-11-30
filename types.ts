export enum Gender {
  MALE = '남성',
  FEMALE = '여성',
}

export enum CalendarType {
  SOLAR = '양력',
  LUNAR = '음력',
  LEAP_LUNAR = '윤달',
}

export enum FortuneType {
  FULL = 'FULL',         // 전체 종합 운세
  OVERALL = 'OVERALL',   // 평생 총운
  YEARLY = 'YEARLY',     // 올해 운세
  MONTHLY = 'MONTHLY',   // 이달 운세
  CUSTOM = 'CUSTOM',     // 기타 (직접 질문)
}

export interface UserBirthData {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: string; // Format like "00:30~02:29 (축시)"
  gender: Gender;
  calendarType: CalendarType;
  fortuneType: FortuneType;
  customQuestion?: string;
}

export interface SajuResult {
  userName?: string;
  sajuPillars: {
    year: string;
    month: string;
    day: string;
    time: string;
  };
  // Optional fields based on selected FortuneType
  overall?: string;      // 평생 총운
  currentYear?: string;  // 올해 운세
  currentMonth?: string; // 이달의 운세
  wealth?: string;       // 재물운
  love?: string;         // 연애/결혼운
  career?: string;       // 직장/사업운
  academic?: string;     // 학업/시험운
  health?: string;       // 건강운
  
  // New field for custom question answer
  customAnswer?: string; 
  customQuestionOriginal?: string;

  luckyItems: {
    color: string;
    number: string;
    direction: string;
  };
}