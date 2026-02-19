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

                        // Most stable script to move launcher to center-right without distortion
                        const forceCenterRight = () => {
                            const host = document.querySelector('#voiceflow-chat, [id^="voiceflow-chat"]');
                            if (host) {
                                const el = host as HTMLElement;
                                // Reset the host so it doesn't squash or stretch children
                                el.style.setProperty('position', 'fixed', 'important');
                                el.style.setProperty('right', '32px', 'important');
                                el.style.setProperty('bottom', '50%', 'important');
                                el.style.setProperty('top', 'auto', 'important');
                                el.style.setProperty('left', 'auto', 'important');
                                el.style.setProperty('transform', 'translateY(50%)', 'important');
                                el.style.setProperty('width', '1px', 'important'); // Tiny width
                                el.style.setProperty('height', '1px', 'important'); // Tiny height
                                el.style.setProperty('overflow', 'visible', 'important');
                                el.style.setProperty('display', 'flex', 'important');
                                el.style.setProperty('align-items', 'center', 'important');
                                el.style.setProperty('justify-content', 'center', 'important');
                                el.style.setProperty('z-index', '999999', 'important');

                                if (el.shadowRoot) {
                                    // Target the launcher specifically
                                    const launcher = el.shadowRoot.querySelector('.vfrc-launcher');
                                    if (launcher) {
                                        const l = launcher as HTMLElement;
                                        // Ensure it doesn't stretch to fill the host
                                        l.style.setProperty('width', 'auto', 'important');
                                        l.style.setProperty('height', 'auto', 'important');
                                        l.style.setProperty('position', 'absolute', 'important');
                                        l.style.setProperty('right', '0', 'important');
                                        l.style.setProperty('bottom', '0', 'important');
                                        l.style.setProperty('transform', 'none', 'important');
                                    }

                                    // Ensure the widget window is visible when it opens
                                    const widget = el.shadowRoot.querySelector('.vfrc-widget');
                                    if (widget) {
                                        const w = widget as HTMLElement;
                                        // Shift the open window so it stays on screen
                                        if (!widget.classList.contains('vfrc-widget--hidden')) {
                                            w.style.setProperty('bottom', '20px', 'important');
                                            w.style.setProperty('right', '0', 'important');
                                            w.style.setProperty('position', 'absolute', 'important');
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
