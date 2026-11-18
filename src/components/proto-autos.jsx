import { onSettled, Show } from 'solid-js';
import { Eswat2Io, Header, ToolBar, Footer, DealerView, SolidBadge } from '.';
import { Spinner } from '../icons';
import { actions, state, tw } from '../utils';

const ProtoAutos = props => {
  onSettled(() => {
    actions.initApp();
  });

  return (
    <main id="app" class="ds1-main">
      <SolidBadge offset="1.5rem" />
      <Eswat2Io />
      <Header title="Auto SLD" />
      <ToolBar />
      <Show when={!state.loading} fallback={<Spinner />}>
        <hr
          class={tw(
            'mb-4 ml-0 mr-0 mt-4',
            'border-solid border-gray-300',
            'border-b-0 border-l-0 border-r-0',
          )}
        />
      </Show>
      <DealerView />
      <Footer />
    </main>
  );
};

export { ProtoAutos };
export default ProtoAutos;
