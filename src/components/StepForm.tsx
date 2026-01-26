import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Check, ArrowRight, ArrowLeft, Send } from 'lucide-react';

interface FormData {
  purpose: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function StepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-12 lg:mb-16">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm tracking-wide text-gray-400">
            STEP {currentStep} / {totalSteps}
          </span>
          <span className="text-sm text-gray-400">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        
        {/* Step Dots */}
        <div className="flex justify-between mt-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                  index + 1 < currentStep
                    ? 'bg-white border-white'
                    : index + 1 === currentStep
                    ? 'border-white bg-black'
                    : 'border-white/20 bg-black'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index + 1 < currentStep && <Check className="w-4 h-4 text-black" />}
                {index + 1 === currentStep && <span className="text-white text-sm">{index + 1}</span>}
                {index + 1 > currentStep && <span className="text-white/30 text-sm">{index + 1}</span>}
              </motion.div>
              <span className="text-xs text-gray-400 mt-2 hidden sm:block">
                {index === 0 && '目的選択'}
                {index === 1 && '基本情報'}
                {index === 2 && '詳細入力'}
                {index === 3 && '確認'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Purpose Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-6">
                お問い合わせ内容をお選びください
              </h3>
              
              <RadioGroup value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                {[
                  { value: 'mobile', label: 'モバイル通信サービスについて' },
                  { value: 'event', label: 'イベント企画・運営について' },
                  { value: 'recruit', label: '採用・求人について' },
                  { value: 'other', label: 'その他のお問い合わせ' }
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-3 p-4 lg:p-6 border border-white/10 bg-white/5 
                               hover:bg-white/10 transition-colors cursor-pointer rounded-sm"
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="border-white/40" />
                    <Label htmlFor={option.value} className="text-white cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </motion.div>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-6">
                基本情報をご入力ください
              </h3>

              <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-400">
                  お名前 <span className="text-white">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="山田 太郎"
                  className="border-white/20 bg-white/5 text-white py-6"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-400">
                  メールアドレス <span className="text-white">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="example@company.com"
                  className="border-white/20 bg-white/5 text-white py-6"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-400">
                  電話番号
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="090-1234-5678"
                  className="border-white/20 bg-white/5 text-white py-6"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-6">
                詳細をご入力ください
              </h3>

              <div className="space-y-3">
                <Label htmlFor="company" className="text-gray-400">
                  会社名・団体名
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="株式会社〇〇"
                  className="border-white/20 bg-white/5 text-white py-6"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-gray-400">
                  お問い合わせ内容 <span className="text-white">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  placeholder="お問い合わせ内容をご記入ください"
                  className="border-white/20 bg-white/5 text-white min-h-[180px]"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-8">
                入力内容をご確認ください
              </h3>

              <div className="space-y-6 p-6 lg:p-8 border border-white/10 bg-white/5 rounded-sm">
                {[
                  { label: 'お問い合わせ内容', value: formData.purpose },
                  { label: 'お名前', value: formData.name },
                  { label: 'メールアドレス', value: formData.email },
                  { label: '電話番号', value: formData.phone },
                  { label: '会社名・団体名', value: formData.company },
                  { label: 'お問い合わせ詳細', value: formData.message }
                ].map((item, idx) => (
                  item.value && (
                    <div key={idx} className="pb-4 border-b border-white/10 last:border-0">
                      <div className="text-sm text-gray-400 mb-2">{item.label}</div>
                      <div className="text-white">{item.value}</div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 lg:mt-16">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !formData.purpose) ||
                (currentStep === 2 && (!formData.name || !formData.email))
              }
              className="bg-white text-black hover:bg-gray-200"
            >
              次へ
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200"
            >
              送信
              <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
