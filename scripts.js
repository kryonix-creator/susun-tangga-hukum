document.addEventListener("DOMContentLoaded", () => {
  const slotsContainer = document.getElementById("slots");
  const blocksContainer = document.getElementById("blocks");
  const checkBtn = document.getElementById("check");
  const result = document.getElementById("result");

  const hierarki = [
    "UUD 1945",
    "Ketetapan MPR",
    "Undang-Undang / Perppu",
    "Peraturan Pemerintah",
    "Peraturan Presiden",
    "Peraturan Daerah Provinsi",
    "Peraturan Daerah Kabupaten/Kota"
  ];

  // buat slot
  hierarki.forEach(level => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.correct = level;
    slot.textContent = "Tempatkan di sini";
    slotsContainer.appendChild(slot);
  });

  // buat blok acak
  const shuffled = [...hierarki].sort(() => Math.random() - 0.5);
  shuffled.forEach(level => {
    const block = document.createElement("div");
    block.className = "block";
    block.textContent = level;
    blocksContainer.appendChild(block);
  });

  let selectedBlock = null;

  // event pilih blok
  document.querySelectorAll(".block").forEach(block => {
    block.addEventListener("click", () => {
      if (selectedBlock === block) {
        block.classList.remove("selected");
        selectedBlock = null;
      } else {
        document.querySelectorAll(".block").forEach(b => b.classList.remove("selected"));
        block.classList.add("selected");
        selectedBlock = block;
      }
    });
  });

  // event isi slot
  document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("click", () => {
      if (selectedBlock && slot.children.length === 0) {
        slot.textContent = "";
        slot.appendChild(selectedBlock);
        selectedBlock.classList.remove("selected");
        selectedBlock = null;
        slot.classList.add("filled");
      }
    });
  });

  // tombol periksa
  checkBtn.addEventListener("click", () => {
    const slots = document.querySelectorAll(".slot");
    let correct = 0;
    slots.forEach(slot => {
      if (slot.children.length > 0 && slot.children[0].textContent === slot.dataset.correct) {
        correct++;
      }
    });

    if (correct === hierarki.length) {
      result.textContent = "🎉 Hebat! Semua urutan benar! Tangga hukummu kokoh!";
      result.style.color = "green";
    } else {
      result.textContent = `Kamu menyusun ${correct} dari ${hierarki.length} dengan benar.`;
      result.style.color = "red";
    }
  });
});
