"use client";

import { useState } from "react";

type DoubleTapEventCallback = () => void;

type DoubleTapEventListeners = {
    onTouchStart: (ev: React.TouchEvent) => void;
}

export function CustomEvent_DoubleTap(callback: DoubleTapEventCallback): DoubleTapEventListeners {
    let lastTap = 0;
    const doubleTapThreshold = 300; // ダブルタップと認識する最大間隔（ミリ秒）

    return {
        onTouchStart(ev: React.TouchEvent) {
            const currentTime = Date.now();
            const tapLength = currentTime - lastTap;

            if (tapLength < doubleTapThreshold) callback();

            lastTap = currentTime;
        }
    };
}







type SwipeDirection = "left" | "right" | "up" | "down";

type SwipeEventCallback = (direction: SwipeDirection) => void;

type SwipeEventListeners = {
    onTouchStart: (ev: React.TouchEvent) => void;
    onTouchEnd: (ev: React.TouchEvent) => void;
}




export function CustomEvent_Swipe(callback: SwipeEventCallback): SwipeEventListeners {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const swipeThreshold = 100; // スワイプと認識する最小距離（ピクセル）

    return {
        onTouchStart(ev: React.TouchEvent) {
            touchStartX = ev.touches[0].clientX;
            touchStartY = ev.touches[0].clientY;
        },

        onTouchEnd(ev: React.TouchEvent) {
            const touchEndX = ev.changedTouches[0].clientX;
            const touchEndY = ev.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > swipeThreshold) callback(diffX > 0 ? "right" : "left");
            if (Math.abs(diffY) > swipeThreshold) callback(diffY > 0 ? "down" : "up");
        }
    };
}




export function CustomEvent_LongTap(callback: () => void, duration: number = 500) {
    let timer: NodeJS.Timeout;

    return {
        onTouchStart(ev: React.TouchEvent) {
            timer = setTimeout(callback, duration);;
        },
        onTouchEnd(ev: React.TouchEvent) {
            clearTimeout(timer);
        }
    };
}