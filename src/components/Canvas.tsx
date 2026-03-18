import Editor from 'react-simple-code-editor';
import { highlight } from 'prismjs';
import { Minus, Square, X, GripVertical } from 'lucide-react';
import type { Ref, MouseEventHandler } from 'react';

type CanvasProps = {
  elementRef?: Ref<HTMLDivElement>;
  padding: number;
  bgGradient: string;
  windowWidth: number;
  windowStyle?: 'mac' | 'windows';
  title: string;
  setTitle: (t: string) => void;
  code: string;
  setCode: (c: string) => void;
  showLineNumbers?: boolean;
  handleMouseDown?: MouseEventHandler<HTMLDivElement>;
  getLanguage: () => Record<string, unknown>;
  language: string;
};

export default function Canvas(props: CanvasProps) {
  const {
    elementRef,
    padding,
    bgGradient,
    windowWidth,
    windowStyle,
    title,
    setTitle,
    code,
    setCode,
    showLineNumbers,
    handleMouseDown,
    getLanguage,
    language
  } = props;

  return (
    <div 
      ref={elementRef}
      style={{ padding: `${padding}px` }}
      className={`bg-gradient-to-br ${bgGradient} transition-all duration-500 flex items-center justify-center`}
    >
      <div 
        style={{ width: `${windowWidth}px` }}
        className={`relative group bg-[#0d1117] shadow-[0_50px_100px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden transition-all duration-300 ${windowStyle === 'mac' ? 'rounded-2xl' : 'rounded-none'}`}
      >
        <div className={`flex items-center px-5 py-4 bg-white/5 border-b border-white/5 ${windowStyle === 'windows' ? 'flex-row-reverse' : ''}`}>
          {windowStyle === 'mac' ? (
            <div className="flex gap-2.5 w-24">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
          ) : (
            <div className="flex gap-6 w-24 justify-end text-slate-400 opacity-60">
              <Minus size={16} /> <Square size={12} /> <X size={16} />
            </div>
          )}

          <input 
            className="bg-transparent text-center text-[13px] text-slate-400 font-mono outline-none flex-1 focus:text-white transition-colors"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
          <div className="w-24" />
        </div>

        <div className="flex p-5 min-h-[120px]">
          {showLineNumbers && (
            <div className="pr-5 text-right select-none opacity-20 font-mono text-[14px] leading-relaxed border-r border-white/5 mr-5 min-w-[2.5rem]">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          
          <div className="flex-1 overflow-hidden">
            <Editor
              value={code}
              onValueChange={c => setCode(c)}
              highlight={c => highlight(c, getLanguage(), language)}
              padding={0}
              className="font-mono text-[14px] outline-none leading-relaxed"
              style={{ fontFamily: '"Fira Code", monospace' }}
            />
          </div>
        </div>

        <div 
          onMouseDown={handleMouseDown}
          className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-blue-500/30 flex items-center justify-center transition-colors group-hover:bg-white/5"
        >
          <GripVertical size={12} className="text-white/10 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}