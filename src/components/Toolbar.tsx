import { Download, Monitor, Apple, ListOrdered, Palette } from 'lucide-react';

type Language = 'javascript' | 'typescript' | 'python' | 'swift';

interface ToolbarProps {
  bgGradient: string;
  setBgGradient: (value: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setTitle: (title: string) => void;
  windowStyle: 'mac' | 'windows';
  setWindowStyle: (style: 'mac' | 'windows') => void;
  padding: number;
  setPadding: (value: number) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (value: boolean) => void;
  downloadImage: () => void;
  getFileExtension: (lang: Language) => string;
}

export default function Toolbar(props: ToolbarProps) {
  const {
    bgGradient, setBgGradient,
    language, setLanguage,
    setTitle,
    windowStyle, setWindowStyle,
    padding, setPadding,
    showLineNumbers, setShowLineNumbers,
    downloadImage,
    getFileExtension
  } = props;

  return (
    <div className="mb-10 flex flex-wrap items-center gap-6 bg-slate-900/90 border border-slate-700 p-4 rounded-3xl backdrop-blur-md shadow-2xl">
      
      <div className="flex flex-col gap-1.5 border-r border-slate-700 pr-6">
        <label className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold flex items-center gap-1">
          <Palette size={10} /> Theme
        </label>
        <select 
          value={bgGradient}
          onChange={(e) => setBgGradient(e.target.value)} 
          className="bg-slate-800 text-xs p-2 rounded-lg outline-none border border-slate-700 cursor-pointer hover:bg-slate-700 transition"
        >
          <option value="from-indigo-600 to-purple-700">Royal</option>
          <option value="from-rose-500 to-orange-500">Sunset</option>
          <option value="from-cyan-500 to-blue-600">Hyper</option>
          <option value="from-emerald-500 to-teal-700">Aurora</option>
          <option value="from-gray-700 to-black">Midnight</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 border-r border-slate-700 pr-6">
        <label className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Language</label>
        <select
          value={language}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedLang = e.target.value as 'javascript' | 'typescript' | 'python' | 'swift';
            setLanguage(selectedLang);
            const ext = getFileExtension(selectedLang);
            setTitle(`app.${ext}`);
          }}
          className="bg-slate-800 text-xs p-2 rounded-lg outline-none border border-slate-700 cursor-pointer hover:bg-slate-700 transition"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="swift">Swift</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 border-r border-slate-700 pr-6">
        <label className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Window Style</label>
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          <button onClick={() => setWindowStyle('mac')} className={`p-2 rounded-lg transition ${windowStyle === 'mac' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}><Apple size={16} /></button>
          <button onClick={() => setWindowStyle('windows')} className={`p-2 rounded-lg transition ${windowStyle === 'windows' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}><Monitor size={16} /></button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-r border-slate-700 pr-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Padding ({padding}px)</label>
          <input type="range" min="16" max="128" step="8" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-20 accent-blue-500 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold text-center">Lines</label>
          <button onClick={() => setShowLineNumbers(!showLineNumbers)} className={`p-2 rounded-lg transition ${showLineNumbers ? 'text-blue-400' : 'text-slate-600'}`}><ListOrdered size={18} /></button>
        </div>
      </div>

      <button onClick={downloadImage} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/40 transition-all active:scale-95 flex items-center gap-2">
        <Download size={18} /> Export PNG
      </button>
    </div>
  );
}