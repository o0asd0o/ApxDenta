import { RiLoader2Fill } from '@remixicon/react';
import { cn } from '@repo/ui/lib/utils';
import React from 'react';

type Props = {
  className?: string;
};

export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <RiLoader2Fill
        className="size-[30px] shrink-0 animate-spin text-gray-600 dark:text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
};

export const LoaderV2: React.FC<{ components?: string[] }> = ({
  components = ['buttons', 'forms', 'switches', 'cards', 'buttons'],
}) => {
  return (
    <div
      className="loader-wrapper"
      style={
        {
          '--bg-color': 'white',
        } as React.CSSProperties & {
          '--bg-color': string;
        }
      }
    >
      <div className="text-gray-500 font-medium text-2xl h-10 px-2.5 py-2.5 flex rounded-lg box-content">
        <p className="font-['Poppins']">loading</p>
        <div className="overflow-hidden relative ml-1.5">
          <div className="words-container">
            {components.map((component, index) => (
              <span key={`${component}`} className="word">
                {component}
              </span>
            ))}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: `linear-gradient(
                var(--bg-primary) 10%,
                transparent 30%,
                transparent 70%,
                var(--bg-color) 90%
              )`,
            }}
          />
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .loader-wrapper .words-container {
          animation: spin-words 4s infinite;
        }
        
        .loader-wrapper .word {
          display: block;
          height: 100%;
          padding-left: 6px;
          color: var(--primary);
        }
        
        @keyframes spin-words {
          10% { transform: translateY(-102%); }
          25% { transform: translateY(-100%); }
          35% { transform: translateY(-202%); }
          50% { transform: translateY(-200%); }
          60% { transform: translateY(-302%); }
          75% { transform: translateY(-300%); }
          85% { transform: translateY(-402%); }
          100% { transform: translateY(-400%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
