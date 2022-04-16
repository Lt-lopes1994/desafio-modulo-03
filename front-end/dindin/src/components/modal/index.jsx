import "./style.css";
import closeIcon from "../../assets/closeIcon.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { format, formatISO } from "date-fns";

function Modal({ showModal, setShowModal, modalName, setModalName }) {
  const [buttonEntries, setButtonEntries] = useState(true);
  const [buttonExits, setButtonExits] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    tipo: "",
    valor: 0,
    categoria_id: 0,
    data: "",
    descricao: "",
  });

  function handleButtonEntries() {
    setButtonEntries(true);
    setButtonExits(false);
  }

  function handleButtonsExits() {
    setButtonExits(true);
    setButtonEntries(false);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleInfos(e) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCategories() {
    const response = await api.get("/categoria");
    setCategories(response.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = category;

    data.tipo = `${buttonEntries ? "entrada" : "saida"}`;
    data.valor = +data.valor;
    data.categoria_id = +data.categoria_id;
    data.data = formatISO(new Date(data.data));

    try {
      await api[`${modalName === "Adicionar Registro" ? "post" : "put"}`](
        `/transacao`,
        data
      );
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    handleCategories();
  }, [() => handleSubmit()]); //eslint-disable-line

  return (
    <>
      {showModal && (
        <div className="containerModal">
          <div className="modal">
            <div className="modalHeader">
              <h2>{modalName}</h2>
              <img src={closeIcon} alt="close" onClick={handleCloseModal} />
            </div>
            <div className="containerBtn">
              <button
                type="button"
                className={`btnEntries ${
                  buttonEntries ? "btnColorsBlue" : "btnFalse"
                }`}
                onClick={() => handleButtonEntries()}
              >
                Entrada
              </button>

              <button
                type="button"
                className={`btnExits ${
                  buttonExits ? "btnColorsRed" : "btnFalse"
                }`}
                onClick={() => handleButtonsExits()}
              >
                Saida
              </button>
            </div>

            <div className="containerForm">
              <form onSubmit={handleSubmit}>
                <label>
                  Valor
                  <input
                    type="text"
                    name="valor"
                    onChange={(e) => handleInfos(e)}
                  />
                </label>

                <label>
                  Categoria
                  <select
                    id="categories"
                    name="categoria_id"
                    onChange={(e) => handleInfos(e)}
                  >
                    <option value=""> ---Selecione uma categoria--- </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.descricao}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Data
                  <input
                    type="date"
                    name="data"
                    onChange={(e) => handleInfos(e)}
                  />
                </label>

                <label>
                  descrição
                  <input
                    type="text"
                    name="descricao"
                    onChange={(e) => handleInfos(e)}
                  />
                </label>

                <button type="submit" className="btnConfirm">
                  Confirmar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
