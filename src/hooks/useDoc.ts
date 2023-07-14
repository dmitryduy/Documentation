import { useMemo } from 'react';
import { useStores } from '@hooks/useStores';

export const useDoc = (code: string) => {
  const {settingsStore} = useStores();

  return useMemo(() => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    }
    *::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: #444444;
      border-radius: 2px;
    }

    *::-webkit-scrollbar-thumb {
      width: 4px;
      height: 4px;
      background-color:#686868;
      border-radius: 2px;
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: #a7a7a7;
    }
</style>
  </head>
  <div class="main"></div>
  <body>
    <script>
    const div = document.querySelector('.main');
    const prevConsole = console.log;
    console.log = function(...text) {
      const color = text[0];
     if (color === 'red' || color === 'green' || color=== 'tomato') {
       div.innerHTML+= \`<div style="font-size: 22px;color:\${color}">\${text.slice(1).reduce((prev, elem) => \`\${prev} \${JSON.stringify(elem)}\`, '')}</div>\`;
     } else {
     div.innerHTML+= \`<div style="font-size: 22px;color:${settingsStore.theme === 'dark'? 'white': 'black'}">\${text.reduce((prev, elem) => \`\${prev} \${JSON.stringify(elem)}\`, '')}</div>\`;
     }   
    }
    try{
    ${code}
    }catch(e) {
      console.log('tomato', e.message);
    } finally{
    console.log = prevConsole;
    }
    </script>
  </body>
</html>`, [code, settingsStore.theme]);
};