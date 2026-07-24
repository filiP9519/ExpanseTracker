//TIP With Search Everywhere, you can find any action, file, or symbol in your project. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/>, type in <b>terminal</b>, and press <shortcut actionId="EditorEnter"/>. Then run <shortcut raw="npm run dev"/> in the terminal and click the link in its output to open the app in the browser.

document.getElementById('investment-form').addEventListener(
    'submit', async (e) => {
    e.preventDefault(); //stops refresh of website

    const formData = {
      stock_name: document.querySelector('input[id="name"]').value,
      stock_price_atm: document.querySelector('input[id="price"]').value,
      stock_amount: document.querySelector('input[id="size"]').value,
    };

    await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Saved!');
  });
const btnCloseForm = document.getElementById('close-form');
const btnShowForm = document.getElementById('form-button');
const formOverlay = document.getElementById('import-form-overlay');
const btnImportStock = document.getElementById('import-data');

btnShowForm.addEventListener('click',  ()=> {
  if (formOverlay.style.display === 'none') {
    formOverlay.style.display = 'flex';
  }
});

btnCloseForm.addEventListener('click',  ()=> {
    formOverlay.style.display = 'none';
})

btnImportStock.addEventListener('click', ()=> {

})

//TIP There's much more in WebStorm to help you be more productive. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/> and search for <b>Learn WebStorm</b> to open our learning hub with more things for you to try.