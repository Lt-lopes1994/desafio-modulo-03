import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Preencha todos os campos ou cadastre-se");
        return;
      }

      navigate("/main");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function handleSignUp(e) {
    e.preventDefault();

    console.log("aqui");

    navigate("/signUp");
  }
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
          <button onClick={handleSignUp} className="btn register-btn">
            Cadastrar-se
          </button>
        </div>
      </div>

      <div className="right">
        <h2>Login</h2>
        <form className="signInForm" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              name="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha
            <input
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
