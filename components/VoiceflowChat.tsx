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

                        const fixChatbot = () => {
                            const host = document.querySelector('#voiceflow-chat, [id^="voiceflow-chat"]') as HTMLElement;
                            if (host && host.shadowRoot) {
                                // 1. Root Positioning (Ghost point at 45vh)
                                host.style.setProperty('position', 'fixed', 'important');
                                host.style.setProperty('top', '45vh', 'important');
                                host.style.setProperty('right', '32px', 'important');
                                host.style.setProperty('bottom', 'auto', 'important');
                                host.style.setProperty('left', 'auto', 'important');
                                host.style.setProperty('width', '10px', 'important');
                                host.style.setProperty('height', '10px', 'important');
                                host.style.setProperty('overflow', 'visible', 'important');
                                host.style.setProperty('z-index', '9999999', 'important');
                                host.style.setProperty('pointer-events', 'none', 'important');

                                // 2. Inject Style Tag into Shadow DOM (Cleaner & more stable)
                                if (!host.shadowRoot.querySelector('#vf-override')) {
                                    const style = document.createElement('style');
                                    style.id = 'vf-override';
                                    style.textContent = `
                                        .vfrc-launcher {
                                            position: absolute !important;
                                            top: 0 !important;
                                            right: 0 !important;
                                            width: 60px !important;
                                            height: 60px !important;
                                            margin: 0 !important;
                                            border-radius: 50% !important; /* Force Circle */
                                            pointer-events: auto !important;
                                            transform: translateY(-50%) !important;
                                            bottom: auto !important;
                                            left: auto !important;
                                            display: flex !important;
                                            align-items: center !important;
                                            justify-content: center !important;
                                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                                        }
                                        .vfrc-widget {
                                            position: absolute !important;
                                            bottom: 40px !important; /* Above launcher relative to host point */
                                            right: 0 !important;
                                            pointer-events: auto !important;
                                            transform: none !important;
                                            top: auto !important;
                                            left: auto !important;
                                        }
                                    `;
                                    host.shadowRoot.appendChild(style);
                                }
                            }
                        };

                        const observer = new MutationObserver(fixChatbot);
                        observer.observe(document.body, { childList: true, subtree: true });
                        setInterval(fixChatbot, 500);
                        fixChatbot();
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
