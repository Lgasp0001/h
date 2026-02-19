'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ComparisonSlider from '@/components/ui/ComparisonSlider';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const cases = [
    {
        title: 'IVF Journey',
        subtitle: 'Personalized support at every step',
        before: 'https://images.unsplash.com/photo-1579152276502-53b8a3e144fe?auto=format&fit=crop&q=80&w=800',
        after: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    }
];

export default function PatientTransformations() {
    const scrollToQuiz = () => {
        const element = document.querySelector('#quiz');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="transformations" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-rose/10 text-rose hover:bg-rose/20 mb-4 px-4 py-1 rounded-full border-rose/20">
                            The Frost Philosophy
                        </Badge>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-berry mb-6 tracking-tight">
                        Experience the <span className="text-rose">Boutique Difference.</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        We combine cutting-edge reproductive technology with a nurturing environment designed to support your emotional and physical well-being.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="premium-glass p-4 rounded-[2.5rem] bg-gray-50/50"
                    >
                        <ComparisonSlider
                            beforeImage="/images/transformations/sarah_before.png"
                            afterImage="/images/transformations/sarah_after.png"
                        />
                    </motion.div>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between bg-berry rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-rose" />
                                Personalized Care: Sarah M.
                            </h3>
                            <p className="text-gray-300 text-lg max-w-md">
                                &ldquo;Moving from a cold hospital setting to the Frosts studio was a revelation. I felt seen, heard, and supported throughout my IVF journey.&rdquo;
                            </p>
                        </div>
                        <Button
                            onClick={scrollToQuiz}
                            size="lg"
                            className="bg-rose hover:bg-rose-600 text-white px-8 py-7 rounded-xl text-lg font-bold transition-all transform hover:-translate-y-1 group"
                        >
                            Start Your Assessment
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
