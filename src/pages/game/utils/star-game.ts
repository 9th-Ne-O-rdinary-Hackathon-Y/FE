export type StarPosition = Readonly<{
  x: number;
  y: number;
}>;

export type Velocity = Readonly<{
  x: number;
  y: number;
}>;

export interface StarState {
  position: StarPosition;
  velocity: Velocity;
}

export const STAR_SIZE = {
  width: 122,
  height: 108,
  halfWidth: 61,
  halfHeight: 54,
} as const;

const MARGIN = 100;
const EDGE_MARGIN = 150;
const MAX_ANGLE_DEVIATION = 0.5;

export const getCenterPosition = (): StarPosition => ({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
});

export const createInitialStarState = (speed: number = 20): StarState => {
  const { innerWidth: width, innerHeight: height } = window;
  const center = getCenterPosition();

  const edges = [
    () => ({
      x: EDGE_MARGIN + Math.random() * (width - EDGE_MARGIN * 2),
      y: MARGIN + Math.random() * 100,
    }),

    () => ({
      x: EDGE_MARGIN + Math.random() * (width - EDGE_MARGIN * 2),
      y: height - MARGIN - Math.random() * 100,
    }),

    () => ({
      x: MARGIN + Math.random() * 100,
      y: EDGE_MARGIN + Math.random() * (height - EDGE_MARGIN * 2),
    }),

    () => ({
      x: width - MARGIN - Math.random() * 100,
      y: EDGE_MARGIN + Math.random() * (height - EDGE_MARGIN * 2),
    }),
  ];

  const position = edges[Math.floor(Math.random() * 4)]();

  const dx = center.x - position.x;
  const dy = center.y - position.y;
  const randomAngle = (Math.random() - 0.5) * MAX_ANGLE_DEVIATION;
  const angle = Math.atan2(dy, dx) + randomAngle;

  return {
    position,
    velocity: {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    },
  };
};

export const handleBoundaryCollision = (
  position: StarPosition,
  velocity: Velocity
): { position: StarPosition; velocity: Velocity } => {
  const { innerWidth: width, innerHeight: height } = window;
  let { x, y } = position;
  let { x: vx, y: vy } = velocity;

  const COLLISION_ANGLE_VARIANCE = 0.15;
  const MIN_VELOCITY_RATIO = 0.3;

  const applyCollisionPhysics = (isHorizontal: boolean, shouldReflect: boolean): void => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    const currentAngle = Math.atan2(vy, vx);
    const angleChange = (Math.random() - 0.5) * COLLISION_ANGLE_VARIANCE;
    const newAngle = currentAngle + angleChange;

    vx = Math.cos(newAngle) * speed;
    vy = Math.sin(newAngle) * speed;

    if (isHorizontal) {
      vx = shouldReflect ? Math.abs(vx) : -Math.abs(vx);
      if (Math.abs(vy) < MIN_VELOCITY_RATIO * speed) {
        vy = (vy >= 0 ? 1 : -1) * MIN_VELOCITY_RATIO * speed;
      }
    } else {
      vy = shouldReflect ? Math.abs(vy) : -Math.abs(vy);
      if (Math.abs(vx) < MIN_VELOCITY_RATIO * speed) {
        vx = (vx >= 0 ? 1 : -1) * MIN_VELOCITY_RATIO * speed;
      }
    }
  };

  if (x - STAR_SIZE.halfWidth < 0) {
    x = STAR_SIZE.halfWidth;
    applyCollisionPhysics(true, true);
  } else if (x + STAR_SIZE.halfWidth > width) {
    x = width - STAR_SIZE.halfWidth;
    applyCollisionPhysics(true, false);
  }

  if (y - STAR_SIZE.halfHeight < 0) {
    y = STAR_SIZE.halfHeight;
    applyCollisionPhysics(false, true);
  } else if (y + STAR_SIZE.halfHeight > height) {
    y = height - STAR_SIZE.halfHeight;
    applyCollisionPhysics(false, false);
  }

  return {
    position: { x, y },
    velocity: { x: vx, y: vy },
  };
};
