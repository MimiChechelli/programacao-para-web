import { useState } from 'react';
import { Api } from '../../services';
import { router } from '../../router';
import { decodeToken } from 'react-jwt';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const api = new Api();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await api.login(email, password);
      const token = decodeToken<{ sub: string }>(result.data.token);
      window.localStorage.setItem('token', result.data.token);
      window.localStorage.setItem('user_id', `${token?.sub}`);
      router.navigate('/dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="box">
        <div className="header">
          <h1>Entrar</h1>
          <p>Digite suas credênciais para entrar.</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
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
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <button
          className="create-account"
          onClick={() => router.navigate('/sign-up')}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
