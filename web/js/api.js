const API_URL = "http://localhost:3000";


async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, { method: "DELETE" });
  return res.json();
}
