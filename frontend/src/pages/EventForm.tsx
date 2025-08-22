import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingInput } from '@/components/FloatingInput';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send } from 'lucide-react';

interface FormData {
  name: string;
  number: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  number?: string;
  email?: string;
  message?: string;
}

export function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    number: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.number.replace(/\D/g, ''))) {
      newErrors.number = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the formData directly
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/thank-you');
      } else {
        alert(result.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatedBackground>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-card"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <ThemeToggle />
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-strong">
            <CardHeader className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CardTitle className="text-3xl font-bold gradient-text mb-2">
                  Event Registration
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill in your details to join this amazing event
                </p>
              </motion.div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="grid gap-6"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {/* Full Name */}
                  <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                    <FloatingInput
                      label="Full Name"
                      value={formData.name}
                      onChange={(value) => updateField('name', value)}
                      error={errors.name}
                      required
                    />
                  </motion.div>

                  {/* Mobile Number */}
                  <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                    <FloatingInput
                      label="Mobile Number"
                      type="tel"
                      value={formData.number}
                      onChange={(value) => updateField('number', value)}
                      error={errors.number}
                      required
                    />
                  </motion.div>

                  {/* Email Address */}
                  <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => updateField('email', value)}
                      error={errors.email}
                      required
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                    <FloatingInput
                      label="Message"
                      value={formData.message}
                      onChange={(value) => updateField('message', value)}
                      error={errors.message}
                      required
                    />
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-hero text-lg py-6 relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-5 h-5" />
                        Submit Registration
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
