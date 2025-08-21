import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingInputProps {
  label: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function FloatingInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  required = false 
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`
        input-floating
        ${error ? 'border-destructive' : isFocused ? 'border-primary' : 'border-border'}
        ${isFocused ? 'shadow-glow' : 'shadow-soft'}
      `}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="peer"
          placeholder=" "
          required={required}
        />
        <motion.label
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none
            ${hasValue || isFocused 
              ? 'top-1 text-xs' 
              : 'top-4 text-base'
            }
            ${error 
              ? 'text-destructive' 
              : isFocused 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }
          `}
          animate={{
            scale: hasValue || isFocused ? 0.85 : 1,
            y: hasValue || isFocused ? -8 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}