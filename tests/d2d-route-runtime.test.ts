import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ROUTE_DEVIATION_METERS,
  buildStreetSweepOrder,
  distanceToPolylineMeters,
  findNextUnworkedIndex,
  isAutoRouteEligible,
  orientStopsForLocation,
  reorderRemainingFromLocation,
  routeProgressBreakdown,
} from '../src/utils/d2dRouteRuntime.js';

const stops = [
  { id: '1', lat: 49.0000, lng: -123.0000, status: 'unvisited' },
  { id: '2', lat: 49.0002, lng: -123.0000, status: 'unvisited' },
  { id: '3', lat: 49.0004, lng: -123.0000, status: 'unvisited' },
  { id: '4', lat: 49.0006, lng: -123.0000, status: 'unvisited' },
  { id: '5', lat: 49.0008, lng: -123.0000, status: 'unvisited' },
];

test('auto street route threshold is exactly five eligible stops', () => {
  assert.equal(isAutoRouteEligible(4), false);
  assert.equal(isAutoRouteEligible(5), true);
  assert.equal(isAutoRouteEligible(6), true);
});

test('missing street-side geometry falls back to odd/even civic-address sweep', () => {
  const unordered = [
    { id: '104', address: '104 Main St', lat: 0, lng: 0 },
    { id: '101', address: '101 Main St', lat: 0, lng: 0 },
    { id: '103', address: '103 Main St', lat: 0, lng: 0 },
    { id: '102', address: '102 Main St', lat: 0, lng: 0 },
  ];
  const swept = buildStreetSweepOrder(unordered);
  assert.deepEqual(swept.map((stop) => stop.id), ['101', '103', '104', '102']);
});

test('route starts from the endpoint closest to live GPS while preserving the street sweep', () => {
  const nearLast = { lat: 49.00081, lng: -123.0000 };
  const ordered = orientStopsForLocation(stops, nearLast);
  assert.deepEqual(ordered.map((stop) => stop.id), ['5', '4', '3', '2', '1']);
  assert.deepEqual(stops.map((stop) => stop.id), ['1', '2', '3', '4', '5']);
});

test('worked progress is separate from completed paid jobs', () => {
  const metrics = routeProgressBreakdown([
    { id: 'a', lat: 0, lng: 0, status: 'unvisited' },
    { id: 'b', lat: 0, lng: 0, status: 'visited' },
    { id: 'c', lat: 0, lng: 0, status: 'interested' },
    { id: 'd', lat: 0, lng: 0, status: 'needs-quote' },
    { id: 'e', lat: 0, lng: 0, status: 'not-interested' },
    { id: 'f', lat: 0, lng: 0, status: 'completed' },
  ]);

  assert.equal(metrics.total, 6);
  assert.equal(metrics.worked, 5);
  assert.equal(metrics.unvisited, 1);
  assert.equal(metrics.interested, 1);
  assert.equal(metrics.quotes, 1);
  assert.equal(metrics.notInterested, 1);
  assert.equal(metrics.completedJobs, 1);
  assert.equal(Math.round(metrics.workedRate), 83);
});

test('next-stop logic skips worked and explicitly skipped houses', () => {
  const route = [
    { id: 'a', lat: 0, lng: 0, status: 'visited' },
    { id: 'b', lat: 0, lng: 0, status: 'unvisited' },
    { id: 'c', lat: 0, lng: 0, status: 'unvisited' },
  ];
  assert.equal(findNextUnworkedIndex(route, 0), 1);
  assert.equal(findNextUnworkedIndex(route, 0, {}, ['b']), 2);
  assert.equal(findNextUnworkedIndex(route, 0, { c: 'interested' }, ['b']), -1);
});

test('reroute from current GPS chooses the nearest remaining stop first', () => {
  const route = [
    { id: 'far', lat: 49.0100, lng: -123.0000 },
    { id: 'near', lat: 49.0001, lng: -123.0000 },
    { id: 'middle', lat: 49.0050, lng: -123.0000 },
  ];
  const rerouted = reorderRemainingFromLocation(route, { lat: 49.0000, lng: -123.0000 });
  assert.equal(rerouted[0].id, 'near');
  assert.deepEqual(new Set(rerouted.map((stop) => stop.id)), new Set(['near', 'middle', 'far']));
});

test('route deviation detects when GPS is meaningfully off the planned line', () => {
  const path = [
    { lat: 49.0000, lng: -123.0000 },
    { lat: 49.0100, lng: -123.0000 },
  ];
  const near = distanceToPolylineMeters({ lat: 49.0050, lng: -123.0001 }, path);
  const far = distanceToPolylineMeters({ lat: 49.0050, lng: -123.0020 }, path);
  assert.ok(near < ROUTE_DEVIATION_METERS);
  assert.ok(far > ROUTE_DEVIATION_METERS);
});
