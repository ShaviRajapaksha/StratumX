'use client';

interface ModeToggleProps {
  value: boolean;
  onChange: (isDark: boolean) => void;
}

export default function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          value
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          !value
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Of Course
      </button>
    </div>
  );
}
