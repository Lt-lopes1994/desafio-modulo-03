import "./style.css";
import Header from "../../components/header";
import Filter from "../../components/filter";
import ArrowFilter from "../../assets/arrowFilterIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);

  function handlePopup() {
    filter ? setFilter(false) : setFilter(true);
  }

  async function handleLogout() {
    // localStorage.removeItem("token");

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
          <Filter filter={filter} handlePopup={handlePopup} />
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
              <span>07/04/2022</span>
              <span>Quinta</span>
              <span>Venda de doces</span>
              <span>Pix</span>
              <span>R$100</span>
              <div className="icons">
                <img src={EditIcon} alt="Editar" />
                <img src={DeleteIcon} alt="Deletar" />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="resume">
              <h2>Resumo </h2>
              <div className="financialEntries">
                <div className="entries">
                  <span>Entradas</span>
                  <span className="entriesValues">R$100</span>
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

            <button className="btn btn-add">Adicionar registro</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
