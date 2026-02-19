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

                        // Refined surgical script to move to Center-Right without breakage
                        const fixChatbot = () => {
                            const host = document.querySelector('#voiceflow-chat, [id^="voiceflow-chat"]');
                            if (host && host.shadowRoot) {
                                const el = host as HTMLElement;

                                // 1. Make the host a 'ghost point' on the right-hand edge
                                el.style.setProperty('position', 'fixed', 'important');
                                el.style.setProperty('right', '0px', 'important');
                                el.style.setProperty('top', '50%', 'important');
                                el.style.setProperty('bottom', 'auto', 'important');
                                el.style.setProperty('left', 'auto', 'important');
                                el.style.setProperty('width', '1px', 'important');
                                el.style.setProperty('height', '1px', 'important');
                                el.style.setProperty('overflow', 'visible', 'important');
                                el.style.setProperty('z-index', '999999', 'important');
                                el.style.setProperty('transform', 'translateY(-50%)', 'important');
                                el.style.setProperty('pointer-events', 'none', 'important');

                                // 2. Target internal Shadow DOM elements
                                const launcher = host.shadowRoot.querySelector('.vfrc-launcher') as HTMLElement;
                                const widget = host.shadowRoot.querySelector('.vfrc-widget') as HTMLElement;

                                if (launcher) {
                                    // Position launcher relative to the ghost host
                                    launcher.style.setProperty('position', 'absolute', 'important');
                                    launcher.style.setProperty('right', '32px', 'important');
                                    launcher.style.setProperty('bottom', 'auto', 'important');
                                    launcher.style.setProperty('top', '0px', 'important');
                                    launcher.style.setProperty('transform', 'translateY(-50%)', 'important');
                                    launcher.style.setProperty('pointer-events', 'all', 'important');
                                }

                                if (widget) {
                                    // Ensure widget is clickable and positioned relative to the ghost point
                                    widget.style.setProperty('pointer-events', 'all', 'important');

                                    // If widget is NOT hidden (meaning it's open)
                                    if (!widget.classList.contains('vfrc-widget--hidden')) {
                                        // Position the open chat window nicely near the button
                                        widget.style.setProperty('position', 'absolute', 'important');
                                        widget.style.setProperty('right', '32px', 'important');
                                        widget.style.setProperty('bottom', '0px', 'important');
                                        widget.style.setProperty('top', 'auto', 'important');
                                        widget.style.setProperty('transform', 'translateY(100%)', 'important');
                                        // Note: Opening it "downwards" from the center point might push it off screen
                                        // Let's try anchoring it so the bottom of the chat is at the center.
                                        widget.style.setProperty('transform', 'translateY(0)', 'important');
                                        widget.style.setProperty('bottom', '60px', 'important');
                                    }
                                }
                            }
                        };

                        const observer = new MutationObserver(fixChatbot);
                        observer.observe(document.body, { childList: true, subtree: true });
                        setInterval(fixChatbot, 200); // Fast check to override Voiceflow's internal styles
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
