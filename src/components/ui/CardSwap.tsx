import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  startImmediately?: boolean;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onSwap?: (frontCardIdx: number) => void;
  useZ?: boolean;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  className?: string;
  children: ReactNode;
}

export interface CardSwapHandle {
  next: () => void;
  prev: () => void;
  goTo: (idx: number) => void;
  getFrontIndex: () => number | undefined;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black transform-3d will-change-transform backface-hidden ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number, useZ: boolean): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: useZ ? -i * distX * 1.5 : 0,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number, useZ: boolean) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    ...(useZ ? { z: slot.z } : null),
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: false
  });

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  startImmediately = true,
  pauseOnHover = false,
  onCardClick,
  onSwap,
  useZ = true,
  skewAmount = 6,
  easing = 'elastic',
  className,
  children
}, ref) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  const pendingActions = useRef<Array<() => void>>([]);
  const enqueue = (action: () => void) => {
    if (tlRef.current?.isActive()) {
      pendingActions.current.push(action);
      return;
    }
    action();
  };

  const flushQueue = () => {
    const next = pendingActions.current.shift();
    if (next) next();
  };

  const getFrontIndex = () => order.current[0];

  const swapNext = () => {
    if (order.current.length < 2) return;
    if (tlRef.current?.isActive()) return;

    const [front, ...rest] = order.current;
    const nextFront = rest[0];
    if (typeof nextFront === 'number') {
      onSwap?.(nextFront);
    }
    const elFront = refs[front].current!;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current!;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, useZ);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          ...(useZ ? { z: slot.z } : null),
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length, useZ);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        ...(useZ ? { z: backSlot.z } : null),
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });

    tl.eventCallback('onComplete', () => {
      flushQueue();
    });
  };

  const swapPrev = () => {
    if (order.current.length < 2) return;
    if (tlRef.current?.isActive()) return;

    const currentOrder = order.current;
    const back = currentOrder[currentOrder.length - 1];
    const rest = currentOrder.slice(0, -1);
    const nextOrder = [back, ...rest];

    if (typeof back === 'number') {
      onSwap?.(back);
    }

    const elBack = refs[back].current!;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Drop the back card down first (similar energy to "next"), then bring it to the front.
    tl.to(elBack, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('reorder', `-=${config.durDrop * config.promoteOverlap}`);
    nextOrder.forEach((idx, i) => {
      const el = refs[idx].current!;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, useZ);
      tl.set(el, { zIndex: slot.zIndex }, 'reorder');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          ...(useZ ? { z: slot.z } : null),
          duration: config.durMove,
          ease: config.ease
        },
        `reorder+=${i * 0.12}`
      );
    });

    tl.call(() => {
      order.current = nextOrder;
    });

    tl.eventCallback('onComplete', () => {
      flushQueue();
    });
  };

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= refs.length) return;
    if (order.current.length < 2) return;

    const front = order.current[0];
    if (front === idx) return;

    const pos = order.current.indexOf(idx);
    if (pos === -1) return;

    const forwardSteps = pos;
    const backwardSteps = order.current.length - pos;

    const doForward = () => {
      let remaining = forwardSteps;
      const step = () => {
        if (remaining <= 0) return;
        remaining -= 1;
        pendingActions.current.unshift(step);
        swapNext();
      };
      step();
    };

    const doBackward = () => {
      let remaining = backwardSteps;
      const step = () => {
        if (remaining <= 0) return;
        remaining -= 1;
        pendingActions.current.unshift(step);
        swapPrev();
      };
      step();
    };

    enqueue(() => {
      if (backwardSteps < forwardSteps) {
        doBackward();
      } else {
        doForward();
      }
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      next: () => enqueue(swapNext),
      prev: () => enqueue(swapPrev),
      goTo: (i: number) => goTo(i),
      getFrontIndex
    }),
    // We intentionally don't include callbacks here to avoid ref identity churn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refs.length]
  );

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total, useZ), skewAmount, useZ)
    );

    const tick = () => {
      // Avoid fighting with user-triggered / ongoing animations.
      if (tlRef.current?.isActive()) return;
      swapNext();
    };

    if (startImmediately) {
      tick();
    }
    intervalRef.current = window.setInterval(tick, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(tick, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, startImmediately, pauseOnHover, skewAmount, easing, useZ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
            // Bring clicked card to the front; external UI should sync via onSwap.
            goTo(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={`absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55] ${className ?? ''}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
