'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        voiceflow: {
            chat: {
                load: (config: {
                    verify: { projectID: string };
                    url: string;
                    versionID: string;
                    voice?: { url: string };
                }) => void;
            };
        };
    }
}

export default function VoiceflowChat() {
    useEffect(() => {
        let timer: NodeJS.Timeout;

        const initializeVoiceflow = () => {
            // Remove listeners to ensure this only runs once
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);

            // Start the 5-second countdown after the first interaction
            timer = setTimeout(() => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                script.async = true;

                script.onload = () => {
                    if (window.voiceflow && window.voiceflow.chat) {
                        window.voiceflow.chat.load({
                            verify: { projectID: '699261a9d6a662d6c77cb9cc' },
                            url: 'https://general-runtime.voiceflow.com',
                            versionID: 'production',
                            voice: {
                                url: "https://runtime-api.voiceflow.com"
                            }
                        });

                        // Powerful script to find and move Voiceflow elements even in Shadow DOM
                        const forcePosition = () => {
                            // 1. Target the main shadow host container
                            const shadowHost = document.querySelector('#voiceflow-chat, [id^="voiceflow-chat"]');
                            if (shadowHost && shadowHost.shadowRoot) {
                                const shadowRoot = shadowHost.shadowRoot;
                                const elements = shadowRoot.querySelectorAll('.vfrc-launcher, .vfrc-widget-launcher, [class*="launcher"]');
                                elements.forEach((el: any) => {
                                    el.style.setProperty('top', '20px', 'important');
                                    el.style.setProperty('bottom', 'auto', 'important');
                                    el.style.setProperty('right', '20px', 'important');
                                    el.style.setProperty('position', 'fixed', 'important');
                                });
                            }

                            // 2. Fallback for Light DOM elements
                            const lightLaunchers = document.querySelectorAll('.vfrc-launcher, .vf-widget-launcher, #voiceflow-chat-container');
                            lightLaunchers.forEach((el: any) => {
                                el.style.setProperty('top', '20px', 'important');
                                el.style.setProperty('bottom', 'auto', 'important');
                                el.style.setProperty('right', '20px', 'important');
                                el.style.setProperty('position', 'fixed', 'important');
                            });

                            // 3. Target any iframes (older versions)
                            document.querySelectorAll('iframe').forEach(iframe => {
                                if (iframe.src.includes('voiceflow') || iframe.id.includes('voiceflow')) {
                                    iframe.style.setProperty('top', '20px', 'important');
                                    iframe.style.setProperty('bottom', 'auto', 'important');
                                    iframe.style.setProperty('right', '20px', 'important');
                                    iframe.style.setProperty('position', 'fixed', 'important');
                                    iframe.style.setProperty('z-index', '100000', 'important');
                                }
                            });
                        };

                        // Run frequently to beat the widget's internal resets
                        setInterval(forcePosition, 200);
                        forcePosition(); // Run immediately
                    }
                };

                document.body.appendChild(script);
            }, 5000);
        };

        const handleInteraction = () => {
            initializeVoiceflow();
        };

        // Listen for the first click, touch, or scroll
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            if (timer) clearTimeout(timer);
        };
    }, []);

    return null;
}
