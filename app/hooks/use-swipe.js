'use client';
import { useRef, useState } from 'react';

export default function useSwipe(onLeft, onRight, threshold = 50) {
  const start = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const reset = () => {
    start.current = null;
    setOffset(0);
    setDragging(false);
  };
  const handlers = {
    onPointerDown(event) {
      if (!event.isPrimary || event.button !== 0) return;
      start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove(event) {
      if (start.current?.id !== event.pointerId) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      setOffset(Math.abs(dx) > Math.abs(dy) ? dx : 0);
    },
    onPointerUp(event) {
      if (start.current?.id !== event.pointerId) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      reset();
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? onLeft() : onRight();
      }
    },
    onPointerCancel: reset,
    onLostPointerCapture: reset,
    onDragStart: event => event.preventDefault(),
  };
  return { handlers, offset, dragging };
}
