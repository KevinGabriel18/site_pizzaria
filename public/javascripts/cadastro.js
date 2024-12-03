document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;
  const confirmarSenha = document.querySelector('#confirmar_senha').value;

  if (senha !== confirmarSenha) {
      alert('As senhas não conferem.');
      return;
  }

  try {
      const response = await fetch('/cadastrar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = '/login';
      } else {
          const error = await response.json();
          alert('Erro ao cadastrar: ' + error.message);
      }
  } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
  }
});
