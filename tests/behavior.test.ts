import { describe, expect, it } from 'vitest';
import { OBJECTS, ROOM_VIEW } from '../src/config/objects';
import { approach, boundedDelta } from '../src/lib/motion';
import {
  cameraTarget,
  initialSelection,
  selectionReducer,
} from '../src/state/selection';

describe('room exploration', () => {
  it('selects, replaces, repeats and resets the focused object', () => {
    const sofa = selectionReducer(initialSelection, {
      type: 'select',
      id: 'sofa',
    });
    expect(cameraTarget(sofa)).toEqual(OBJECTS[0]?.focus);
    expect(selectionReducer(sofa, { type: 'select', id: 'sofa' })).toBe(sofa);
    const plant = selectionReducer(sofa, { type: 'select', id: 'plant' });
    expect(plant.selected).toBe('plant');
    const reset = selectionReducer(plant, { type: 'reset' });
    expect(reset.selected).toBeNull();
    expect(cameraTarget(reset)).toEqual(ROOM_VIEW);
    expect(selectionReducer(reset, { type: 'reset' })).toEqual(
      initialSelection,
    );
  });
  it('provides complete unique metadata and usable camera targets for every object', () => {
    expect(new Set(OBJECTS.map((o) => o.id)).size).toBe(6);
    for (const object of OBJECTS) {
      expect(object.label.length).toBeGreaterThan(5);
      expect(object.description.length).toBeGreaterThan(60);
      expect(object.detail).toBeTruthy();
      expect(object.focus.scale).toBeGreaterThan(1);
      expect(object.focus.position).not.toEqual(object.focus.lookAt);
      for (const value of [
        ...object.focus.position,
        ...object.focus.lookAt,
        ...object.marker,
      ])
        expect(Number.isFinite(value)).toBe(true);
    }
  });
});
describe('camera transitions', () => {
  it('converges without overshoot and remains stable under interruption', () => {
    let position = 0;
    for (let i = 0; i < 15; i++) position = approach(position, 10, 1 / 60);
    expect(position).toBeGreaterThan(0);
    expect(position).toBeLessThan(10);
    const interrupted = position;
    position = approach(position, -5, 1 / 60);
    expect(position).toBeLessThan(interrupted);
    expect(position).toBeGreaterThan(-5);
    for (let i = 0; i < 200; i++) position = approach(position, -5, 1 / 60);
    expect(position).toBeCloseTo(-5, 4);
    expect(approach(position, -5, 1 / 60)).toBe(-5);
  });
  it('is consistent across normal refresh rates', () => {
    let a = 0;
    let b = 0;
    for (let i = 0; i < 60; i++) a = approach(a, 10, 1 / 60);
    for (let i = 0; i < 120; i++) b = approach(b, 10, 1 / 120);
    expect(a).toBeCloseTo(b, 8);
  });
  it('bounds pauses and invalid deltas, and respects reduced motion', () => {
    expect(approach(0, 10, 100)).toBe(approach(0, 10, 1 / 30));
    expect(boundedDelta(-1)).toBe(0);
    expect(boundedDelta(NaN)).toBe(0);
    expect(approach(0, 10, 0, true)).toBe(10);
    expect(approach(3, 10, 0)).toBe(3);
  });
});
