import { Show } from 'solid-js';
import { DealerCard, VehicleList } from '.';
import { state } from '../utils';

const DealerView = props => {
  return (
    <Show when={!state.loading} fallback={''}>
      <div class="flex flex-col">
        <Show when={state.dealer} fallback={''}>
          <DealerCard dealer={state.dealer} />
        </Show>
        <Show when={state.dealer && state.dealer.vehicles} fallback={''}>
          <VehicleList list={state.dealer.vehicles} />
        </Show>
      </div>
    </Show>
  );
};

export { DealerView };
export default DealerView;
