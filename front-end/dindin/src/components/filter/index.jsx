import "./style.css";
import FilterIcon from "../../assets/filterIcon.svg";
import SumIcon from "../../assets/sumIcon.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";

function Filter({ filter, handlePopupFilter }) {
  const [categories, setCategories] = useState([]);

  async function handleCategories() {
    const response = await api.get("/categoria");
    setCategories(response.data);
  }

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <div className="containerFilter">
      <div className="backgroundFilterIcon">
        <img
          className="filterIcon"
          src={FilterIcon}
          alt="Filter"
          onClick={handlePopupFilter}
        />
      </div>
      {filter && (
        <div className="filterContent">
          <div className="filterOptions">
            <h5>Categorias</h5>

            <div className="filterOptionsContent">
              {categories.map((category) => (
                <li key={category.id}>
                  {category.descricao} <img src={SumIcon} alt="Adicionar" />
                </li>
              ))}
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
      )}
    </div>
  );
}

export default Filter;
