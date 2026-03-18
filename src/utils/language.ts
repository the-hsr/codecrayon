import { languages } from 'prismjs';

export const getLanguage = (language: 'javascript' | 'typescript' | 'python' | 'swift') => {
  switch (language) {
    case 'typescript': return languages.typescript;
    case 'python': return languages.python;
    case 'swift': return languages.swift;
    default: return languages.js;
  }
};

export const getFileExtension = (lang: 'javascript' | 'typescript' | 'python' | 'swift') => {
  switch (lang) {
    case 'typescript': return 'ts';
    case 'python': return 'py';
    case 'swift': return 'swift';
    default: return 'js';
  }
};