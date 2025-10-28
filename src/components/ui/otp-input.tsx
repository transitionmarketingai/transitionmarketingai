'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { Input } from './input';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  value?: string;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export function OTPInput({ 
  length = 6, 
  onComplete, 
  value = '', 
  onChange,
  disabled = false,
  error = false 
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length).concat(Array(length - value.length).fill('')));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Sync with external value prop
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newOtp = [...valueArray, ...Array(length - valueArray.length).fill('')];
      setOtp(newOtp);
      
      // Update focus if all fields filled
      if (valueArray.length === length && onComplete) {
        onComplete(value);
      }
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, val: string) => {
    // Only allow digits
    if (val && !/^\d$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Move to next input if value entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all fields filled
    if (newOtp.every(digit => digit !== '') && otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle delete
    if (e.key === 'Delete' && otp[index]) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      const otpString = newOtp.join('');
      onChange?.(otpString);
      
      // Focus last filled input or next empty
      const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
      
      if (otpString.length === length && onComplete) {
        onComplete(otpString);
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-semibold
            ${error ? 'border-red-500 bg-red-50' : 'border-slate-300'}
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          `}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}

