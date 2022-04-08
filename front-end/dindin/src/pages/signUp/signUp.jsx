import "./style.css";
import Logo from "../../components/logo/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleChangeForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.password !== form.passwordConfirmation) {
        alert("As senhas não conferem");
        return;
      }

      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.passwordConfirmation
      ) {
        alert("Preencha todos os campos");
        return;
      }

      navigate("/main");
    } catch (error) {}
  }

  return (
    <div className="containerContent">
      <Logo />
      <div className="formContent">
        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <label>
            Nome
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => handleChangeForm(e)}
            />
          </label>

          <label>
            E-mail
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={(e) => handleChangeForm(e)}
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => handleChangeForm(e)}
            />
          </label>

          <label>
            Confirmação de senha
            <input
              type="password"
              name="passwordConfirmation"
              value={form.passwordConfirmation}
              onChange={(e) => handleChangeForm(e)}
            />
          </label>

          <div>
            <button className="btnRegister">Cadastrar</button>
          </div>
          <span>
            Já tem cadastro?<a href="/">Clique aqui</a>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
