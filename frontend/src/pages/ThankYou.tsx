import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { CheckCircle, Sparkles } from 'lucide-react';

export function ThankYou() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => navigate('/'), 1000);
    }, 5000);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [navigate]);

  const confettiColors = resolvedTheme === 'dark' 
    ? ['#6366f1', '#f43f5e', '#8b5cf6', '#06b6d4', '#10b981']
    : ['#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981'];

  return (
    <AnimatedBackground variant="hero">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={200}
          recycle={false}
          colors={confettiColors}
          gravity={0.1}
          className="confetti-container"
        />
      )}

      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Success Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3, 
              type: "spring", 
              stiffness: 200 
            }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, ease: "linear", repeat: Infinity },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary rounded-full"
                  style={{
                    top: `${20 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                    left: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Thank you message */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.span
              className="gradient-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Thank You!
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Thank you for filling the form!
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Thanks for sharing your feedback! We really value your thoughts and appreciate your time!
            </motion.p>
          </motion.div>

          {/* Success details */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8 shadow-soft"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="font-semibold text-foreground">What's Next?</span>
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-muted-foreground text-sm">
              Exciting news ahead! Watch your inbox for updates and important announcements.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <p className="text-sm text-muted-foreground">
              Redirecting to home page in{' '}
              <motion.span
                className="font-bold text-primary"
                key={Math.floor((5000 - Date.now() % 5000) / 1000)}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                5
              </motion.span>{' '}
              seconds...
            </p>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}