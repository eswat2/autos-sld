import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// The store is a module singleton. Each test imports a fresh copy of Solid and
// the app (after vi.resetModules), so no state leaks between tests. A leak
// once hid a stale-read bug: the "stale" list was the previous test's data.
let flush;

const DATA = 'autos-sld-data';
const PICK = 'autos-sld-pick';

const vehicle = (vin, make, year = 2015) => ({
  vin,
  year,
  make,
  model: 'Model',
  color: 'Red',
});
const dealer = (dealerId, name, vehicles) => ({ dealerId, name, vehicles });

const LIST_A = [
  dealer(1, 'Alpha Motors', [vehicle('A1', 'Audi'), vehicle('A2', 'BMW')]),
  dealer(2, 'Beta Autos', [vehicle('B1', 'Ford')]),
  dealer(3, 'Gamma Cars', [
    vehicle('C1', 'Honda'),
    vehicle('C2', 'Kia'),
    vehicle('C3', 'Mazda'),
  ]),
];
const LIST_B = [
  dealer(9, 'Delta Dealers', [vehicle('D1', 'Tesla')]),
  dealer(8, 'Echo Emporium', [vehicle('E1', 'Volvo'), vehicle('E2', 'Fiat')]),
];

// The app asks the GraphQL API for a uuid, then for that solution's dealers.
const stubApi = (id, list) => {
  const fetch = vi.fn(async (_url, options) => {
    const { operationName } = JSON.parse(options.body);
    const data =
      operationName === 'Uuid'
        ? { uuid: [id] }
        : { solution: { id, data: { dealers: list } } };
    return new Response(JSON.stringify({ data }), {
      headers: { 'content-type': 'application/json' },
    });
  });
  vi.stubGlobal('fetch', fetch);
  return fetch;
};

let div;
let dispose;

const settle = async () => {
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 0));
    flush();
  }
};

beforeEach(() => {
  vi.resetModules();
});

const mount = async () => {
  const solid = await import('solid-js');
  const { render } = await import('@solidjs/web');
  const { default: App } = await import('./App');
  flush = solid.flush;

  div = document.createElement('div');
  document.body.appendChild(div);
  dispose = render(App, div);
  await settle();
};

const pickButtons = () => [...div.querySelectorAll('button')];
const picked = () =>
  pickButtons()
    .map((b, indx) => (b.className.includes('bg-clrs-red') ? indx : -1))
    .filter(indx => indx >= 0);
const dealerName = () =>
  div.querySelector('label.text-xl')?.firstChild?.textContent;
const vehicleCount = () =>
  div.querySelectorAll('proto-ikon-loader.ikon').length;
const click = el => {
  expect(el).toBeTruthy();
  el.click();
  flush();
};

afterEach(() => {
  dispose?.();
  div?.remove();
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('fetches dealers on first load and shows the first one', async () => {
    const fetch = stubApi('id-a', LIST_A);
    await mount();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(pickButtons().map(b => b.textContent)).toEqual(['1', '2', '3']);
    expect(picked()).toEqual([0]);
    expect(dealerName()).toBe('Alpha Motors');
    expect(vehicleCount()).toBe(2);
    expect(JSON.parse(localStorage.getItem(DATA)).id).toBe('id-a');
  });

  it('restores the saved dealers and the saved pick', async () => {
    const fetch = stubApi('unused', []);
    localStorage.setItem(DATA, JSON.stringify({ id: 'id-a', list: LIST_A }));
    localStorage.setItem(PICK, JSON.stringify(2));
    await mount();

    expect(fetch).not.toHaveBeenCalled();
    expect(picked()).toEqual([2]);
    expect(dealerName()).toBe('Gamma Cars');
    expect(vehicleCount()).toBe(3);
  });

  it('picking a dealer shows it and saves the pick', async () => {
    stubApi('unused', []);
    localStorage.setItem(DATA, JSON.stringify({ id: 'id-a', list: LIST_A }));
    await mount();

    click(pickButtons()[1]);
    expect(picked()).toEqual([1]);
    expect(dealerName()).toBe('Beta Autos');
    expect(vehicleCount()).toBe(1);
    expect(localStorage.getItem(PICK)).toBe('1');
  });

  it('refresh loads new dealers and starts from the first', async () => {
    stubApi('id-b', LIST_B);
    localStorage.setItem(DATA, JSON.stringify({ id: 'id-a', list: LIST_A }));
    localStorage.setItem(PICK, JSON.stringify(2));
    await mount();
    expect(dealerName()).toBe('Gamma Cars');

    click(div.querySelector('.refresh'));
    await settle();

    expect(pickButtons().map(b => b.textContent)).toEqual(['1', '2']);
    expect(picked()).toEqual([0]);
    expect(dealerName()).toBe('Delta Dealers');
    expect(localStorage.getItem(PICK)).toBe('0');
    expect(JSON.parse(localStorage.getItem(DATA)).id).toBe('id-b');
  });

  it('shows the Solid 2.0 badge', async () => {
    stubApi('unused', []);
    localStorage.setItem(DATA, JSON.stringify({ id: 'id-a', list: LIST_A }));
    await mount();
    const badge = div.querySelector('a.solid-badge');
    expect(badge?.textContent).toBe('2.0');
    expect(badge?.getAttribute('href')).toBe('https://www.solidjs.com');
    expect(badge?.getAttribute('aria-label')).toBe('Built with Solid 2.0');
  });
});
