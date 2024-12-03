document.querySelector('.formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const senha = document.querySelector('input[name="password"]').value;

  const button = document.querySelector('button[type="submit"]');
  button.disabled = true; // Desabilita o botão enquanto processa

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = data.redirectTo; // Redireciona para a rota correta
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } 
  
  
  catch (error) {
    alert('Erro ao fazer login: ' + error.message);
  } finally {
    button.disabled = false; // Reabilita o botão
  }
});
