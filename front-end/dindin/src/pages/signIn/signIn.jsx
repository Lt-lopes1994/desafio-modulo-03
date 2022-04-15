import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../components/logo/";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp(e) {
    e.preventDefault();

    navigate("/signUp");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos ou cadastre-se");
      return;
    }

    try {
      const response = await api.post("/login", {
        email: email,
        senha: password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/main");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="containerContentSignIn">
      <Logo />
      <div className="leftSigIn">
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

      <div className="rightSignIn">
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
            <button type="submit" className="btn enter-btn">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
