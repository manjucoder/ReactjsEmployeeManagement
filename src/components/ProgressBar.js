export default function ProgressBar(props) {
  return (
    <>
      <div class="progress" style={{ height: "15px" }}>
        <div
          class="progress-bar progress-bar-striped bg-warning"
          role="progressbar"
          style={{ width: `${props.per}%` }}
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${props.per}%`}
        </div>
      </div>
    </>
  );
}
