import "./style.css";
import Header from "../../components/header";
import Filter from "../../components/filter";
import ArrowFilter from "../../assets/arrowFilterIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";

function Main() {
  return (
    <div className="containerMain">
      <header>
        <Header />
      </header>
      <div className="containerBody">
        <div className="filter">{/* <Filter /> */}</div>
        <div className="table">
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
      </div>
    </div>
  );
}

export default Main;
