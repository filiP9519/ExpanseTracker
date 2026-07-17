//TIP With Search Everywhere, you can find any action, file, or symbol in your project. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/>, type in <b>terminal</b>, and press <shortcut actionId="EditorEnter"/>. Then run <shortcut raw="npm run dev"/> in the terminal and click the link in its output to open the app in the browser.

const btnShowForm = document.getElementById('form-button');
const formOverlay = document.getElementById('import-form-overlay');
const btnImportStock = document.getElementById('import-import-stock');

btnShowForm.addEventListener('click',  ()=> {
  if (formOverlay.style.display === 'none') {
    formOverlay.style.display = 'flex';
  }
});

btnImportStock.addEventListener('click', ()=> {
  
})
//TIP There's much more in WebStorm to help you be more productive. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/> and search for <b>Learn WebStorm</b> to open our learning hub with more things for you to try.
