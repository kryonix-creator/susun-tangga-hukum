document.addEventListener("DOMContentLoaded", () => {
  const blocksContainer = document.getElementById("blocks");
  const slots = document.querySelectorAll(".slot");
  const checkBtn = document.getElementById("check");
  const resetBtn = document.getElementById("reset");
  const result = document.getElementById("result");

  let draggedBlock = null;
  let blocks = Array.from(document.querySelectorAll(".block"));

  // Fungsi acak urutan blok
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Tampilkan blok acak
  function randomizeBlocks() {
    shuffle(blocks);
    blocks.forEach(block => blocksContainer.appendChild(block));
  }

  randomizeBlocks();

  // Drag and drop event
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
      if (slot.children.length === 0 && draggedBlock) {
        slot.appendChild(draggedBlock);
      }
    });
  });

  // Tombol Periksa Urutan
  checkBtn.addEventListener("click", () => {
    let correct = 0;
    slots.forEach(slot => {
      if (slot.children.length > 0) {
        if (slot.children[0].textContent.trim() === slot.dataset.correct) {
          correct++;
          slot.classList.add("correct");
          slot.classList.remove("wrong");
        } else {
          slot.classList.add("wrong");
          slot.classList.remove("correct");
        }
      }
    });

    if (correct === slots.length) {
      result.textContent = "🎉 Hebat! Semua urutan benar! Tangga hukummu kokoh!";
      result.style.color = "green";
    } else {
      result.textContent = `Kamu menyusun ${correct} dari ${slots.length} dengan benar.`;
      result.style.color = "red";
    }
  });

  // Tombol Acak Ulang
  resetBtn.addEventListener("click", () => {
    slots.forEach(slot => {
      slot.innerHTML = slot.dataset.correct.includes("Tingkat") ? "Tempatkan di sini" : slot.textContent;
      slot.classList.remove("correct", "wrong");
    });
    randomizeBlocks();
    result.textContent = "";
  });
});
