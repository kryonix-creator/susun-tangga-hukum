document.addEventListener("DOMContentLoaded", () => {
  const blocksContainer = document.getElementById("blocks");
  const slots = document.querySelectorAll(".slot");
  const result = document.getElementById("result");
  const checkBtn = document.getElementById("check");

  let draggedBlock = null;
  let blocks = Array.from(document.querySelectorAll(".block"));

  // --- Fungsi acak urutan ---
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // --- Acak blok lalu tampilkan ---
  shuffle(blocks);
  blocks.forEach(block => blocksContainer.appendChild(block));

  // --- Event drag-drop ---
  blocks.forEach(block => {
    block.addEventListener("dragstart", () => {
      draggedBlock = block;
      block.style.opacity = "0.5";
    });
    block.addEventListener("dragend", () => {
      block.style.opacity = "1";
      draggedBlock = null;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", () => {
      if (slot.children.length === 0) {
        slot.appendChild(draggedBlock);
      }
    });
  });

  // --- Tombol periksa ---
  checkBtn.addEventListener("click", () => {
    let correct = 0;
    slots.forEach(slot => {
      if (slot.children.length > 0 && slot.children[0].textContent === slot.dataset.correct) {
        correct++;
      }
    });

    if (correct === 7) {
      result.textContent = "🎉 Hebat! Semua urutan benar! Tangga hukummu kokoh! 🇮🇩";
      result.style.color = "green";
    } else {
      result.textContent = `Kamu menyusun ${correct} dari 7 dengan benar. Coba lagi!`;
      result.style.color = "red";
    }
  });
});
