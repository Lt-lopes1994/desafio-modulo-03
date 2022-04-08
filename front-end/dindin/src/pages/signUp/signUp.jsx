import "./style.css";
import Logo from "../../components/logo/";
import { useState } from "react";

function SignUp() {
  const [form, setForm] = useState([]);

  return (
    <div className="containerContent">
      <Logo />
      <div className="formContent">
        <form>
          <h2>Cadastre-se</h2>
          <label>
            Nome
            <input type="text" />
          </label>

          <label>
            E-mail
            <input type="text" />
          </label>

          <label>
            Senha
            <input type="password" />
          </label>

          <label>
            Confirmação de senha
            <input type="password" />
          </label>

          <div>
            <button className="btnRegister">Cadastrar</button>
          </div>
          <span>
            Já tem cadastro?<a href="https//google.com.br">Clique aqui</a>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
