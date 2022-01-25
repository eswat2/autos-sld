import { Show } from 'solid-js';

const DealerCard = props => {
  return (
    <div class="mb-4 flex flex-wrap content-center rounded-lg border border-solid border-blue-400 bg-blue-200 p-4">
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
        <label class="ml-auto self-center text-right text-sm">
          {props.dealer.dealerId}
        </label>
      </Show>
    </div>
  );
};

export { DealerCard };
export default DealerCard;
