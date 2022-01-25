import { tw } from '../utils';

const Header = props => {
  return (
    <h1
      class={tw(
        'text-center uppercase text-clrs-red',
        'mr-0 ml-0 mt-11 mb-11',
        'text-6xl font-thin',
      )}
    >
      {props.title}
    </h1>
  );
};

export { Header };
export default Header;
