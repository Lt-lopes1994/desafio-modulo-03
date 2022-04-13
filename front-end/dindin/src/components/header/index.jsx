import "./style.css";
import Logo from "../logo";
import ProfileIcon from "../../assets/profileIcon.svg";
import LogoutIcon from "../../assets/logout.svg";
import closeIcon from "../../assets/closeIcon.svg";

import { useEffect, useState } from "react";
import api from "../../services/api";

function Header({ handleLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [user, setUser] = useState({});

  function handleChangeForm(e) {
    setForm({ ...form, name: user.nome, email: user.email });
    setForm({
      ...form,
      name: user.nome,
      email: user.email,
      [e.target.name]: e.target.value,
    });
  }

  function handleCloseMenu() {
    setShowMenu(false);
    console.log(user);
    console.log(form);
  }

  useEffect(() => {
    userData();
  }, []); // eslint-disable-line

  async function userData() {
    try {
      //! Autorização. Função de autorização necessária pra validar o usuario.
      const response = await api.get("/usuario", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setUser(response.data);
    } catch (error) {
      alert(error.data);
    }
  }

  // async function updateUserData() {
  //   try {
  //     const response = await api.put("/usuario", form, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token", {})}`,
  //       },
  //     });

  //     alert("Usuário atualizado com sucesso!");
  //   } catch (error) {
  //     alert(error.data);
  //   }
  // }

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
    } catch (error) {
      alert(error.response.message);
    }
  }

  return (
    <header>
      <div className="headerBackground">
        <Logo />
        <div className="containerProfile">
          <img
            className="profileIcon"
            src={ProfileIcon}
            alt="profile"
            onClick={() => setShowMenu(true)}
          />

          <span className="userName">{user.nome}</span>

          <img
            className="logoutIcon"
            src={LogoutIcon}
            alt="logout"
            onClick={() => handleLogout()}
          />
        </div>
        {showMenu && (
          <div className="modalEditProfile">
            <div className="formEditProfile">
              <div className="formEditProfileHeader">
                <h2>Editar Perfil</h2>
                <img
                  className="closeIcon"
                  src={closeIcon}
                  alt="close"
                  onClick={handleCloseMenu}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <label>
                  Nome
                  <input
                    type="text"
                    name="name"
                    value={form.nome}
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

                <button className="btn btn-confirm">Confirmar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
