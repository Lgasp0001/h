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
        hasLoggedHost?: boolean;
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
                    console.log('Voiceflow script loaded');
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
                            const host = document.querySelector('[id*="voiceflow"], [id*="vf-chat"], .vf-widget-container, #voiceflow-chat') as HTMLElement;

                            if (host) {
                                if (!window.hasLoggedHost) {
                                    console.log('Voiceflow host found:', host.id);
                                    window.hasLoggedHost = true;
                                }

                                // 1. Support for global positioning
                                host.style.setProperty('position', 'fixed', 'important');
                                host.style.setProperty('top', '45vh', 'important');
                                host.style.setProperty('right', '32px', 'important');
                                host.style.setProperty('bottom', 'auto', 'important');
                                host.style.setProperty('left', 'auto', 'important');
                                host.style.setProperty('width', '60px', 'important');
                                host.style.setProperty('height', '60px', 'important');
                                host.style.setProperty('transform', 'translateY(-50%)', 'important');
                                host.style.setProperty('overflow', 'visible', 'important');
                                host.style.setProperty('z-index', '999999999', 'important');
                                host.style.setProperty('pointer-events', 'none', 'important');

                                // 2. Shadow DOM injection
                                if (host.shadowRoot) {
                                    let style = host.shadowRoot.querySelector('#vf-surgical-final') as HTMLStyleElement;
                                    if (!style) {
                                        style = document.createElement('style');
                                        style.id = 'vf-surgical-final';
                                        host.shadowRoot.appendChild(style);
                                    }

                                    const cssContent = `
                                        .vfrc-launcher {
                                            position: absolute !important;
                                            top: 0 !important;
                                            right: 0 !important;
                                            bottom: auto !important;
                                            left: auto !important;
                                            width: 60px !important;
                                            height: 60px !important;
                                            border-radius: 50% !important;
                                            margin: 0 !important;
                                            padding: 0 !important;
                                            display: flex !important;
                                            align-items: center !important;
                                            justify-content: center !important;
                                            pointer-events: auto !important;
                                            transform: none !important;
                                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                                        }
                                        /* Hide everything but the icons to ensure circular shape */
                                        .vfrc-launcher > *:not(svg):not(img):not(.vfrc-icon) {
                                            display: none !important;
                                        }
                                        .vfrc-launcher svg, 
                                        .vfrc-launcher img,
                                        .vfrc-launcher .vfrc-icon,
                                        .vfrc-launcher .vfrc-icon * {
                                            display: block !important;
                                        }
                                        .vfrc-launcher svg, .vfrc-launcher img {
                                            width: 28px !important;
                                            height: 28px !important;
                                        }
                                        .vfrc-widget {
                                            position: fixed !important;
                                            bottom: 32px !important;
                                            right: 32px !important;
                                            top: auto !important;
                                            left: auto !important;
                                            pointer-events: auto !important;
                                        }
                                    `;
                                    if (style.textContent !== cssContent) {
                                        style.textContent = cssContent;
                                    }
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
