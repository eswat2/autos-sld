import { createStore } from 'solid-js';
import FetchQL from 'fetchql';
import { bag, DATA, PICK } from './bag';

// --------------------------------------------------------[ store ]

const storeDef = {
  loading: false,
  error: undefined,
  id: undefined,
  list: [],
  pick: 0,
  dealer: undefined,
};

const [state, setState] = createStore(storeDef);

// --------------------------------------------------------[ processing ]

// NOTE:  in Solid 2.0 a write isn't visible to reads of `state` until the
// next flush, so these helpers work on the setter's draft (`s`), where reads
// do see earlier writes, and each action makes all its changes in one draft.

const applyData = (s, next) => {
  if (next) {
    const { pick } = s;

    if (pick != undefined) {
      s.dealer = next.list[pick];
    } else {
      s.dealer = undefined;
    }

    s.id = next.id;
    s.list = next.list;
    s.loading = false;
  } else {
    s.id = undefined;
    s.list = [];
    s.loading = false;
  }
};

const applyPick = (s, next) => {
  if (s.list && next !== undefined && next < s.list.length) {
    s.pick = next;
    s.dealer = s.list[next];
  } else {
    s.pick = 0;
    s.dealer = undefined;
  }
};

const applyClear = (s, loading = false) => {
  s.loading = loading;
  s.error = undefined;
  s.id = undefined;
  s.list = [];
  s.pick = 0;
  s.dealer = undefined;
};

const processData = next => setState(s => applyData(s, next));

const processPick = next => setState(s => applyPick(s, next));

// --------------------------------------------------------[ graphQL ]

var Client = new FetchQL({
  url: 'https://gt-forza.vercel.app/graphql',
});

const GET_UUID = `
  query Uuid($count: Int!) {
    uuid(count: $count)
  }
`;
const GET_DEALERS = `
  query Solution($id: String!) {
    solution(id: $id) {
      id
      data {
        dealers {
          dealerId
          name
          vehicles {
            vin
            year
            make
            model
            color
          }
        }
      }
    }
  }
`;

// --------------------------------------------------------[ utility ]

const clearStore = (loading = false) => setState(s => applyClear(s, loading));

// --------------------------------------------------------[ actions ]

const initApp = () => {
  // this retrieves the last data we stored in the bag...
  const data = bag.get(DATA);
  const pick = bag.get(PICK);

  console.log('-- initApp', data, pick);

  if (data) {
    // clear, load and re-pick in one draft, so the pick sees the new list...
    setState(s => {
      applyClear(s);
      applyData(s, data);
      if (pick) {
        applyPick(s, pick);
      }
    });
  } else {
    refresh();
  }
};

const refresh = () => {
  clearStore(true);

  bag.store(PICK, 0);

  const count = 1;

  // NOTE:  step 1 - fetch a UUID...
  Client.query({
    operationName: 'Uuid',
    query: GET_UUID,
    variables: { count },
  }).then(response => {
    const id = response.data.uuid[0];

    // NOTE:  step 2 - fetch a solution with this id...
    Client.query({
      operationName: 'Solution',
      query: GET_DEALERS,
      variables: { id },
    }).then(response => {
      const list = JSON.parse(
        JSON.stringify(response.data.solution.data.dealers),
      );
      const solution = { id, list };

      bag.store(DATA, solution);

      processData(solution);
    });
  });
};

const updatePick = pick => {
  bag.store(PICK, pick);

  processPick(pick);
};

const actions = {
  initApp,
  refresh,
  updatePick,
};

export { state, actions };
export default state;
