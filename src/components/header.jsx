import { tw } from '../utils';

const Header = props => {
  return (
    <h1
      class={tw(
        'uppercase text-center text-clrs-red',
        'mr-0 ml-0 mt-11 mb-11',
        'font-thin text-6xl',
      )}
    >
      {props.title}
    </h1>
  );
};

export { Header };
export default Header;
