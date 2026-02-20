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

                                // 1. Ensure host doesn't block interactions or clip content
                                host.style.setProperty('position', 'fixed', 'important');
                                host.style.setProperty('top', '0', 'important');
                                host.style.setProperty('right', '0', 'important');
                                host.style.setProperty('width', '100%', 'important');
                                host.style.setProperty('height', '0', 'important');
                                host.style.setProperty('overflow', 'visible', 'important');
                                host.style.setProperty('pointer-events', 'none', 'important');
                                host.style.setProperty('z-index', '2000000000', 'important');

                                // 2. Shadow DOM styles - position launcher FIXED at 45vh
                                if (host.shadowRoot) {
                                    let style = host.shadowRoot.querySelector('#vf-surgical-final') as HTMLStyleElement;
                                    if (!style) {
                                        style = document.createElement('style');
                                        style.id = 'vf-surgical-final';
                                        host.shadowRoot.appendChild(style);
                                    }

                                    const cssContent = `
                                        /* Move the launcher directly with fixed positioning */
                                        .vfrc-launcher {
                                            position: fixed !important;
                                            top: 45vh !important;
                                            right: 32px !important;
                                            bottom: auto !important;
                                            left: auto !important;
                                            transform: translateY(-50%) !important;
                                            pointer-events: auto !important;
                                            /* NO width/height/border-radius overrides to keep original shape */
                                        }
                                        /* Ensure ALL launcher children are visible (restores label/pill shape) */
                                        .vfrc-launcher * {
                                            display: initial !important;
                                        }
                                        .vfrc-launcher svg, .vfrc-launcher img {
                                            display: inline-block !important; /* Standard display for icons */
                                        }
                                        /* Keep the actual chat widget (the window) at the bottom right */
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
