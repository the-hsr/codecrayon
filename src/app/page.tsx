"use client";

import React, { useState, useRef } from 'react';
import Toolbar from '@/components/Toolbar';
import Canvas from '@/components/Canvas';
import { useResize } from '@/hooks/useResize';
import { downloadImage } from '@/utils/exportImage';
import { getLanguage, getFileExtension } from '@/utils/language';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-swift';
import 'prismjs/themes/prism-tomorrow.css'; 

export default function CodeCrayon() {
  const [code, setCode] = useState(`const debounce = (fn, delay = 300) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const onResize = debounce(() => {
  console.log("Resized");
}, 250);

window.addEventListener("resize", onResize);`);
  const [title, setTitle] = useState("app.js");
  const [windowStyle, setWindowStyle] = useState<'mac' | 'windows'>('mac');
  const [padding, setPadding] = useState(64);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [bgGradient, setBgGradient] = useState("from-indigo-600 to-purple-700");
  const [language, setLanguage] = useState<'javascript' | 'typescript' | 'python' | 'swift'>('javascript');

  const { windowWidth, handleMouseDown } = useResize(600);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!elementRef.current) return;
    await downloadImage(elementRef.current, title);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-10 font-sans">

      <div className="relative mb-10 flex flex-wrap items-center gap-6 bg-slate-900/90 border border-slate-700 p-4 rounded-3xl backdrop-blur-md shadow-2xl">
  
  {/* CENTER TITLE */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="text-xs font-bold tracking-widest text-white/60">
      CODECRAYON
    </span>
  </div>

  {/* existing toolbar content (unchanged) */}
  
</div>

      <Toolbar
        bgGradient={bgGradient}
        setBgGradient={setBgGradient}
        language={language}
        setLanguage={setLanguage}
        setTitle={setTitle}
        windowStyle={windowStyle}
        setWindowStyle={setWindowStyle}
        padding={padding}
        setPadding={setPadding}
        showLineNumbers={showLineNumbers}
        setShowLineNumbers={setShowLineNumbers}
        downloadImage={handleDownload}
        getFileExtension={getFileExtension}
      />

      <Canvas
        elementRef={elementRef}
        padding={padding}
        bgGradient={bgGradient}
        windowWidth={windowWidth}
        windowStyle={windowStyle}
        title={title}
        setTitle={setTitle}
        code={code}
        setCode={setCode}
        showLineNumbers={showLineNumbers}
        handleMouseDown={handleMouseDown}
        getLanguage={() => getLanguage(language) as unknown as Record<string, unknown>}
        language={language}
      />

      {/* Footer */}
      <div className="w-full flex items-center justify-center mt-8 px-10 text-xs text-slate-500 gap-6">
  <a href="https://www.linkedin.com/in/himanshu---singh/" target="_blank">
    LinkedIn
  </a>

  <span className="text-slate-500">|</span>

  <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black">
    Customizable Code Exporter
  </p>

  <span className="text-slate-500">|</span>

  <a href="http://github.com/the-hsr/" target="_blank">
    GitHub
  </a>
</div>
    </div>
  );
}