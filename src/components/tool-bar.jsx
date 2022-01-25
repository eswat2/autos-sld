import { Show, For } from 'solid-js';
import { actions, state, tw } from '../utils';

const ToolBar = props => {
  return (
    <Show when={!state.loading} fallback={''}>
      <div class="flex">
        <div
          class="refresh hover:text-clrs-red md:w-auto"
          onClick={() => actions.refresh()}
        >
          <proto-ikon-loader name="refresh" size="24" />
        </div>
        <div
          class={tw(
            'ml-auto inline-flex justify-end',
            'border border-solid border-gray-600',
            'rounded-md',
          )}
        >
          <For each={state.list} fallback={''}>
            {(item, index) => (
              <button
                class={tw(
                  'h-8 w-8 border-none font-bold',
                  index() == 0
                    ? 'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none'
                    : index() == state.list.length - 1
                    ? 'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md'
                    : 'rounded-none',
                  state.pick == index()
                    ? 'bg-clrs-red text-white'
                    : 'bg-clrs-yellow text-clrs-navy',
                )}
                onClick={() => actions.updatePick(index())}
                title={`${item.name} (${item.vehicles.length})`}
              >
                {index() + 1}
              </button>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

export { ToolBar };
export default ToolBar;
