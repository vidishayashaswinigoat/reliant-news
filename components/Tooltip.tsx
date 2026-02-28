import React, { useState, useRef, useEffect } from 'react';
import { metricInfo } from '../data/metricsInfo';

interface TooltipProps {
  metricKey: keyof typeof metricInfo;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ metricKey, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = metricInfo[metricKey];
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  if (!info) return <>{children}</>;

  return (
    <span 
        ref={wrapperRef} 
        className="relative inline-block cursor-pointer border-b border-dotted border-gray-500" 
        onClick={() => setIsOpen(p => !p)}
    >
      {children}
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3 z-20 left-1/2 -translate-x-1/2 text-left normal-case">
          <h4 className="font-bold">{info.title}</h4>
          <p className="mt-1 font-normal">{info.description}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
        </div>
      )}
    </span>
  );
};
