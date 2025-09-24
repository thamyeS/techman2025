const list = document.getElementById("equipments-list");
const modalDelete = document.getElementById("modal-delete");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");
const newEquipmentBtn = document.getElementById("new-equipment-btn");
const modalNew = document.getElementById("modal-new-equipment");
const saveEquipment = document.getElementById("save-equipment");
const cancelNewEquipment = document.getElementById("cancel-new-equipment");

const modalNovoComentario = document.getElementById("modal-novo-comentario");
const salvarComentario = document.getElementById("salvar-comentario");
const cancelarComentario = document.getElementById("cancelar-comentario");
const comentarioTexto = document.getElementById("comentario-texto");
let equipamentoIdSelecionado = null;
let deleteId = null;

fetch("http://localhost:3000/equipamentos")
  .then(r => r.json())
  .then(equipamentos => {
    list.innerHTML = "";
    equipamentos.forEach(eq => {
      const card = document.createElement("div");
      card.className = "equipamento-card";
      card.innerHTML = `
        <img src="/assets/${eq.imagemUrl}" alt="${eq.nome}">
        <h3>${eq.nome}</h3>
        <p>${eq.descricao}</p>
        <button class="btn-comentar" data-id="${eq.id}">Comentar</button>
        <button class="btn-excluir" data-id="${eq.id}">Excluir</button>
      `;
      list.appendChild(card);
    });

    document.querySelectorAll(".btn-comentar").forEach(btn => {
      btn.addEventListener("click", () => {
        equipamentoIdSelecionado = btn.getAttribute("data-id");
        comentarioTexto.value = "";
        modalNovoComentario.classList.remove("hidden");
      });
    });


    document.querySelectorAll(".btn-excluir").forEach(btn => {
      btn.addEventListener("click", () => {
        deleteId = btn.getAttribute("data-id");
        modalDelete.classList.add("show");
      });
    });
  });

cancelarComentario.addEventListener("click", () => {
  modalNovoComentario.classList.add("hidden");
});

document.querySelectorAll(".btn-excluir").forEach(btn => {
  btn.addEventListener("click", () => {
    deleteId = btn.getAttribute("data-id");
    modalDelete.classList.remove("hidden"); 
  });
});

cancelDelete.addEventListener("click", () => {
  modalDelete.classList.add("hidden");
});

salvarComentario.addEventListener("click", async () => {
    const texto = comentarioTexto.value.trim();
    if (!texto) return;
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  alert("Usuário não logado!");
  return;
}
await fetch("http://localhost:3000/comentarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    texto,
    usuarioId: usuario.id,
    equipamentoId: Number(equipamentoIdSelecionado)
  })
});
modalNovoComentario.classList.add("hidden");
window.location.reload();

});
cancelDelete.addEventListener("click", () => {
  modalDelete.classList.remove("show");
});

confirmDelete.addEventListener("click", async () => {
  if (deleteId) {
    await fetch(`http://localhost:3000/equipamentos/${deleteId}`, { method: "DELETE" });
    window.location.reload();
  }
  
});

if (newEquipmentBtn && modalNew && saveEquipment && cancelNewEquipment) {
  newEquipmentBtn.addEventListener("click", () => {
    modalNew.classList.remove("hidden");
  });

  cancelNewEquipment.addEventListener("click", () => {
    modalNew.classList.add("hidden");
  });

  saveEquipment.addEventListener("click", async () => {
    const nome = document.getElementById("novo-nome").value.trim();
    const descricao = document.getElementById("novo-descricao").value.trim();
    const imagemUrl = document.getElementById("novo-imagem").value.trim();
    JSON.stringify({ nome, descricao, imagemUrl })
    if (!nome || !descricao || !imagemUrl) {
      alert("Preencha todos os campos!");
      return;
    }

    await fetch("http://localhost:3000/equipamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, imagemUrl })
    });

    modalNew.classList.add("hidden");
    window.location.reload();
  });
}

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });
}