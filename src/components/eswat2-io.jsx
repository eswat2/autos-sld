const url = 'https://eswat2.dev';
const who = 'eswat2';

const Eswat2Io = props => {
  return (
    <a
      class="absolute top-0 right-0 mt-6 mr-6 text-clrs-gray hover:text-clrs-navy"
      href={url}
      aria-label={who}
      title={who}
    >
      <proto-ikon-loader name="fingerprint" size="24" label="eswat2" />
    </a>
  );
};

export { Eswat2Io };
export default Eswat2Io;
