import "./spinner.css";

const Spinner = () => {
  return (
    <div id="trnt">
      <div className="trnt_turntable">
        <div className="trnt_floor"></div>
        <div className="trnt_arm"></div>
        <div className="trnt_vinyl">
          <div className="trnt_wheel trnt_wheel-1"></div>
          <div className="trnt_wheel trnt_wheel-2"></div>
          <div className="trnt_wheel trnt_wheel-3"></div>
          <div className="trnt_cover"></div>
          <div className="trnt_middle"></div>
          <div className="trnt_hole"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
