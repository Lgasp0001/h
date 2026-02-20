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
                }) => Promise<void>;
            };
        };
    }
}

export default function VoiceflowChat() {
    useEffect(() => {
        let timer: NodeJS.Timeout;

        const initializeVoiceflow = () => {
            // Remove listeners immediately so this only triggers once
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);

            // Start the 5-second countdown after the first interaction
            timer = setTimeout(() => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
                script.async = true;

                script.onload = () => {
                    if (window.voiceflow && window.voiceflow.chat) {
                        window.voiceflow.chat.load({
                            verify: { projectID: '699261a9d6a662d6c77cb9cc' },
                            url: 'https://general-runtime.voiceflow.com',
                            versionID: 'production',
                            voice: {
                                url: 'https://runtime-api.voiceflow.com'
                            }
                        }).then(() => {
                            const style = document.createElement('style');
                            style.innerHTML = `
                                .vfrc-launcher__container {
                                  bottom: 200px !important;
                                }
                                .vfrc-chat__container {
                                  bottom: 20px !important;
                                }
                            `;

                            // Use an interval to ensure the Shadow DOM is ready before injecting styles
                            const interval = setInterval(() => {
                                const chatElement = document.querySelector('#voiceflow-chat');
                                if (chatElement && chatElement.shadowRoot) {
                                    chatElement.shadowRoot.appendChild(style);
                                    clearInterval(interval);
                                }
                            }, 100);

                            // Safety timeout for the interval
                            setTimeout(() => clearInterval(interval), 5000);
                        });
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
