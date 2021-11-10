import { Show, For } from 'solid-js';
import { VehicleCard } from '.';

const VehicleList = props => {
  return (
    <Show when={props.list && props.list.length > 0} fallback={''}>
      <div class="flex flex-col">
        <For each={props.list} fallback={''}>
          {item => <VehicleCard value={item} />}
        </For>
      </div>
    </Show>
  );
};

export { VehicleList };
export default VehicleList;
