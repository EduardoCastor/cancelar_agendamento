const form = document.getElementById('formCancelamento');
const statusBox = document.getElementById('status');

const WEBHOOK_URL = 'https://n8n.srv1352561.hstgr.cloud/webhook/cancelar';

// Permitir apenas números
const protocoloInput = document.getElementById('protocolo');
protocoloInput.addEventListener('input', () => {
  protocoloInput.value = protocoloInput.value.replace(/[^0-9]/g, '');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const protocolo = protocoloInput.value;

  if (!protocolo) {
    alert('Informe o protocolo');
    return;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ protocolo })
    });

    if (!response.ok) throw new Error();

    statusBox.style.display = 'block';
    statusBox.innerHTML = '✅ Cancelamento realizado com sucesso';

    form.reset();

  } catch (error) {
    statusBox.style.display = 'block';
    statusBox.innerHTML = '❌ O Agendamento já foi cancelado';
  }
});
