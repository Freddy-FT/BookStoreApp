// AI
import { useEffect } from 'react';
import { animate, Timer } from 'animejs';
import '../assets/css/index.css'
export default function TimerTest() {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.value'));
        const [ $time, $count ] = elements;

        const timer = new Timer({
            duration: 1000,
            loop: true,
            frameRate: 30,
            onUpdate: self => {
                if ($time) $time.innerHTML = self.currentTime;
            },
            onLoop: self => {
                if ($count) $count.innerHTML = self._currentIteration;
            }
        });

        timer.play();
    }, []);

    return (
        <div className="large centered row">
            <div className="half col">
                <pre className="large log row">
                    <span className="label">current time</span>
                    <span className="value lcd">0</span>
                </pre>
            </div>
            <div className="half col">
                <pre className="large log row">
                    <span className="label">callback fired</span>
                    <span className="value lcd">0</span>
                </pre>
            </div>
        </div>
    );
}

import { createTimeline, stagger, utils, text } from 'animejs';

export function Test() {
    useEffect(() => {
        const { words, chars } = text.split('p', {
            words: { wrap: 'clip' },
            chars: true,
        });

        createTimeline({
            //loop: true, 
            defaults: { ease: 'inOut(1000)', duration: 10 },
        })
            .add(words, {
                y: [$el => +$el.dataset.line ? '100%' : '-100%', '0%'],
            }, stagger(125))
            .add(chars, {
                y: $el => +$el.dataset.line ? '100%' : '-100%',
            })
            .init();
    }, []);

    return (
        <div className="Text">
            <p className="text-xl">
                All-in-one text splitter<br />
                テキストスプリッター
            </p>
        </div>
    );
}