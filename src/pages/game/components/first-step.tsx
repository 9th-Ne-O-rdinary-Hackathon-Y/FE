import { useEffect, useRef, useState } from "react";

import StarIcon from "@/assets/star_icon.svg?react";
import { Button } from "@/components/ui/button";

import type { UseFormReturn } from "react-hook-form";

import type { GameForm } from "../schema/game";
import {
  createInitialStarState,
  getCenterPosition,
  handleBoundaryCollision,
  STAR_SIZE,
  type StarPosition,
  type Velocity,
} from "../utils/star-game";

interface FirstStepProps {
  form: UseFormReturn<GameForm>;
}

export default function FirstStep({ form }: FirstStepProps) {
  const STAR_SPEED = 20;

  const center = getCenterPosition();

  const initialState = useState(() => createInitialStarState(STAR_SPEED))[0];
  const [starPosition, setStarPosition] = useState<StarPosition>(initialState.position);
  const [isMoving, setIsMoving] = useState(true);
  const [startTime] = useState(() => Date.now());
  const animationRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef<Velocity>(initialState.velocity);
  const positionRef = useRef<StarPosition>(initialState.position);

  useEffect(() => {
    if (!isMoving) return;

    const animate = () => {
      if (!isMoving) return;

      const { x, y } = positionRef.current;
      const { x: vx, y: vy } = velocityRef.current;

      const { position: newPosition, velocity: newVelocity } = handleBoundaryCollision(
        { x: x + vx, y: y + vy },
        { x: vx, y: vy }
      );

      velocityRef.current = newVelocity;
      positionRef.current = newPosition;
      setStarPosition(newPosition);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMoving]);

  const handleStop = () => {
    if (!isMoving) return;
    setIsMoving(false);

    const result = {
      clientX: starPosition.x,
      clientY: starPosition.y,
      answerX: center.x,
      answerY: center.y,
      ms: Date.now() - startTime,
    };

    // TODO: form에 저장 및 다음 스텝 
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col items-center justify-between overflow-hidden"
      style={{
        backgroundImage: "url('/first-step-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-gray-08 z-10 mt-3 ml-5 self-start text-2xl font-bold">
        하늘에 있는 별을 맞춰라!
      </div>

      <div
        className="text-gray-01 pointer-events-none absolute z-0"
        style={{
          left: `${center.x - STAR_SIZE.halfWidth}px`,
          top: `${center.y - STAR_SIZE.halfHeight}px`,
        }}
      >
        <StarIcon className="fill-current" />
      </div>

      <div
        className="text-key-01 pointer-events-none absolute z-10 transition-none"
        style={{
          left: `${starPosition.x - STAR_SIZE.halfWidth}px`,
          top: `${starPosition.y - STAR_SIZE.halfHeight}px`,
          transform: "translate(0, 0)",
        }}
      >
        <StarIcon className="fill-current" />
      </div>

      <div className="relative z-10 mb-14">
        <Button
          onClick={handleStop}
          disabled={!isMoving}
          variant="default"
          className="text-orange-10 px-[147px] font-semibold"
        >
          STOP
        </Button>
      </div>
    </section>
  );
}
