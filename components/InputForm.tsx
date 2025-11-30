import React, { useState } from 'react';
import { YEARS, MONTHS, DAYS, TIME_SLOTS, FORTUNE_TYPE_OPTIONS } from '../constants';
import { UserBirthData, Gender, CalendarType, FortuneType } from '../types';

interface InputFormProps {
  onSubmit: (data: UserBirthData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(TIME_SLOTS[0].value);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.SOLAR);
  const [fortuneType, setFortuneType] = useState<FortuneType>(FortuneType.FULL);
  const [customQuestion, setCustomQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (fortuneType === FortuneType.CUSTOM && !customQuestion.trim()) {
      alert("궁금한 점이나 고민을 입력해주세요.");
      return;
    }

    const selectedTimeLabel = TIME_SLOTS.find(t => t.value === hour)?.label || '시간 모름';
    onSubmit({
      name,
      year,
      month,
      day,
      hour: selectedTimeLabel,
      gender,
      calendarType,
      fortuneType,
      customQuestion: fortuneType === FortuneType.CUSTOM ? customQuestion : undefined,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center text-amber-100 mb-2 serif">사주 정보 입력</h2>
      <p className="text-center text-slate-400 text-sm mb-8">
        정확한 운세 풀이를 위해 정보를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 block ml-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요 (예: 김지영)"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Date of Birth Selection */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 block ml-1">년(Year)</label>
            <select 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none appearance-none"
            >
              {YEARS.map(y => <option key={y} value={y}>{y}년</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 block ml-1">월(Month)</label>
            <select 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none appearance-none"
            >
              {MONTHS.map(m => <option key={m} value={m}>{m}월</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 block ml-1">일(Day)</label>
            <select 
              value={day} 
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none appearance-none"
            >
              {DAYS.map(d => <option key={d} value={d}>{d}일</option>)}
            </select>
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 block ml-1">태어난 시간</label>
          <select 
            value={hour} 
            onChange={(e) => setHour(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none appearance-none"
          >
            {TIME_SLOTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        {/* Gender & Calendar Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 block ml-1">음력/양력</label>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-600">
               {[CalendarType.SOLAR, CalendarType.LUNAR].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCalendarType(type)}
                    className={`flex-1 py-2 text-sm rounded-md transition-all ${
                      calendarType === type 
                        ? 'bg-slate-700 text-amber-400 font-bold shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
               ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 block ml-1">성별</label>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-600">
               {[Gender.MALE, Gender.FEMALE].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 text-sm rounded-md transition-all ${
                      gender === g 
                        ? 'bg-slate-700 text-amber-400 font-bold shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {g}
                  </button>
               ))}
            </div>
          </div>
        </div>

        <hr className="border-slate-700 my-2" />

        {/* Fortune Type Selection */}
        <div className="space-y-1">
          <label className="text-xs text-amber-400 font-semibold block ml-1">보고 싶은 운세 선택</label>
          <select 
            value={fortuneType} 
            onChange={(e) => setFortuneType(e.target.value as FortuneType)}
            className="w-full bg-slate-900 border border-amber-500/50 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none appearance-none"
          >
            {FORTUNE_TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Custom Question Input (Visible only if CUSTOM is selected) */}
        {fortuneType === FortuneType.CUSTOM && (
          <div className="space-y-1 animate-fade-in-down">
            <label className="text-xs text-amber-300 block ml-1">무엇이 궁금하신가요?</label>
            <textarea
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="예: 올해 이직을 해도 될까요? / 연애운이 언제쯤 좋아질까요? 구체적으로 적어주세요."
              rows={3}
              className="w-full bg-slate-900 border border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
            isLoading 
              ? 'bg-slate-600 cursor-not-allowed text-slate-400'
              : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white hover:shadow-amber-500/20 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {fortuneType === FortuneType.CUSTOM ? '고민 분석 중...' : '운세 분석 중...'}
            </span>
          ) : (
            '운세 확인하기'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;