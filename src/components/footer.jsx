const TW_VERSION = '3.0.9';

const TwLabel = version => {
  return (
    <label class="ml-auto align-top text-xs italic text-clrs-slate4">
      Tailwind {version}
    </label>
  );
};

const Footer = props => {
  return <div class="flex flex-row mt-2 mb-4 mr-2">{TwLabel(TW_VERSION)}</div>;
};

export { Footer };
export default Footer;
