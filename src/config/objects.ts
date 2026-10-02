export type Vec3 = [number, number, number];
export type ObjectId = 'sofa' | 'table' | 'lamp' | 'plant' | 'records' | 'art';
export interface CameraTarget {
  position: Vec3;
  lookAt: Vec3;
  scale: number;
}
export interface RoomObject {
  id: ObjectId;
  label: string;
  shortLabel: string;
  category: string;
  description: string;
  detail: string;
  focus: CameraTarget;
  marker: Vec3;
}

export const ROOM_VIEW: CameraTarget = {
  position: [9, 8, 11],
  lookAt: [0, 1.1, 0],
  scale: 1,
};
export const OBJECTS: readonly RoomObject[] = [
  {
    id: 'sofa',
    shortLabel: 'Sofa',
    label: 'The slow-down sofa',
    category: 'TAKE A SEAT',
    description:
      'A soft landing for a long day. Deep olive cushions, rounded edges, and just enough room to curl up with your favorite book.',
    detail: 'Olive linen · Solid oak feet',
    focus: { position: [5, 4.5, 7], lookAt: [-1.2, 0.9, -1.1], scale: 1.65 },
    marker: [-1.65, 1.55, -0.65],
  },
  {
    id: 'table',
    shortLabel: 'Coffee table',
    label: 'A moment for yourself',
    category: 'THE DAILY RITUAL',
    description:
      'Coffee, a well-loved book, and nowhere else to be. A low oak table holds the small rituals that make an ordinary afternoon feel special.',
    detail: 'Natural oak · Hand-thrown ceramic',
    focus: { position: [6, 6, 8], lookAt: [0.2, 0.5, 0.8], scale: 1.9 },
    marker: [0.2, 1, 1],
  },
  {
    id: 'lamp',
    shortLabel: 'Floor lamp',
    label: 'A little golden glow',
    category: 'SET THE MOOD',
    description:
      'A pleated shade catches the afternoon light. When the day winds down, its warm glow makes this corner the best seat in the house.',
    detail: 'Pleated linen · Brushed brass',
    focus: { position: [6, 5, 6], lookAt: [-2.5, 1.5, -1.9], scale: 1.7 },
    marker: [-2.55, 2.7, -1.8],
  },
  {
    id: 'plant',
    shortLabel: 'Plant',
    label: 'Room to grow',
    category: 'BRING THE OUTSIDE IN',
    description:
      'A leafy companion reaching toward the window. A little water, a little sunshine, and a gentle reminder to grow at your own pace.',
    detail: 'Fiddle-leaf fig · Terracotta pot',
    focus: { position: [7, 5, 8], lookAt: [2.2, 1.3, -1.7], scale: 1.7 },
    marker: [2.25, 2.35, -1.6],
  },
  {
    id: 'records',
    shortLabel: 'Records',
    label: 'The Sunday soundtrack',
    category: 'ON REPEAT',
    description:
      'A few favorite records, collected slowly. Lower the needle, let the album play all the way through, and give the afternoon its own rhythm.',
    detail: 'Walnut cabinet · Analog soul',
    focus: { position: [8, 5, 6], lookAt: [2.45, 0.9, 0], scale: 1.9 },
    marker: [2.55, 1.4, 0.05],
  },
  {
    id: 'art',
    shortLabel: 'Wall art',
    label: 'A different perspective',
    category: 'ON THE WALL',
    description:
      'An abstract landscape in sun-baked tones. Simple shapes and a warm wooden frame turn a quiet wall into a small everyday escape.',
    detail: 'Geometric study · Oak frame',
    focus: { position: [4, 4, 8], lookAt: [-1.15, 2.35, -2.7], scale: 1.65 },
    marker: [-0.65, 2.9, -2.5],
  },
];
export function getObject(id: ObjectId): RoomObject {
  const object = OBJECTS.find((item) => item.id === id);
  if (!object) throw new Error(`Unknown room object: ${id}`);
  return object;
}
