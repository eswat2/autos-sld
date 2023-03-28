import { tw } from '../utils';

const Header = props => {
  return (
    <h1
      class={tw(
        'text-center uppercase text-clrs-red',
        'mb-11 ml-0 mr-0 mt-11',
        'text-6xl font-thin',
      )}
    >
      {props.title}
    </h1>
  );
};

export { Header };
export default Header;
