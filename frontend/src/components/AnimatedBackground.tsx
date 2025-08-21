import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'subtle';
  children: React.ReactNode;
}

export function AnimatedBackground({ variant = 'subtle', children }: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className={`
          absolute inset-0 opacity-30
          ${variant === 'hero' 
            ? 'bg-gradient-hero' 
            : 'bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5'
          }
        `}
        animate={{
          background: variant === 'hero' 
            ? [
                'linear-gradient(135deg, hsl(231 48% 48%) 0%, hsl(340 100% 66%) 100%)',
                'linear-gradient(135deg, hsl(340 100% 66%) 0%, hsl(231 48% 48%) 100%)',
                'linear-gradient(135deg, hsl(231 48% 48%) 0%, hsl(340 100% 66%) 100%)',
              ]
            : [
                'linear-gradient(135deg, hsl(231 48% 48% / 0.1) 0%, hsl(340 100% 66% / 0.1) 100%)',
                'linear-gradient(225deg, hsl(340 100% 66% / 0.1) 0%, hsl(231 48% 48% / 0.1) 100%)',
                'linear-gradient(135deg, hsl(231 48% 48% / 0.1) 0%, hsl(340 100% 66% / 0.1) 100%)',
              ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`
              absolute rounded-full blur-xl
              ${i === 0 ? 'w-64 h-64 bg-primary/20' : 
                i === 1 ? 'w-48 h-48 bg-secondary/20' : 'w-32 h-32 bg-primary/10'}
            `}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}