const Mix = ({ mix }) => {
  return (
    <div className="col-md-12">
      <div className="row">
        <iframe
          title="mix"
          width="100%"
          height="120"
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(
            mix
          )}`}
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default Mix;
