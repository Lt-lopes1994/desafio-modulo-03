import "./style.css";

function ConfirmationPopup({
  showConfirmationPopup,
  setShowConfirmationPopup,
}) {
  return (
    <>
      {showConfirmationPopup && (
        <div className="containerMainPopup">
          <span>Apagar Iten?</span>
          <div className="buttonsPopup">
            <button className="btnYes">Sim</button>
            <button
              type="button"
              onClick={() => setShowConfirmationPopup(false)}
              className="btnNo"
            >
              Não
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationPopup;
