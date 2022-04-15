import "./style.css";
import api from "../../services/api";

function ConfirmationPopup({
  showConfirmationPopup,
  setShowConfirmationPopup,
  id,
}) {
  async function handleDelete() {
    try {
      const response = await api.delete(`/transacoes/${id}`); // eslint-disable-line
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {showConfirmationPopup && (
        <div className="containerMainPopup">
          <span>Apagar Iten?</span>
          <div className="buttonsPopup">
            <button onClick={() => handleDelete()} className="btnYes">
              Sim
            </button>
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
