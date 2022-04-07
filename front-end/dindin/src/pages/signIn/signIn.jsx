import "./style.css";
import Logo from "../../components/logo/";

function SignIn() {
  return (
    <div className="containerContent">
      <Logo />
      <div className="left">
        <div className="leftContent">
          <h1>
            Controle suas <strong>finanças</strong>, sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>
        </div>
        <div>
          <button className="btn register-btn">Cadastrar-se</button>
        </div>
      </div>

      <div className="right">
        <h2>Login</h2>
        <form className="signInForm">
          <label>
            E-mail
            <input type="text" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
          <div>
            <button className="btn enter-btn">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
