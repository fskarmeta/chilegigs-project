import "./spinner.css";

const Spinner = () => {
  return (
    <div id="trnt">
      <div class="trnt_turntable">
        <div class="trnt_floor"></div>
        <div class="trnt_arm"></div>
        <div class="trnt_vinyl">
          <div class="trnt_wheel trnt_wheel-1"></div>
          <div class="trnt_wheel trnt_wheel-2"></div>
          <div class="trnt_wheel trnt_wheel-3"></div>
          <div class="trnt_cover"></div>
          <div class="trnt_middle"></div>
          <div class="trnt_hole"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
