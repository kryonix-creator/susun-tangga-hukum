document.addEventListener("DOMContentLoaded", () => {
  const blocksContainer = document.getElementById("blocks");
  const slots = document.querySelectorAll(".slot");
  const result = document.getElementById("result");
  const checkBtn = document.getElementById("check");

  // Safety checks — tampilkan pesan ke console jika elemen tidak ada
  if (!blocksContainer) {
    console.error("Element #blocks tidak ditemukan. Pastikan index.html memiliki <div id=\"blocks\">.");
    return;
  }
  if (!checkBtn) {
    console.error("Element #check tidak ditemukan. Pastikan ada button dengan id=\"check\".");
    return;
  }

  let draggedBlock = null;
  let blocks = Array.from(document.querySelectorAll(".block"));

  // Fungsi acak (Fisher–Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Jika tidak ada block sama sekali, beri tahu dan hentikan
  if (blocks.length === 0) {
    console.warn("Tidak ditemukan elemen dengan class .block — pastikan ada elemen blok di HTML.");
  } else {
    shuffle(blocks);
    blocks.forEach(block => blocksContainer.appendChild(block));
  }

  // Drag & drop handlers
  blocks.forEach(block => {
    block.addEventListener("dragstart", () => {
      draggedBlock = block;
      block.style.opacity = "0.5";
    });
    block.addEventListener("dragend", () => {
      if (draggedBlock) draggedBlock.style.opacity = "1";
      draggedBlock = null;
    });
  });

  // Slots — jika tidak ada slot, beri peringatan
  if (slots.length === 0) {
    console.warn("Tidak ditemukan elemen .slot. Pastikan ada slot untuk men-drop blok.");
  }

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", () => {
      if (!draggedBlock) return;
      if (slot.children.length === 0) {
        slot.appendChild(draggedBlock);
      }
    });
  });

  // Tombol periksa urutan
  checkBtn.addEventListener("click", () => {
    let correct = 0;
    slots.forEach(slot => {
      if (slot.children.length > 0 && slot.children[0].textContent.trim() === slot.dataset.correct) {
        correct++;
      }
    });

    if (correct === slots.length && slots.length > 0) {
      result.textContent = "🎉 Hebat! Semua urutan benar! Tangga hukummu kokoh! 🇮🇩";
      result.style.color = "green";
    } else {
      result.textContent = `Kamu menyusun ${correct} dari ${slots.length} dengan benar. Coba lagi!`;
      result.style.color = "red";
    }
  });
});
