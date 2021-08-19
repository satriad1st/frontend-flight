import PropTypes from "prop-types";

function FunctionalModal(props) {
  function onClose() {
    props.onModalClose(props.contentSelected);
  }
  return (
    <div
      className={["functional-modal", "modal", "fade"].join(" ")}
      id="functionalModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="functionalModalLabel"
      aria-hidden="true"
    >
      <div
        className={[
          "functional-dialog",
          "modal-dialog",
          props.isLarge ? "modal-lg" : "",
          "modal-dialog-centered",
        ].join(" ")}
        role="document"
      >
        <div className="modal-content">
          <span className="modal-close-button">
            <img
            className="close mr-2 mt-2"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
            src="images/ic-close.png"
            style={{width:"20px"}} />
          </span>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

FunctionalModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  isLarge: PropTypes.bool.isRequired
};
export default FunctionalModal;
