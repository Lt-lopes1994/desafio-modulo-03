import "./style.css";
import Header from "../../components/header";
import Filter from "../../components/filter";
import Modal from "../../components/modal";
import ConfirmationPopup from "../../components/confirmationPopup";

import ArrowFilter from "../../assets/arrowFilterIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Main() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [modalName, setModalName] = useState("");
  const [transactions, setTransactions] = useState([]);

  function handleEditModal(e) {
    setShowModal(true);
    setModalName(e.target.name);
  }

  function handleDeletePopup(e) {
    setShowConfirmationPopup(true);
  }

  function handlePopupFilter() {
    filter ? setFilter(false) : setFilter(true);
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      alert(error);
    }
  }

  async function handleLogout() {
    localStorage.removeItem("token");

    try {
      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div className="containerMain">
      <header>
        <Header handleLogout={handleLogout} />
      </header>
      <div className="containerBody">
        <div className="filter">
          <Filter filter={filter} handlePopupFilter={handlePopupFilter} />
        </div>
        <div className="table">
          <div className="left">
            <div className="tableDetails">
              <h3>
                Data <img src={ArrowFilter} alt="filtro" />
              </h3>
              <h3>Dia da semana</h3>
              <h3>Descrição</h3>
              <h3>Categoria</h3>
              <h3>Valor</h3>
            </div>

            <div className="userDetails">
              <span>14/04/2022</span>
              <span>quinta</span>
              <span>Venda de doces</span>
              <span>pix</span>
              <span
              // style={{
              //   color: `${transaction.tipo} = entrada ? #7B61FF : #FA8C10 `,
              // }}
              >
                R$200,00
              </span>
              <div className="icons">
                <img
                  name="Editar Registro"
                  onClick={(e) => handleEditModal(e)}
                  src={EditIcon}
                  alt="Editar"
                />
                <img
                  onClick={(e) => handleDeletePopup(e)}
                  src={DeleteIcon}
                  alt="Deletar"
                />
                <ConfirmationPopup
                  showConfirmationPopup={showConfirmationPopup}
                  setShowConfirmationPopup={setShowConfirmationPopup}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
            {/* {transactions.map((transaction) => (
              <div className="userDetails">
                <span>{transaction.data}</span>
                <span>{transaction.data}</span>
                <span>{transaction.descricao}</span>
                <span>{transaction.categoria_nome}</span>
                <span
                  style={{
                    color: `${transaction.tipo} = entrada ? #7B61FF : #FA8C10 `,
                  }}
                >
                  {transaction.valor}
                </span>
                <div className="icons">
                  <img
                    name="Editar Registro"
                    onClick={(e) => handleEditModal(e)}
                    src={EditIcon}
                    alt="Editar"
                  />
                  <img src={DeleteIcon} alt="Deletar" />
                </div>
              </div>
            ))} */}
          </div>

          <div className="right">
            <div className="resume">
              <h2>Resumo </h2>
              <div className="financialEntries">
                <div className="entries">
                  <span>Entradas</span>
                  <span className="entriesValues">{}</span>
                </div>

                <div className="exits">
                  <span>Saídas</span>
                  <span className="exitValues">R$100</span>
                </div>

                <div className="horizontalLine"></div>

                <div className="balance">
                  <span>Saldo</span>
                  <span className="balanceValues">R$200</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              name="Adicionar Registro"
              onClick={(e) => handleEditModal(e)}
              className="btn btn-add"
            >
              Adicionar registro
            </button>
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalName={modalName}
        setModalName={setModalName}
      />
    </div>
  );
}

export default Main;
