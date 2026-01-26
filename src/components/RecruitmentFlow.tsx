import React from 'react';
import { motion } from 'motion/react';
import { FileText, Users, CheckCircle, Briefcase, ChevronRight } from 'lucide-react';

interface FlowStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
}

interface RecruitmentFlowProps {
  isMobile: boolean;
}

export function RecruitmentFlow({ isMobile }: RecruitmentFlowProps) {
  const steps: FlowStep[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'エントリー',
      description: '応募フォームから必要事項をご記入の上、ご応募ください。書類選考を実施いたします。',
      duration: '1週間以内',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '面接',
      description: '1〜2回の面接を実施します。あなたの経験やスキル、キャリアビジョンについてお聞かせください。',
      duration: '2〜3週間',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: '内定',
      description: '面接結果をご連絡いたします。条件面談を経て、入社日を決定します。',
      duration: '1週間以内',
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: '入社',
      description: 'HACSの一員として新しいキャリアをスタート。充実した研修とサポート体制でバックアップします。',
      duration: '随時',
    },
  ];

  return (
    <div className="py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: isMobile ? 0.4 : 0.8 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-6 tracking-tight">採用フロー</h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          応募から入社までの流れをご説明します
        </p>
      </motion.div>

      {/* Desktop: Horizontal Flow */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-20 left-0 right-0 h-0.5 bg-white/20">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-white origin-left"
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Number Circle */}
                <div className="relative z-10 mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    className="w-40 h-40 mx-auto rounded-full bg-zinc-900 border-2 border-white/20 flex items-center justify-center relative overflow-hidden group hover:border-white/40 transition-colors duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-white mb-2">{step.icon}</div>
                      <div className="text-gray-400 text-sm tracking-wider">STEP {index + 1}</div>
                    </div>
                  </motion.div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl mb-3">{step.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{step.description}</p>
                  <div className="inline-block bg-white/10 text-white text-xs px-3 py-1 tracking-wider uppercase border border-white/20">
                    {step.duration}
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 right-0 transform translate-x-1/2 z-20">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Flow */}
      <div className="lg:hidden space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
            className="relative"
          >
            <div className="flex gap-6">
              {/* Step Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-white/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white">{step.icon}</div>
                </div>
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-white/20 mx-auto mt-4"></div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-8">
                <div className="mb-2 text-gray-500 text-sm tracking-wider uppercase">STEP {index + 1}</div>
                <h4 className="text-xl mb-3">{step.title}</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{step.description}</p>
                <div className="inline-block bg-white/10 text-white text-xs px-3 py-1 tracking-wider uppercase border border-white/20">
                  {step.duration}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-6">
          ご不明な点がございましたら、お気軽にお問い合わせください
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-white border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 group"
        >
          <span>お問い合わせ</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </motion.div>
    </div>
  );
}
