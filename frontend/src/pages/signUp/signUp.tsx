import { useState } from 'react';
import { Api } from '../../services';
import { router } from '../../router';

export function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const api = new Api();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await api.signUp(name, email, password);
      router.navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <div className="box">
        <div className="header">
          <h1>Criar conta</h1>
          <p>Digite suas informações para criar conta.</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp} disabled={loading}>
            {loading ? 'Registrando...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
}
