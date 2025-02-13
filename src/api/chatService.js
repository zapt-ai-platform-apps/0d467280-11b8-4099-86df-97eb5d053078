export default async function sendChatbotMessage(message) {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje: message }),
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del API');
  }
  return response.json();
}