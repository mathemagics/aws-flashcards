"use client";

import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  type HTMLAttributes,
} from "react";
import { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./Arrows";
import { cn } from "~/lib/style";

type CarouselProps = {
  options?: EmblaOptionsType;
  showProgress?: boolean;
  showControls?: boolean;
};

export function Carousel({
  children,
  options,
  showProgress = false,
  showControls = false,
}: PropsWithChildren<CarouselProps>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("scroll", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div>
      <CarouselViewport ref={emblaRef}>{children}</CarouselViewport>

      {(showControls || showProgress) && (
        <CarouselControls>
          {showControls && (
            <CarouselButtons>
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </CarouselButtons>
          )}

          {showProgress && <CarouselProgress progress={scrollProgress} />}
        </CarouselControls>
      )}
    </div>
  );
}

export function CarouselContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex touch-pan-y gap-6 backface-hidden", className)}>
      {children}
    </div>
  );
}

export function CarouselControls({ children }: PropsWithChildren) {
  return (
    <div className="mt-8 grid grid-cols-2 justify-between gap-6 px-4">
      {children}
    </div>
  );
}

export function CarouselButtons({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-4">{children}</div>;
}

export const CarouselViewport = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  return (
    <div ref={ref} className="overflow-hidden px-4">
      {children}
    </div>
  );
});

CarouselViewport.displayName = "CarouselViewport";

export const CarouselSlide = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    >
      {children}
    </div>
  );
});

CarouselSlide.displayName = "CarouselSlide";

export function CarouselProgress({ progress }: { progress: number }) {
  return (
    <div className="relative h-5 w-2/3 self-end justify-self-end overflow-hidden rounded-lg border">
      <div
        className="absolute inset-y-0 -left-full w-full bg-white"
        style={{ transform: `translate3d(${progress}%,0px,0px)` }}
      />
    </div>
  );
}
