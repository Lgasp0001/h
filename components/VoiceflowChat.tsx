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
                                // 1. Root Positioning & Base Size
                                host.style.setProperty('position', 'fixed', 'important');
                                host.style.setProperty('top', '45vh', 'important');
                                host.style.setProperty('right', '32px', 'important');
                                host.style.setProperty('bottom', 'auto', 'important');
                                host.style.setProperty('left', 'auto', 'important');
                                host.style.setProperty('z-index', '9999999', 'important');
                                host.style.setProperty('transform', 'translateY(-50%)', 'important');
                                host.style.setProperty('overflow', 'visible', 'important');
                                host.style.setProperty('display', 'block', 'important');
                                host.style.setProperty('pointer-events', 'none', 'important'); // Pass-through for the host area

                                const widget = host.shadowRoot.querySelector('.vfrc-widget') as HTMLElement;
                                const launcher = host.shadowRoot.querySelector('.vfrc-launcher') as HTMLElement;

                                // Expand host if widget is open so it's not clipped
                                if (widget && !widget.classList.contains('vfrc-widget--hidden')) {
                                    host.style.setProperty('width', '400px', 'important');
                                    host.style.setProperty('height', '600px', 'important');
                                } else {
                                    host.style.setProperty('width', '60px', 'important');
                                    host.style.setProperty('height', '60px', 'important');
                                }

                                // 2. Inject Style Tag into Shadow DOM
                                if (!host.shadowRoot.querySelector('#vf-override')) {
                                    const style = document.createElement('style');
                                    style.id = 'vf-override';
                                    style.textContent = `
                                        .vfrc-launcher {
                                            position: absolute !important;
                                            bottom: 0 !important;
                                            right: 0 !important;
                                            top: auto !important;
                                            left: auto !important;
                                            width: 60px !important;
                                            height: 60px !important;
                                            margin: 0 !important;
                                            padding: 0 !important;
                                            border-radius: 50% !important;
                                            pointer-events: auto !important;
                                            transform: none !important;
                                            display: flex !important;
                                            align-items: center !important;
                                            justify-content: center !important;
                                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                                            background-color: #3b82f6 !important; /* Standard Voiceflow blue if missing */
                                        }
                                        .vfrc-widget {
                                            position: absolute !important;
                                            bottom: 0 !important; /* Bottom-aligned in the host */
                                            right: 0 !important;
                                            pointer-events: auto !important;
                                            transform: none !important;
                                            top: auto !important;
                                            left: auto !important;
                                            width: 400px !important;
                                            height: 600px !important;
                                            max-width: 90vw !important;
                                            max-height: 80vh !important;
                                        }
                                        .vfrc-launcher:hover {
                                            transform: scale(1.05) !important;
                                        }
                                        /* Shape Protection for images/svgs inside launcher */
                                        .vfrc-launcher img, .vfrc-launcher svg {
                                            width: 32px !important;
                                            height: 32px !important;
                                            object-fit: contain !important;
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
