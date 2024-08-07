export function Ripple(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  let ripple = document.createElement("span");
  ripple.classList.add("ripple", "rippleElement");
  e.currentTarget.appendChild(ripple);
  const rectData = e.currentTarget.getBoundingClientRect();
  let x = e.clientX - rectData.left;
  let y = e.clientY - rectData.top;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  setTimeout(() => ripple.remove(), 300);
}

export const RippleCss = `
.ripple span.rippleElement {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
  
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
  
    animation: ripple 1s;
    opacity: 0;
  }
  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }
  
    to {
      opacity: 0;
      transform: scale(10);
    }
}`;
