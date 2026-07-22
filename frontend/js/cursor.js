// cursor.js - Only activates on desktop devices
document.addEventListener('DOMContentLoaded', function() {
  // Check if device is mobile (touch-enabled or small screen)
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                  'ontouchstart' in window ||
                  navigator.maxTouchPoints > 0;

  // Exit if mobile
  if (isMobile) {
    console.log('Custom cursor disabled on mobile');
    return; // Stops execution
  }

  // --- DESKTOP-ONLY CURSOR CODE BELOW ---
  const dot = document.createElement('div');
  dot.className = 'follower-dot';
  dot.id = 'cursor-dot';
  
  const ring = document.createElement('div');
  ring.className = 'follower-ring';
  ring.id = 'cursor-ring';
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Cursor logic (same as before)
  const mouse = { x: 0, y: 0 };
  const dotPos = { x: 0, y: 0 };
  const ringPos = { x: 0, y: 0 };
  
  const DOT_SMOOTHNESS = 0.2;
  const RING_SMOOTHNESS = 0.1;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function animate() {
    dotPos.x = lerp(dotPos.x, mouse.x, DOT_SMOOTHNESS);
    dotPos.y = lerp(dotPos.y, mouse.y, DOT_SMOOTHNESS);
    ringPos.x = lerp(ringPos.x, mouse.x, RING_SMOOTHNESS);
    ringPos.y = lerp(ringPos.y, mouse.y, RING_SMOOTHNESS);

    dot.style.left = `${dotPos.x}px`;
    dot.style.top = `${dotPos.y}px`;
    ring.style.left = `${ringPos.x}px`;
    ring.style.top = `${ringPos.y}px`;

    requestAnimationFrame(animate);
  }

  animate();
});