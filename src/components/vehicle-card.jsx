import './vehicle-card.css';
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
        'rounded-lg p-4 mb-1',
        'border border-solid',
        isExotic(props.value.year)
          ? 'bg-clrs-navy border-clrs-navy text-clrs-white'
          : isRacing(props.value.model)
          ? 'bg-yellow-300 border-yellow-600'
          : isModern(props.value.year)
          ? 'bg-green-200 border-green-600'
          : 'bg-gray-300 border-gray-600',
      )}
    >
      <div class="flex flex-col mr-1.5">
        <label class="text-xs mb-2">{props.value.vin}</label>
        <label class="text-lg font-bold">{props.value.make}</label>
        <label class="text-sm italic mb-2">{props.value.model}</label>
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
