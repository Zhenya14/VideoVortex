
(() => {
  'use strict';

  const root = document.documentElement;
  const ua = navigator.userAgent || '';

  const memory = navigator.deviceMemory;
  const enoughRAM =
    typeof memory !== 'number' || memory >= 4;

  const supportsBlur =
    typeof CSS !== 'undefined' &&
    (
      CSS.supports('backdrop-filter', 'blur(10px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
    );

  const enabled = enoughRAM && supportsBlur;

  root.classList.toggle('no-liquid-glass', !enabled);

  console.table({
    Android: androidMatch?.[1] ?? 'не визначено',
    iOS: iosMatch?.[1] ?? 'не визначено',
    RAM: memory ?? 'невідомо',
    supportedOS,
    enoughRAM,
    supportsBlur,
    enabled
  });
})();
