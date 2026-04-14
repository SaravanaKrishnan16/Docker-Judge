import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      shortcuts.forEach(({ keys, action, preventDefault = true }) => {
        const [modifier, ...keySequence] = keys.split('+');
        const targetKey = keySequence.join('+') || modifier;

        let modifierMatch = true;
        if (modifier === 'ctrl' && !ctrl) modifierMatch = false;
        if (modifier === 'shift' && !shift) modifierMatch = false;
        if (modifier === 'alt' && !alt) modifierMatch = false;

        if (modifierMatch && key === targetKey.toLowerCase()) {
          if (preventDefault) {
            event.preventDefault();
          }
          action(event);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;