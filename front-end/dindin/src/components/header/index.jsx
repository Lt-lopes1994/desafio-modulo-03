import "./style.css";
import Logo from "../logo";
import ProfileIcon from "../../assets/profileIcon.svg";
import LogoutIcon from "../../assets/logout.svg";
import closeIcon from "../../assets/closeIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ handleLogout }) {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
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

  function handleCloseMenu() {
    setShowMenu(false);
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

                  <button className="btn btn-confirm">Confirmar</button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="userContainer">
          <span>Bruno</span>
        </div>
        <img
          className="logoutIcon"
          src={LogoutIcon}
          alt="logout"
          onClick={() => handleLogout()}
        />
      </div>
    </header>
  );
}

export default Header;
