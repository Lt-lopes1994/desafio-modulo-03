import "./style.css";
import FilterIcon from "../../assets/filterIcon.svg";
import SumIcon from "../../assets/sumIcon.svg";

function Filter() {
  return (
    <div className="containerFilter">
      <div className="backgroundFilterIcon">
        <img className="filterIcon" src={FilterIcon} alt="Filter" />
      </div>

      <div className="filterContent">
        <div className="filterOptions">
          <h5>Categorias</h5>

          <div className="filterOptionsContent">
            <li>
              Contas <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Depósito <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Contas <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Lazer <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Mercado <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              TED <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Compras <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Farmárcia <img src={SumIcon} alt="Adicionar" />
            </li>
            <li>
              Pix <img src={SumIcon} alt="Adicionar" />
            </li>
          </div>
        </div>

        <div className="filterButtons">
          <div>
            <button className="btnClean">Limpar Filtros</button>
          </div>
          <div>
            <button className="btnAply">Aplicar Filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
