import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingInput } from '@/components/FloatingInput';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Send } from 'lucide-react';

interface FormData {
  fullName: string;
  mobileNumber: string;
  emailId: string;
  address: string;
  referredBy: string;
  hasInterest: boolean;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  emailId?: string;
  address?: string;
}

export function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    address: '',
    referredBy: '',
    hasInterest: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate form fields
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    // Send form data to your Python backend
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        emailId: formData.emailId,
        address: formData.address,
        referredBy: formData.referredBy,
        hasInterest: formData.hasInterest,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Success → redirect to ThankYou page
      navigate("/thank-you");
    } else {
      // Backend returned an error
      alert(result.error || "Failed to submit. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
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
                {/* Form Fields */}
                <motion.div
                  className="grid gap-6"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <FloatingInput
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(value) => updateField('fullName', value)}
                      error={errors.fullName}
                      required
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <FloatingInput
                      label="Mobile Number"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(value) => updateField('mobileNumber', value)}
                      error={errors.mobileNumber}
                      required
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      value={formData.emailId}
                      onChange={(value) => updateField('emailId', value)}
                      error={errors.emailId}
                      required
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <FloatingInput
                      label="Address"
                      value={formData.address}
                      onChange={(value) => updateField('address', value)}
                      error={errors.address}
                      required
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <FloatingInput
                      label="Referred By (Optional)"
                      value={formData.referredBy}
                      onChange={(value) => updateField('referredBy', value)}
                    />
                  </motion.div>

                  {/* Interest Checkbox */}
                  <motion.div
                    className="flex items-center space-x-3 p-4 bg-card/50 rounded-lg border border-border/50"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Checkbox
                      id="interest"
                      checked={formData.hasInterest}
                      onCheckedChange={(checked) => updateField('hasInterest', !!checked)}
                    />
                    <label
                      htmlFor="interest"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I am interested in future events and updates
                    </label>
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