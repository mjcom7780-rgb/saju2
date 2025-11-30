import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { UserBirthData, SajuResult } from './types';
import { fetchSajuFortune } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSajuSubmit = async (data: UserBirthData) => {
    setLoading(true);
    setError(null);
    try {
      const sajuResult = await fetchSajuFortune(data);
      setResult(sajuResult);
    } catch (err) {
      console.error(err);
      setError("운세 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center bg-fixed text-slate-100 flex flex-col items-center py-10 px-4">
      {/* Overlay to darken background image */}
      <div className="fixed inset-0 bg-slate-900/90 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block p-3 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
            <span className="text-3xl">🔮</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400 mb-2 serif tracking-tight">
            운명의 나침반
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base">
            AI가 분석하는 당신의 사주팔자와 인생의 흐름
          </p>
        </header>

        {/* Content Area */}
        <main>
          {error && (
            <div className="max-w-lg mx-auto mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-center animate-pulse">
              {error}
            </div>
          )}

          {!result ? (
            <InputForm onSubmit={handleSajuSubmit} isLoading={loading} />
          ) : (
            <ResultDisplay result={result} onReset={handleReset} />
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-slate-600 text-xs">
          <p>© {new Date().getFullYear()} 운명의 나침반. Powered by Gemini Pro.</p>
          <p className="mt-1">본 운세 결과는 재미로만 봐주시기 바랍니다.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
