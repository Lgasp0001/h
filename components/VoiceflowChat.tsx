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

                        // Even more powerful script to force position
                        const forceTopPosition = () => {
                            // Target both the shadow host and any direct child elements
                            const selectors = [
                                '#voiceflow-chat',
                                '[id^="voiceflow-chat"]',
                                '.vfrc-launcher',
                                '.vfrc-widget-launcher',
                                '[class*="vfrc-"]'
                            ];

                            selectors.forEach(selector => {
                                const elements = document.querySelectorAll(selector);
                                elements.forEach((el: any) => {
                                    el.style.setProperty('top', '20px', 'important');
                                    el.style.setProperty('bottom', 'auto', 'important');
                                    el.style.setProperty('right', '20px', 'important');
                                    el.style.setProperty('position', 'fixed', 'important');
                                    el.style.setProperty('transform', 'none', 'important');

                                    // If it's the host, look inside its shadow root
                                    if (el.shadowRoot) {
                                        const children = el.shadowRoot.querySelectorAll('.vfrc-launcher, [class*="launcher"]');
                                        children.forEach((child: any) => {
                                            child.style.setProperty('top', '20px', 'important');
                                            child.style.setProperty('bottom', 'auto', 'important');
                                            child.style.setProperty('right', '20px', 'important');
                                            child.style.setProperty('position', 'fixed', 'important');
                                            child.style.setProperty('transform', 'none', 'important');
                                        });
                                    }
                                });
                            });
                        };

                        // Use MutationObserver for instant reaction
                        const observer = new MutationObserver(() => {
                            forceTopPosition();
                        });

                        observer.observe(document.body, {
                            childList: true,
                            subtree: true
                        });

                        // Interval as a backup for dynamic internal widget updates
                        setInterval(forceTopPosition, 100);
                        forceTopPosition();
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
