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

                        // Surgical script to move launcher to center-right without breaking the chat window
                        const forceCenterRight = () => {
                            const host = document.querySelector('#voiceflow-chat, [id^="voiceflow-chat"]');
                            if (host) {
                                const el = host as HTMLElement;
                                // 1. Set host to cover full area but be "invisible" to clicks (except its children)
                                el.style.setProperty('position', 'fixed', 'important');
                                el.style.setProperty('right', '0px', 'important');
                                el.style.setProperty('bottom', '0px', 'important');
                                el.style.setProperty('top', '0px', 'important');
                                el.style.setProperty('left', '0px', 'important');
                                el.style.setProperty('width', '100vw', 'important');
                                el.style.setProperty('height', '100vh', 'important');
                                el.style.setProperty('pointer-events', 'none', 'important');
                                el.style.setProperty('z-index', '999999', 'important');

                                if (el.shadowRoot) {
                                    // 2. Position the launcher exactly in the vertical center-right
                                    const launcher = el.shadowRoot.querySelector('.vfrc-launcher');
                                    if (launcher) {
                                        const l = launcher as HTMLElement;
                                        l.style.setProperty('position', 'fixed', 'important');
                                        l.style.setProperty('right', '20px', 'important');
                                        l.style.setProperty('bottom', '50%', 'important');
                                        l.style.setProperty('transform', 'translateY(50%)', 'important');
                                        l.style.setProperty('pointer-events', 'all', 'important');
                                    }

                                    // 3. Position the widget (chat window) so it's visible when open
                                    const widget = el.shadowRoot.querySelector('.vfrc-widget');
                                    if (widget) {
                                        const w = widget as HTMLElement;
                                        // If the widget is open, we want it to stay near the launcher or at bottom-right
                                        // Voiceflow adds/removes styles here, so we just ensure it's clickable and bounded
                                        w.style.setProperty('pointer-events', 'all', 'important');

                                        // If widget is open, shift it so it doesn't overlap the launcher awkwardly
                                        // Most Voiceflow widgets anchor at the bottom of the container
                                        if (!widget.classList.contains('vfrc-widget--hidden')) {
                                            w.style.setProperty('right', '20px', 'important');
                                            w.style.setProperty('bottom', '80px', 'important');
                                            w.style.setProperty('top', 'auto', 'important');
                                        }
                                    }
                                }
                            }
                        };

                        const observer = new MutationObserver(forceCenterRight);
                        observer.observe(document.body, { childList: true, subtree: true });
                        setInterval(forceCenterRight, 200);
                        forceCenterRight();
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
