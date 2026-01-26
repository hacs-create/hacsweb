import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Train, Car, Footprints, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function AccessTabs() {
  return (
    <div className="w-full">
      <Tabs defaultValue="train" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 p-1">
          <TabsTrigger 
            value="train" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70"
          >
            <Train className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">電車</span>
          </TabsTrigger>
          <TabsTrigger 
            value="car"
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70"
          >
            <Car className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">車</span>
          </TabsTrigger>
          <TabsTrigger 
            value="walk"
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white/70"
          >
            <Footprints className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">徒歩</span>
          </TabsTrigger>
        </TabsList>

        {/* Train Access */}
        <TabsContent value="train" className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-6 border border-white/10 bg-white/5 rounded-sm">
              <Train className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h4 className="text-white tracking-tight text-lg">最寄り駅からのアクセス</h4>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">名鉄小牧線「小牧口駅」より</p>
                      <p className="text-sm text-white/70">徒歩約15分</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">バスでのアクセス</p>
                      <p className="text-sm text-white/70">小牧駅より「小牧市役所前」バス停下車、徒歩5分</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    駅からのルート詳細は、GoogleマップまたはNAVITIMEをご利用ください。
                  </p>
                </div>
              </div>
            </div>

            {/* Route Steps */}
            <div className="space-y-3">
              {[
                '小牧口駅を出て、北西方向に進みます',
                '県道451号線を北上します',
                '約1km直進後、下小針天神交差点を右折',
                'ESPRESSO小牧が見えたら到着です（2C号室）'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-white/70"
                >
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-white flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-0.5">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Car Access */}
        <TabsContent value="car" className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-6 border border-white/10 bg-white/5 rounded-sm">
              <Car className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h4 className="text-white tracking-tight text-lg">お車でのアクセス</h4>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">名古屋高速小牧線「小牧南IC」より</p>
                      <p className="text-sm text-white/70">約8分（約3km）</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">東名高速道路「小牧IC」より</p>
                      <p className="text-sm text-white/70">約12分（約5km）</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white mb-2">駐車場情報</p>
                  <p className="text-sm text-gray-400">
                    建物敷地内に駐車スペースがございます。<br />
                    満車の場合は、近隣のコインパーキングをご利用ください。
                  </p>
                </div>
              </div>
            </div>

            {/* Driving Directions */}
            <div className="space-y-3">
              {[
                '小牧南ICを出て、国道155号線を北上',
                '約2km直進し、「下小針」交差点を右折',
                '県道451号線を約800m進む',
                '「ESPRESSO小牧」の看板が目印です'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-white/70"
                >
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-white flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-0.5">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Walking Access */}
        <TabsContent value="walk" className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-6 border border-white/10 bg-white/5 rounded-sm">
              <Footprints className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h4 className="text-white tracking-tight text-lg">徒歩でのアクセス</h4>
                
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">小牧口駅より</p>
                      <p className="text-sm text-white/70">徒歩約15分（約1.2km）</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">所要時間</p>
                      <p className="text-sm text-white/70">通常の歩行速度で約15分程度です</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    歩道が整備されており、安全にお越しいただけます。<br />
                    雨天時は傘をご用意ください。
                  </p>
                </div>
              </div>
            </div>

            {/* Walking Route */}
            <div className="space-y-3">
              {[
                '小牧口駅の北口を出ます',
                '駅前のロータリーを抜けて北西方向へ',
                '県道451号線沿いを北上します',
                '「下小針天神」交差点付近のESPRESSO小牧2C号室'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-white/70"
                >
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-white flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-0.5">{step}</p>
                </motion.div>
              ))}
            </div>

            {/* Map Link */}
            <div className="pt-6">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=〒485-0036+愛知県小牧市下小針天神2丁目2+ESPRESSO小牧2C"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors group"
              >
                <MapPin className="w-4 h-4" />
                <span className="border-b border-white/50 group-hover:border-white/80">
                  Googleマップでルートを確認
                </span>
              </a>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
