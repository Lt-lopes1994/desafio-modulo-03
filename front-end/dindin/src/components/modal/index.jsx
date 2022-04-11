import "./style.css";
import closeIcon from "../../assets/closeIcon.svg";

function Modal({ showModal, setShowModal }) {
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      {showModal && (
        <div className="containerModal">
          <div className="modal">
            <div className="modalHeader">
              <h2>Adicionar Registro</h2>
              <img src={closeIcon} alt="close" onClick={handleCloseModal} />
            </div>
            <div className="containerBtn">
              <button type="button" className="btnEntries">
                Entrada
              </button>
              <button type="button" className="btnExits">
                Saida
              </button>
            </div>

            <div className="containerForm">
              <form>
                <label>
                  Valor
                  <input type="text" />
                </label>

                <label for="category">
                  Categoria
                  <select id="pet-select">
                    <option value="">--Selecione--</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Assinaturas-e-Serviços">
                      Assinaturas e Serviços
                    </option>
                    <option value="Casa">Casa</option>
                    <option value="Mercado">Mercado</option>
                    <option value="Cuidados-Pessoais">Cuidados Pessoais</option>
                    <option value="Educação">Educação</option>
                    <option value="Família">Família</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Pets">Pets</option>
                    <option value="Presentes">Presentes</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Salário">Salário</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Outras-receitas">Outras receitas</option>
                    <option value="Outras-despesas">Outras despesas</option>
                  </select>
                </label>

                <label for="start">
                  Data
                  <input type="text" />
                </label>

                <label>
                  descrição
                  <input type="text" />
                </label>

                <button className="btnConfirm">Confirmar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
