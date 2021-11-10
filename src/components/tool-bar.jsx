import { Show, For } from 'solid-js';
import { actions, state, tw } from '../utils';

const ToolBar = props => {
  return (
    <Show when={!state.loading} fallback={''}>
      <div class="flex">
        <div
          class="refresh md:w-auto hover:text-clrs-red"
          onClick={() => actions.refresh()}
        >
          <proto-ikon-loader name="refresh" size="24" />
        </div>
        <div
          class={tw(
            'inline-flex justify-end ml-auto',
            'border border-solid border-gray-600',
            'rounded-md',
          )}
        >
          <For each={state.list} fallback={''}>
            {(item, index) => (
              <button
                class={tw(
                  'border-none w-8 h-8 font-bold',
                  index() == 0
                    ? 'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none'
                    : index() == state.list.length - 1
                    ? 'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md'
                    : 'rounded-none',
                  state.pick == index()
                    ? 'text-white bg-clrs-red'
                    : 'text-clrs-navy bg-clrs-yellow',
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
