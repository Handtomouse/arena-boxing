'use client';

import React, { useState, FormEvent } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from '@/components/ui/Button';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setSubmitStatus('error');
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Input
        label="Name"
        type="text"
        required
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        disabled={isSubmitting}
        autoComplete="name"
      />

      <Input
        label="Email Address"
        type="email"
        required
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        helpText="We'll never share your email"
        disabled={isSubmitting}
        autoComplete="email"
      />

      <Textarea
        label="Message"
        required
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
        maxLength={1000}
        rows={6}
        disabled={isSubmitting}
      />

      {submitStatus === 'success' && (
        <div
          role="alert"
          className="p-4 bg-green-900/30 border-2 border-green-600 text-cream-primary"
        >
          Thank you for your message! We&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          className="p-4 bg-blood-red/30 border-2 border-blood-red text-cream-primary"
        >
          Something went wrong. Please try again.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
