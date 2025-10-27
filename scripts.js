const blocksContainer = document.getElementById("blocks");
const slots = document.querySelectorAll(".slot");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check");

// Ambil semua elemen block
let blocks = Array.from(document.querySelectorAll(".block"));
let draggedBlock = null;

// --- Fungsi untuk mengacak urutan blok ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// --- Acak urutan blok saat pertama kali halaman dimuat ---
shuffle(blocks);

// Hapus isi lama, lalu tambahkan hasil acakan ke container
blocks.forEach(block => {
  blocksContainer.appendChild(block);
});

// --- Event drag and drop ---
blocks.forEach(block => {
  block.addEventListener("dragstart", () => {
    draggedBlock = block;
    block.style.opacity = "0.5";
  });
  block.addEventListener("dragend", () => {
    draggedBlock.style.opacity = "1";
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

// --- Tombol periksa urutan ---
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
