import { FortuneType } from "./types";

// Generate Years (1920 to Current Year)
const currentYear = new Date().getFullYear();
export const YEARS = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i);

// Generate Months (1-12)
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

// Generate Days (1-31)
export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Traditional Korean Time Slots (12 Zodiac Hours)
export const TIME_SLOTS = [
  { value: 'unknown', label: '시간 모름' },
  { value: '23:30-01:29', label: '23:30 ~ 01:29 (자시)' },
  { value: '01:30-03:29', label: '01:30 ~ 03:29 (축시)' },
  { value: '03:30-05:29', label: '03:30 ~ 05:29 (인시)' },
  { value: '05:30-07:29', label: '05:30 ~ 07:29 (묘시)' },
  { value: '07:30-09:29', label: '07:30 ~ 09:29 (진시)' },
  { value: '09:30-11:29', label: '09:30 ~ 11:29 (사시)' },
  { value: '11:30-13:29', label: '11:30 ~ 13:29 (오시)' },
  { value: '13:30-15:29', label: '13:30 ~ 15:29 (미시)' },
  { value: '15:30-17:29', label: '15:30 ~ 17:29 (신시)' },
  { value: '17:30-19:29', label: '17:30 ~ 19:29 (유시)' },
  { value: '19:30-21:29', label: '19:30 ~ 21:29 (술시)' },
  { value: '21:30-23:29', label: '21:30 ~ 23:29 (해시)' },
];

export const FORTUNE_TYPE_OPTIONS = [
  { value: FortuneType.FULL, label: '전체 종합 운세 (모든 운세 보기)' },
  { value: FortuneType.OVERALL, label: '평생 총운 (나의 타고난 그릇)' },
  { value: FortuneType.YEARLY, label: '올해의 운세 (1년 신수)' },
  { value: FortuneType.MONTHLY, label: '이달의 운세 (월별 흐름)' },
  { value: FortuneType.CUSTOM, label: '기타 (직접 질문/고민 상담)' },
];