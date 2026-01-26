import image_33a31b9e5b96f5bdacb1cb079cd4dcb1410d1202 from 'figma:asset/33a31b9e5b96f5bdacb1cb079cd4dcb1410d1202.png';
import { SharedFooter } from './SharedFooter';
import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { SEOHelmet, pageSEO } from './SEOHelmet';

import teamHeroImage from 'figma:asset/8dbc096aba772a68f7a0626f210c2b43359833f1.png';
import satoImage from 'figma:asset/dc6ad8b21a531ce9283077a11ba4ea74b6b11aad.png';
import suzukiImage from 'figma:asset/f4664096710a3ff9ca293ce0c41ceef7fad50803.png';
import philosophyImage from 'figma:asset/5133147983de084cccb678652854b4f9ebffd4f9.png';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

const hoshinoKazukiImage = image_33a31b9e5b96f5bdacb1cb079cd4dcb1410d1202;

export default function MemberPage() {
  const isMobile = useIsMobile();
  
  const members = [
    {
      name: '星野 一輝',
      role: '業務執行役員',
      image: hoshinoKazukiImage,
      bio: 'HACSの業務執行を担当し、代表社員を補佐しながら全社的な事業運営と組織マネジメントを推進。戦略的な意思決定と各部門の統括を通じて、企業価値の向上に貢献しています。'
    },
    {
      name: '星野 仁',
      role: 'モバイル通信事業 主任',
      image: satoImage,
      bio: '通信業界での豊富な経験を基に、法人・個人のお客様に最適な通信ソリューションを提案しています。'
    },
    {
      name: '鈴木 あいる',
      role: '採用担当',
      image: suzukiImage,
      bio: '採用担当として、採用戦略の立案から面談まで幅広く関わっています。HACSの価値観に共感し、共に挑戦してくれる仲間と出会えることを楽しみにしています。'
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEOHelmet {...pageSEO.member} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={teamHeroImage}
            alt="チームワークスペース"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 px-6 lg:px-20 max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-white mb-8 leading-[0.85] tracking-tighter" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              Member
            </h1>
            <div className="h-px w-32 bg-white/50 mb-8" />
            <p className="text-white/90 text-lg lg:text-2xl max-w-3xl leading-relaxed">
              情熱と専門性を持った<br className="sm:hidden" />プロフェッショナルたち
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Philosophy Section - Asymmetric Layout */}
      <section className="relative bg-black min-h-screen flex items-center py-16 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <ImageWithFallback
                  src={philosophyImage}
                  alt="チームワーク"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {!isMobile && <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-7"
            >
              <div className="space-y-8 lg:space-y-12">
                <div>
                  <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">OUR STRENGTH</div>
                  <h2 className="tracking-tight leading-[1.1] mb-8 lg:mb-12 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    チームの強み
                  </h2>
                </div>
                
                <div className="space-y-4 lg:space-y-8 max-w-2xl">
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    HACSのチームは、スタッフの9割以上が20代という若い世代で構成されています。この若さが私たちの最大の強みです。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    一人ひとりが異なる専門性と個性を持ち、その強みを最大限に活かせる環境づくりを大切にしています。モバイル通信の分野で、お客様に最高のサービスを提供するため、常に学び続けています。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    私たちは、誰もが自分らしく力を発揮できる職場を目指し、新しい挑戦を恐れずに前進し続けます。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Members Grid Section - Dark Background */}
      <section className="bg-black py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          
          <div className="mb-12 lg:mb-24">
            <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">OUR TEAM</div>
            <h3 className="text-white tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              メンバー紹介
            </h3>
          </div>

          {/* First Member - Full Width */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.5 : 0.8 }}
            className="mb-12 lg:mb-24"
          >
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <ImageWithFallback
                    src={members[0].image}
                    alt={members[0].name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 text-white space-y-4 lg:space-y-8">
                <div>
                  <p className="text-sm tracking-[0.2em] text-gray-400 mb-4">{members[0].role}</p>
                  <h4 className="text-3xl lg:text-5xl mb-4 lg:mb-8 tracking-tight">{members[0].name}</h4>
                </div>
                <p className="text-white/80 leading-relaxed text-base lg:text-lg max-w-2xl">
                  {members[0].bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Other Members - Grid */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
            {members.slice(1).map((member, index) => (
              <motion.div 
                key={index + 1}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0 : index * 0.15 }}
                className="text-white"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-6 lg:mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 lg:space-y-4">
                  <p className="text-sm tracking-[0.2em] text-gray-400">{member.role}</p>
                  <h4 className="text-xl lg:text-2xl tracking-tight">{member.name}</h4>
                  <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
            
            {/* Left - Large Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="space-y-8 lg:space-y-16"
            >
              <h2 className="tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                Young<br />
                Dynamic<br />
                Team
              </h2>
              <p className="text-white/60 text-base lg:text-xl max-w-lg leading-relaxed">
                若いエネルギーと柔軟な発想で、新しい価値を創造し続けます。
              </p>
            </motion.div>

            {/* Right - Culture Details */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="space-y-8 lg:space-y-16"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">COMPANY CULTURE</div>
                <h3 className="text-3xl lg:text-4xl mb-12 tracking-tight">働く環境</h3>
              </div>
              
              <div className="space-y-8">
                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    20代が中心のフレッシュなチームで、フラットなコミュニケーションを大切にしています。
                  </p>
                </div>
                
                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    一人ひとりの個性と強みを尊重し、自由な発想を奨励する文化があります。
                  </p>
                </div>

                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    挑戦を応援し、失敗から学ぶことを大切にする成長志向の環境です。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-32 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              一緒に働きませんか
            </h2>
            <p className="text-gray-600 text-xl mb-16 leading-relaxed max-w-3xl mx-auto">
              HACSでは、常に新しいことに挑戦し、共に成長する仲間を募集しています。<br />
              あなたの個性と強みを活かして、私たちと一緒に未来を創りませんか。
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/recruit">
                <Button className="bg-black text-white hover:bg-zinc-800 px-12 py-6 text-base group">
                  採用情報を見る
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button asChild className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-12 py-6 text-base group">
                <Link to="/contact">
                  お問い合わせ
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
