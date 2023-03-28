import { TW_VERSION } from '../utils';

const TwLabel = version => {
  return (
    <label class="ml-auto align-top text-xs italic text-clrs-slate4">
      Tailwind {version}
    </label>
  );
};

const Footer = props => {
  return <div class="mb-4 mr-2 mt-2 flex flex-row">{TwLabel(TW_VERSION)}</div>;
};

export { Footer };
export default Footer;
