import { motion } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-card rounded-lg border shadow-soft">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
            ${theme === value 
              ? 'text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-primary rounded-md"
              initial={false}
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <Icon className="w-4 h-4 relative z-10" />
        </motion.button>
      ))}
    </div>
  );
}