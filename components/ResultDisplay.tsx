import React from 'react';
import { SajuResult } from '../types';

interface ResultDisplayProps {
  result: SajuResult;
  onReset: () => void;
}

const SectionCard: React.FC<{ title: string; content?: string; icon?: React.ReactNode; colorClass?: string; isMain?: boolean }> = ({ 
  title, 
  content, 
  icon,
  colorClass = "bg-slate-800/50 border-slate-700",
  isMain = false
}) => {
  if (!content) return null;
  return (
    <div className={`p-6 md:p-8 rounded-xl border backdrop-blur-sm shadow-lg transition-transform hover:scale-[1.01] ${colorClass} ${isMain ? 'ring-2 ring-amber-500/30' : ''}`}>
      <h3 className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-3 serif border-b pb-2 ${isMain ? 'text-amber-300 border-amber-500/40' : 'text-amber-400 border-amber-500/20'}`}>
        {icon && <span className="text-2xl">{icon}</span>}
        {title}
      </h3>
      <p className="text-slate-200 leading-8 whitespace-pre-line text-base md:text-lg font-light tracking-wide text-justify">
        {content}
      </p>
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Header Pillars */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-amber-500/30 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 mb-2 serif">
          {result.userName ? `${result.userName}님` : '당신'}의 사주팔자(四柱八字)
        </h2>
        <p className="text-slate-400 text-sm mb-8">타고난 명(命)과 흐르는 운(運)의 조화</p>
        
        <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-2xl mx-auto">
          {[
            { label: '시주(時柱)', val: result.sajuPillars.time, desc: '말년/자식운' },
            { label: '일주(日柱)', val: result.sajuPillars.day, desc: '나/배우자운' },
            { label: '월주(月柱)', val: result.sajuPillars.month, desc: '부모/직업운' },
            { label: '년주(年柱)', val: result.sajuPillars.year, desc: '초년/조상운' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 bg-slate-950/60 rounded-xl border border-slate-700 shadow-inner">
              <span className="text-xs text-slate-400 mb-1">{item.label}</span>
              <span className="text-2xl md:text-3xl font-bold text-amber-100 serif mb-1">{item.val}</span>
              <span className="text-[10px] text-slate-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Fortune Sections - Conditionally Rendered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Special Section for Custom Question */}
        {result.customAnswer && (
           <div className="md:col-span-2">
             <div className="mb-4 p-4 rounded-lg bg-amber-900/20 border border-amber-700/50 text-amber-200 italic text-center">
               " {result.customQuestionOriginal} "
             </div>
             <SectionCard 
                 title="고민 상담 결과" 
                 content={result.customAnswer} 
                 icon="🔮"
                 colorClass="bg-indigo-950/60 border-indigo-500/50"
                 isMain={true}
             />
           </div>
        )}

        {/* Standard Sections - Only appear if data exists */}
        {result.overall && (
          <div className="md:col-span-2">
              <SectionCard 
                  title="인생 총운 (평생운)" 
                  content={result.overall} 
                  icon="🌏"
                  colorClass="bg-slate-800/60 border-slate-600"
              />
          </div>
        )}
        
        {result.currentYear && <SectionCard title="올해의 운세" content={result.currentYear} icon="📅" />}
        {result.currentMonth && <SectionCard title="이달의 운세" content={result.currentMonth} icon="🌙" />}
        
        {result.wealth && <SectionCard title="금전/재물운" content={result.wealth} icon="💰" />}
        {result.career && <SectionCard title="직장/사업운" content={result.career} icon="💼" />}
        
        {result.love && <SectionCard title="연애/결혼운" content={result.love} icon="💕" />}
        {result.academic && <SectionCard title="학업/합격운" content={result.academic} icon="🎓" />}
        
        {result.health && (
          <div className="md:col-span-2">
            <SectionCard title="건강 및 컨디션" content={result.health} icon="🌿" />
          </div>
        )}
        
        {/* Lucky Items - Always Displayed */}
        <div className="md:col-span-2 p-6 rounded-xl border bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-lg">
           <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2 serif justify-center">
            🍀 {result.userName ? `${result.userName}님을 위한` : '당신을 위한'} 행운의 처방
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
             <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
               <div className="text-slate-400 text-sm mb-2">행운의 색</div>
               <div className="text-xl font-bold text-slate-100">{result.luckyItems.color}</div>
             </div>
             <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
               <div className="text-slate-400 text-sm mb-2">행운의 숫자</div>
               <div className="text-xl font-bold text-slate-100">{result.luckyItems.number}</div>
             </div>
             <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
               <div className="text-slate-400 text-sm mb-2">행운의 방향</div>
               <div className="text-xl font-bold text-slate-100">{result.luckyItems.direction}</div>
             </div>
           </div>
        </div>
      </div>

      <div className="text-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white text-lg rounded-full font-bold shadow-lg shadow-amber-900/20 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          다른 사주 보러가기
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;