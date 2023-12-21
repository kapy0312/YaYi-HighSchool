const wheel = document.getElementById('wheel');
const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spinButton');
let spinning = false;

function spinWheel() {
  if (!spinning) {

    // event.preventDefault();

    const randomDegree = Math.floor(Math.random() * 360) + 720; // Spin between 2 to 3 full rotations
    spinning = true;

    spinner.style.transform = `translateX(-50%) rotate(${randomDegree}deg)`;
    spinButton.disabled = true;

    setTimeout(() => {
      spinning = false;
      spinButton.disabled = false;
    }, 3000); // The duration should match the transition duration in CSS
  }
}