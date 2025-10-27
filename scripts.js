const blocks = document.querySelectorAll(".block");
const slots = document.querySelectorAll(".slot");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check");

let draggedBlock = null;

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

checkBtn.addEventListener("click", () => {
  let correct = 0;
  slots.forEach(slot => {
    if (slot.children.length > 0 && slot.children[0].textContent === slot.dataset.correct) {
      correct++;
    }
  });
  result.textContent = `Kamu menyusun ${correct} dari 7 dengan benar!`;
});
