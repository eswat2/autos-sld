import { onMount, Show } from 'solid-js';
import { Eswat2Io, ToolBar, DealerView } from '.';
import { actions, state, tw } from '../utils';

const TW_VERSION = '2.2.19';

const TwLabel = version => {
  return (
    <label class="ml-auto align-top text-xs italic text-clrs-slate4">
      Tailwind {version}
    </label>
  );
};

const Footer = () => {
  return <div class="flex flex-row mt-2 mb-4 mr-2">{TwLabel(TW_VERSION)}</div>;
};

const ProtoAutos = props => {
  onMount(async () => {
    actions.initApp();
  });

  return (
    <main id="app" class="ds1-main">
      <Eswat2Io />
      <h1
        class={tw(
          'uppercase text-center text-clrs-red',
          'mr-0 ml-0 mt-11 mb-11',
          'font-thin text-6xl',
        )}
      >
        Auto Dealers
      </h1>
      <ToolBar />
      <Show when={!state.loading} fallback={'...'}>
        <hr
          class={tw(
            'ml-0 mr-0 mt-4 mb-4',
            'border-solid border-gray-300',
            'border-r-0 border-b-0 border-l-0',
          )}
        />
      </Show>
      <DealerView />
      {Footer()}
    </main>
  );
};

export { ProtoAutos };
export default ProtoAutos;
