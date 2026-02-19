'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';

const cases = [
    {
        name: "Sarah's IVF Journey",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        location: "South Congress, Austin",
        treatment: "IVF Treatment",
        duration: "6 Months",
        outcome: "Healthy Pregnancy",
        quote: "Starting our family was an emotional journey. The team at Frosts provided the compassion and care we needed every step of the way.",
        rating: 5
    },
    {
        name: "David's Consultation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        location: "Westlake Hills, Austin",
        treatment: "Fertility Check",
        duration: "1 Visit",
        outcome: "Clear Roadmap",
        quote: "I wanted to understand my options for the future. The diagnostic clarity I received gave me incredible peace of mind.",
        rating: 5
    },
    {
        name: "Emily's Preservation",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
        location: "Downtown Austin",
        treatment: "Egg Freezing",
        duration: "14 Days",
        outcome: "12 Oocytes Frozen",
        quote: "Preserving my future options was the best decision I've made. The boutique environment made the entire process stress-free.",
        rating: 5
    }
];

export default function SocialProof() {
    return (
        <section className="py-24 bg-background overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <Badge className="bg-rose/10 text-rose mb-4 hover:bg-rose/20 transition-colors">
                            Compassionate Stories
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-berry mb-6 tracking-tight text-balance">
                            Authentic Journeys. <br />
                            <span className="text-rose">Built on Hope &amp; Care.</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            From South Congress to Westlake, we&apos;ve helped hundreds of families start their journeys. No stock photos&mdash;just real people and real hope.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-end"
                    >
                        <div className="flex -space-x-4 mb-4">
                            {[
                                { type: 'image', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', name: 'Sarah' },
                                { type: 'letter', char: 'M', color: 'bg-orange-500' },
                                { type: 'image', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', name: 'David' },
                                { type: 'letter', char: 'K', color: 'bg-berry' },
                                { type: 'image', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', name: 'Emily' },
                            ].map((avatar, i) => (
                                <div
                                    key={i}
                                    className={`w-12 h-12 rounded-full border-4 border-white overflow-hidden ring-2 ring-rose/20 shadow-lg relative flex items-center justify-center ${avatar.type === 'letter' ? avatar.color : 'bg-gray-200'}`}
                                >
                                    {avatar.type === 'image' && avatar.src ? (
                                        <Image
                                            src={avatar.src}
                                            alt={avatar.name || 'Patient'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-lg">{'char' in avatar ? avatar.char : ''}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-berry font-bold flex items-center gap-2">
                            <div className="flex">
                                {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 text-rose fill-rose" />)}
                                <div className="relative">
                                    <Star className="w-4 h-4 text-rose" />
                                    <div className="absolute inset-0 overflow-hidden w-1/2">
                                        <Star className="w-4 h-4 text-rose fill-rose" />
                                    </div>
                                </div>
                            </div>
                            4.4/5 from 437 reviews in total
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory flex-nowrap flex md:grid px-4 -mx-4">
                    {cases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer snap-center min-w-[85vw] md:min-w-0"
                        >
                            <Card className="border-none shadow-xl shadow-berry/5 rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm">
                                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-berry/60 to-transparent" />
                                    <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-berry text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                                        Real Journey
                                    </span>
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-berry mb-1">{item.name}</h3>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Badge variant="outline" className="text-[10px] uppercase tracking-tighter border-rose/30 text-rose">
                                                    {item.treatment}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic mb-6 leading-relaxed">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Timeframe</p>
                                            <p className="text-berry font-bold">{item.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Outcome</p>
                                            <p className="text-berry font-bold">{item.outcome}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
