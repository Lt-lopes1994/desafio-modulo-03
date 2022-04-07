import "./style.css";
import Header from "../../components/header";

//todo Necessário inserir modal no botão de adicionar registro com um formulário.

//todo icones de editar trasanções e de deletar as mesmas devem ser inseridos no final  de cada coluna. O botão de excluir deve receber um popup de confirmação da exclusão.

function Main() {
  return (
    <div className="containerMain">
      <header>
        <Header />
      </header>
    </div>
  );
}

export default Main;
