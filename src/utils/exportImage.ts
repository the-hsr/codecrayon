import { toPng } from 'html-to-image';

export const downloadImage = async (
  element: HTMLDivElement,
  title: string
) => {
  const dataUrl = await toPng(element, { pixelRatio: 3, cacheBust: true });

  const link = document.createElement('a');
  link.download = `${title.split('.')[0]}.png`;
  link.href = dataUrl;
  link.click();
};