import "./style.css";
import Logo from "../../components/logo/logo";

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
          <button className="btn register">Cadastrar-se</button>
        </div>
      </div>

      <div className="right">
        <h4>Login</h4>
        <form className="signInForm">
          <label>
            E-mail
            <input type="text" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
          <button className="btn enter">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
