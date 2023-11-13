import { tw } from '../utils';

const dict = {
  'citroën': 'citroen',
  'renault-sport': 'renault',
  'tesla-motors': 'tesla',
};

const racingRegex = /^\#[0-9]*/;

const isRacing = model => {
  return model.match(racingRegex) != null;
};

const isExotic = year => {
  return year === 2554;
};

const isModern = year => {
  return year > 2010;
};

const VehicleCard = props => {
  return (
    <div
      class={tw(
        'flex align-middle',
        'mb-1 rounded-lg p-4',
        'border border-solid',
        isExotic(props.value.year)
          ? 'border-clrs-navy bg-clrs-navy text-clrs-white'
          : isRacing(props.value.model)
            ? 'border-yellow-600 bg-yellow-300'
            : isModern(props.value.year)
              ? 'border-green-600 bg-green-200'
              : 'border-gray-600 bg-gray-300',
      )}
    >
      <div class="mr-1.5 flex flex-col">
        <label class="mb-2 text-xs">{props.value.vin}</label>
        <label class="text-lg font-bold">{props.value.make}</label>
        <label class="mb-2 text-sm italic">{props.value.model}</label>
        <label>
          {props.value.year}, {props.value.color}
        </label>
        <label>
          {isExotic(props.value.year)
            ? '- exotic... [ Sierra 117 ]'
            : isRacing(props.value.model)
              ? '- track only...'
              : ''}
        </label>
      </div>
      <proto-ikon-loader
        class="ikon ml-auto self-center"
        name={props.value.make}
        label={props.value.make.toLowerCase()}
      />
    </div>
  );
};

export { VehicleCard };
export default VehicleCard;
