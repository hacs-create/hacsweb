import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ChevronDown, Home, Info, Briefcase, Users, Mail, Sparkles, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import chatIconImage from 'figma:asset/8ecf9fade5c5b8425af9dc6b59f1ad13676529bf.png';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  action?: () => void;
  actionLabel?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
  action?: string;
}

type Expression = 'happy' | 'surprised' | 'wide-eyes' | 'thinking' | 'excited' | 'sad' | 'neutral' | 'love';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [expression, setExpression] = useState<Expression>('happy');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const faqs: FAQItem[] = [
    {
      question: 'トップページへ',
      answer: 'トップページにご案内します。',
      keywords: ['トップ', 'ホーム', 'home', 'top', '最初'],
      action: '/',
    },
    {
      question: '会社概要について',
      answer: 'About（会社概要）ページにご案内します。HACSの理念、ビジョン、ミッションについてご覧いただけます。',
      keywords: ['会社', '概要', 'about', '理念', 'ビジョン', '企業'],
      action: '/about',
    },
    {
      question: 'サービス内容について',
      answer: 'サービスページにご案内します。モバイル通信事業を中心とした各種サービスをご確認いただけます。',
      keywords: ['サービス', 'service', '事業', '内容', 'モバイル', '通信'],
      action: '/services',
    },
    {
      question: '採用情報について',
      answer: '採用ページにご案内します。募集要項や応募方法、採用フローをご確認いただけます。',
      keywords: ['採用', '求人', '募集', 'recruit', '入社', '応募', '転職'],
      action: '/recruit',
    },
    {
      question: 'メンバー紹介',
      answer: 'メンバーページにご案内します。HACSのチームメンバーをご紹介しています。',
      keywords: ['メンバー', 'member', 'チーム', 'スタッフ', '社員'],
      action: '/member',
    },
    {
      question: 'お問い合わせ',
      answer: 'お問い合わせページにご案内します。メール（info@h-a-c.com）またはフォームからご連絡いただけます。',
      keywords: ['問い合わせ', '連絡', 'メール', 'contact', '質問', 'コンタクト'],
      action: '/contact',
    },
    {
      question: '会社の所在地は？',
      answer: '〒485-0036 愛知県小牧市下小針天神2丁目2 ESPRESSO小牧2C にございます。お気軽にお越しください。',
      keywords: ['所在地', '場所', '住所', 'アクセス', '地図', 'どこ'],
    },
    {
      question: '営業時間について',
      answer: '営業時間は平日9:00〜18:00です。土日祝日は休業となっております。お問い合わせは24時間受け付けておりますが、回答は営業時間内となります。',
      keywords: ['営業時間', '時間', '営業日', '休み', '休業日'],
    },
  ];

  const quickReplies = [
    'サービス内容について',
    '会社概要について',
    '採用情報について',
    'メンバー紹介',
    'お問い合わせ',
  ];

  // 自動表情変化
  useEffect(() => {
    if (!isOpen) {
      const expressionInterval = setInterval(() => {
        const expressions: Expression[] = ['happy', 'neutral', 'excited'];
        setExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      }, 4000);

      return () => clearInterval(expressionInterval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setExpression('excited');
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'こんにちは！HACSのナビゲーターです✨\n\nどのページをご案内しましょうか？\n下のボタンからお選びいただくか、直接ご質問を入力してください。',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findAnswer = (question: string): { answer: string; action?: string } => {
    const lowerQuestion = question.toLowerCase();
    
    for (const faq of faqs) {
      if (faq.keywords.some(keyword => lowerQuestion.includes(keyword.toLowerCase()))) {
        return { answer: faq.answer, action: faq.action };
      }
    }
    
    return {
      answer: 'お問い合わせいただきありがとうございます。\n\n以下のページからお探しいただけます：\n• トップページ\n• 会社概要\n• サービス\n• 採用情報\n• メンバー紹介\n• お問い合わせ\n\nまたは、お問い合わせフォーム（info@h-a-c.com）からご連絡ください。',
    };
  };

  const handleNavigation = (path: string) => {
    setExpression('excited');
    navigate(path);
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    setExpression('surprised');
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowQuickReplies(false);

    setTimeout(() => {
      setExpression('thinking');
    }, 300);

    setTimeout(() => {
      const { answer, action } = findAnswer(text);
      
      if (action) {
        setExpression('excited');
      } else if (answer.includes('お問い合わせいただき')) {
        setExpression('sad');
      } else {
        setExpression('happy');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isBot: true,
        timestamp: new Date(),
        action: action ? () => handleNavigation(action) : undefined,
        actionLabel: action ? 'ページへ移動' : undefined,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1200);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getPageIcon = () => {
    switch (location.pathname) {
      case '/':
        return <Home className="w-3 h-3" />;
      case '/about':
        return <Info className="w-3 h-3" />;
      case '/services':
        return <Briefcase className="w-3 h-3" />;
      case '/recruit':
      case '/member':
        return <Users className="w-3 h-3" />;
      case '/contact':
        return <Mail className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  // ロボット表情コンポーネント
  const RobotFace = ({ expr, size = 'large' }: { expr: Expression; size?: 'large' | 'small' }) => {
    const scale = size === 'large' ? 1 : 0.5;
    const width = size === 'large' ? 70 : 35;
    const height = size === 'large' ? 80 : 40;

    const renderExpression = () => {
      switch (expr) {
        case 'happy':
          return (
            <>
              <motion.g>
                <path d="M 20 30 Q 22 27 24 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 46 30 Q 48 27 50 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
              </motion.g>
              <motion.path
                d="M 25 50 Q 35 58 45 50"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </>
          );

        case 'surprised':
          return (
            <>
              <motion.circle
                cx="22"
                cy="30"
                r="6"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.circle
                cx="48"
                cy="30"
                r="6"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.circle
                cx="35"
                cy="52"
                r="5"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </>
          );

        case 'wide-eyes':
          return (
            <>
              <motion.g
                initial={{ scale: 0.5 }}
                animate={{ scale: 1.3 }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
              >
                <circle cx="22" cy="30" r="7" fill="white" />
                <circle cx="48" cy="30" r="7" fill="white" />
                <circle cx="22" cy="30" r="3" fill="black" />
                <circle cx="48" cy="30" r="3" fill="black" />
              </motion.g>
              <line x1="28" y1="52" x2="42" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </>
          );

        case 'thinking':
          return (
            <>
              <circle cx="22" cy="27" r="4" fill="white" />
              <circle cx="48" cy="27" r="4" fill="white" />
              <motion.g
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path
                  d="M 32 45 Q 35 42 35 48"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="35" cy="54" r="1.5" fill="white" />
              </motion.g>
            </>
          );

        case 'excited':
          return (
            <>
              <motion.g
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '22px 30px' }}
              >
                <path
                  d="M 22 24 L 23 28 L 27 28 L 24 31 L 25 35 L 22 32 L 19 35 L 20 31 L 17 28 L 21 28 Z"
                  fill="white"
                />
              </motion.g>
              <motion.g
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '48px 30px' }}
              >
                <path
                  d="M 48 24 L 49 28 L 53 28 L 50 31 L 51 35 L 48 32 L 45 35 L 46 31 L 43 28 L 47 28 Z"
                  fill="white"
                />
              </motion.g>
              <motion.path
                d="M 22 48 Q 35 60 48 48"
                stroke="white"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                animate={{ d: ['M 22 48 Q 35 60 48 48', 'M 22 48 Q 35 62 48 48'] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </>
          );

        case 'sad':
          return (
            <>
              <path d="M 17 32 Q 22 28 27 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 43 32 Q 48 28 53 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
              <motion.path
                d="M 25 56 Q 35 50 45 56"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <motion.circle
                cx="27"
                cy="38"
                r="2"
                fill="white"
                animate={{ cy: [38, 48], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </>
          );

        case 'love':
          return (
            <>
              <motion.g
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path
                  d="M 22 30 C 22 26 18 26 18 28 C 18 26 14 26 14 30 C 14 34 22 38 22 38 C 22 38 30 34 30 30 C 30 26 26 26 26 28 C 26 26 22 26 22 30 Z"
                  fill="white"
                  transform="translate(-4, -4) scale(0.4)"
                />
                <path
                  d="M 48 30 C 48 26 44 26 44 28 C 44 26 40 26 40 30 C 40 34 48 38 48 38 C 48 38 56 34 56 30 C 56 26 52 26 52 28 C 52 26 48 26 48 30 Z"
                  fill="white"
                  transform="translate(-4, -4) scale(0.4)"
                />
              </motion.g>
              <path d="M 25 50 Q 35 58 45 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          );

        case 'neutral':
        default:
          return (
            <>
              <circle cx="22" cy="30" r="4" fill="white" />
              <circle cx="48" cy="30" r="4" fill="white" />
              <line x1="28" y1="52" x2="42" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </>
          );
      }
    };

    return (
      <svg width={width} height={height} viewBox="0 0 70 80" style={{ transform: `scale(${scale})` }}>
        <rect x="5" y="10" width="60" height="60" rx="8" fill="#000000" />
        {renderExpression()}
      </svg>
    );
  };

  // ロボットキャラクター全体
  const RobotCharacter = ({ expr, size = 'large' }: { expr: Expression; size?: 'large' | 'small' }) => {
    if (size === 'small') {
      return (
        <div className="relative w-12 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-[40%] border-2 border-white shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-[40%]" />
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <RobotFace expr={expr} size="small" />
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-24 h-28">
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-0.5 h-6 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-gray-400 rounded-full border border-white shadow-lg"
          />
        </motion.div>

        <div className="absolute inset-0 top-1 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-[45%] border-2 border-white shadow-2xl overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent rounded-[45%]" />
          
          <div className="absolute top-2 left-1/2 -translate-x-1/2 scale-75">
            <RobotFace expr={expr} size="large" />
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-black text-[0.6rem] tracking-wider">
            HACS
          </div>
        </div>

        <motion.div
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 top-11 w-2 h-7 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full border border-white shadow-lg"
          style={{ transformOrigin: 'top center' }}
        />
        <motion.div
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-11 w-2 h-7 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full border border-white shadow-lg"
          style={{ transformOrigin: 'top center' }}
        />

        <motion.div
          animate={{ 
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-14 h-3 bg-black/30 rounded-[50%] blur-sm"
        />
      </div>
    );
  };

  return (
    <>
      {/* Fixed Icon Button */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-[rgb(0,0,0)] rounded-full shadow-2xl border-2 border-black flex items-center justify-center cursor-pointer hover:scale-110 transition-transform font-[OFL_Sorts_Mill_Goudy_TT]"
          onClick={() => {
            setIsOpen(true);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ImageWithFallback 
            src={chatIconImage} 
            alt="Chat" 
            className="w-10 h-10 object-contain"
          />

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>

          {/* Tooltip */}
          {isHovered && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
              <div className="bg-black text-white px-4 py-2 rounded-lg text-sm shadow-xl border border-white/20">
                ご案内します
              </div>
            </div>
          )}
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[9999] w-[400px] max-w-[calc(100vw-3rem)] h-[650px] max-h-[calc(100vh-3rem)] bg-zinc-900 border border-white/20 shadow-2xl flex flex-col overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)' }}
          >
            <div className="bg-gradient-to-r from-black to-zinc-900 border-b border-white/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RobotCharacter expr={expression} size="small" />
                <div>
                  <h3 className="text-white flex items-center gap-2">
                    HACSナビゲーター
                    {getPageIcon()}
                  </h3>
                  <p className="text-gray-400 text-xs">サイトをご案内します</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setExpression('sad');
                  setTimeout(() => setIsOpen(false), 300);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="space-y-2">
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-zinc-800 text-white border border-white/10'
                          : 'bg-white text-black'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-gray-600'}`}>
                        {message.timestamp.toLocaleTimeString('ja-JP', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    
                    {message.action && message.actionLabel && (
                      <motion.button
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={message.action}
                        onMouseEnter={() => setExpression('excited')}
                        className="w-full bg-white text-black px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-black/10"
                      >
                        {message.actionLabel}
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}

              {showQuickReplies && messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    おすすめのページ：
                  </p>
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      onMouseEnter={() => setExpression('happy')}
                      className="block w-full text-left p-3 bg-zinc-800 border border-white/10 text-white text-sm hover:border-white/30 hover:bg-zinc-700 transition-all duration-300 rounded group"
                    >
                      <span className="flex items-center justify-between">
                        {reply}
                        <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="bg-black border-t border-white/20 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setExpression('wide-eyes')}
                  onBlur={() => setExpression('happy')}
                  placeholder="質問を入力してください..."
                  className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded border border-white/20 focus:outline-none focus:border-white/40 text-sm placeholder:text-gray-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  onMouseEnter={() => setExpression('excited')}
                  onMouseLeave={() => setExpression('happy')}
                  className="bg-white text-black p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
