import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative flex items-center gap-2 group p-1"
            style={{ cursor: 'pointer' }}
        >
            {/* Pill track */}
            <div
                className="relative w-14 h-7 rounded-full transition-all duration-500 border"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                        : 'linear-gradient(135deg, #fed7aa, #fbbf24)',
                    borderColor: isDark ? 'rgba(99,102,241,0.4)' : 'rgba(251,191,36,0.6)',
                    boxShadow: isDark
                        ? '0 0 12px rgba(99,102,241,0.3)'
                        : '0 0 12px rgba(251,191,36,0.5)',
                }}
            >
                {/* Stars (dark mode) */}
                {isDark && (
                    <>
                        <span className="absolute top-[4px] right-[6px] w-[3px] h-[3px] bg-white rounded-full opacity-70 animate-pulse" />
                        <span className="absolute top-[11px] right-[12px] w-[2px] h-[2px] bg-white rounded-full opacity-50 animate-pulse delay-300" />
                        <span className="absolute top-[6px] right-[18px] w-[2px] h-[2px] bg-white rounded-full opacity-60 animate-pulse delay-700" />
                    </>
                )}
                {/* Sun rays (light mode) */}
                {!isDark && (
                    <span className="absolute left-[5px] top-1/2 -translate-y-1/2 text-[11px]">☀️</span>
                )}

                {/* Thumb */}
                <div
                    className="absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md transition-all duration-500 flex items-center justify-center"
                    style={{
                        left: isDark ? '3px' : 'calc(100% - 25px)',
                        background: isDark
                            ? 'linear-gradient(135deg, #c7d2fe, #a5b4fc)'
                            : 'linear-gradient(135deg, #fef3c7, #fde68a)',
                        boxShadow: isDark
                            ? '0 2px 8px rgba(99,102,241,0.6)'
                            : '0 2px 8px rgba(251,191,36,0.8)',
                    }}
                >
                    <span className="text-[10px] leading-none select-none">
                        {isDark ? '🌙' : '🌤️'}
                    </span>
                </div>
            </div>

            <span
                className="hidden sm:inline text-xs font-bold tracking-widest uppercase transition-colors duration-300 opacity-80 group-hover:opacity-100"
                style={{ color: isDark ? '#a5b4fc' : '#d97706' }}
            >
                {isDark ? 'Dark' : 'Light'}
            </span>
        </button>
    );
};

export default ThemeToggle;
