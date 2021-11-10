import { createMutable } from 'solid-js/store';
import FetchQL from 'fetchql';
import { bag, DATA, PICK } from './bag';

// --------------------------------------------------------[ mutable store ]

const storeDef = {
  loading: false,
  error: undefined,
  id: undefined,
  list: [],
  pick: 0,
  dealer: undefined,
};

const state = createMutable(storeDef);

// --------------------------------------------------------[ processing ]

const processData = next => {
  if (next) {
    const { pick } = state;

    if (pick != undefined) {
      state.dealer = next.list[pick];
    } else {
      state.dealer = undefined;
    }

    state.id = next.id;
    state.list = next.list;
    state.loading = false;
  } else {
    state.id = undefined;
    state.list = [];
    state.loading = false;
  }
};

const processPick = next => {
  if (state.list && next !== undefined && next < state.list.length) {
    state.pick = next;
    state.dealer = state.list[next];
  } else {
    state.pick = 0;
    state.dealer = undefined;
  }
};

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

const clearStore = (loading = false) => {
  state.loading = loading;
  state.error = undefined;
  state.id = undefined;
  state.list = [];
  state.pick = 0;
  state.dealer = undefined;
};

// --------------------------------------------------------[ actions ]

const initApp = () => {
  clearStore();
  // this retrieves the last data we stored in the bag...
  const data = bag.get(DATA);
  const pick = bag.get(PICK);

  console.log('-- initApp', data, pick);

  if (data) {
    processData(data);
    if (pick) {
      processPick(pick);
    }
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
