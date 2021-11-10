import { Show } from 'solid-js';

const DealerCard = props => {
  return (
    <div class="flex flex-wrap content-center bg-blue-200 rounded-lg p-4 mb-4 border border-solid border-blue-400">
      <Show when={props.dealer && props.dealer.name} fallback={''}>
        <label class="text-xl font-bold">
          {props.dealer.name}
          <Show
            when={props.dealer.vehicles && props.dealer.vehicles.length > 0}
            fallback={''}
          >
            <sup>{` ${props.dealer.vehicles.length}`}</sup>
          </Show>
        </label>
      </Show>
      <Show when={props.dealer.dealerId} fallback={''}>
        <label class="text-sm text-right ml-auto self-center">
          {props.dealer.dealerId}
        </label>
      </Show>
    </div>
  );
};

export { DealerCard };
export default DealerCard;
