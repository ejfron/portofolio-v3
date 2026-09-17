<template>
  <div class="not-found">
    <div>404</div>
    <div>|</div>
    <div>Not Found</div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
    font-size: 18px;
  font-weight: 800;
  color: var(--color-primary, #12b76a); /* green */
  background: var(--color-bg, #f6f7f9);
  text-align: center;
  line-height: 1.1;
  padding: 2rem;
  gap: 1rem;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(18, 183, 106, 0.1);
}

/* subtle glow behind the text (green) */
.not-found::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at 50% 40%, var(--color-primary, #12b76a) 0%, transparent 60%);
  opacity: 0.08;
}


</style>