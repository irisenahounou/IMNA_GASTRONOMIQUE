// --- Validation du formulaire de contact ---
function showError(id, msg) {
    document.getElementById(id).textContent = msg || '';
}

function validateEmail(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let ok = true;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value;
        const message = form.message.value.trim();

        if (name.length < 2) {
            ok = false;
            showError('nameError', 'Veuillez saisir au moins 2 caractères.');
        } else showError('nameError', '');

        if (!validateEmail(email)) {
            ok = false;
            showError('emailError', 'Veuillez saisir un email valide.');
        } else showError('emailError', '');

        if (!subject) {
            ok = false;
            showError('subjectError', 'Veuillez choisir un sujet.');
        } else showError('subjectError', '');

        if (message.length < 10) {
            ok = false;
            showError('messageError', 'Votre message doit contenir au moins 10 caractères.');
        } else showError('messageError', '');

        if (ok) {
            document.getElementById('successBox').style.display = 'block';
            form.reset();
            setTimeout(() => {
                document.getElementById('successBox').style.display = 'none';
            }, 4000);
        }
    });
}

// --- Recherche et filtre des recettes ---
const initRecipeSearch = DATA => {
    const grid = document.getElementById('recipesGrid');
    const search = document.getElementById('search');
    const filter = document.getElementById('filter');

    function render(recipes) {
        grid.innerHTML = '';
        if (recipes.length === 0) {
            grid.innerHTML = '<p>Aucune recette trouvée.</p>';
            return;
        }
        recipes.forEach(r => {
            const el = document.createElement('article');
            el.className = 'card';
            el.innerHTML =
        <img src="DOSSIER%20IMAGES/COUSCOUS" alt="PLAT DE COUSCOUS"/>
        <div className="content">
          <h3>PLAT DE COUSCOUS TRADITIONNEL</h3>
          <p>CECI EST UN PLAT DE COUSCOUS TRADITIONNEL</p>
          <span className="badge">${r.category}</span>
          <div style="margin-top:10px;">
            <a className="btn" href="recette.html?id=${r.id}">Voir la recette</a>
          </div>
        </div>;
            grid.appendChild(el);
        });
    }

    function apply() {
        const q = search.value.toLowerCase().trim();
        const c = filter.value;
        const out = DATA.filter(r => {
            const matchText = r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
            const matchCat = c ? (r.category === c || r.tags.includes(c)) : true;
            return matchText && matchCat;
        });
        render(out);
    }

    search.addEventListener('input', apply);
    filter.addEventListener('change', apply);
    render(DATA);
}
// --- AFFICHAGE RECETTE PAR ID ---
function showRecipe(DATA) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const recipe = DATA[id];
    recipe.ingredients = undefined;
    const main = document.querySelector("main");

    if (recipe) {
        main.innerHTML = `\n      <h1>${recipe.title}</h1>\n      <img src="${recipe.img}" alt="${recipe.title}" class="recipe-img">\n      <h2>Ingrédients</h2>\n      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>\n      <h2>Étapes</h2>\n      <ol>${recipe.ingredients.map(s => `<li>${s}</li>`).join("")}</ol>\n      <h2>Détails</h2>\n      <p><strong>Temps :</strong> ${recipe.time}</p>\n      <p><strong>Difficulté :</strong> ${recipe.params}</p>\n      <p><strong>Catégorie :</strong> ${recipe.category}</p>\n    `;
    } else {
        main.innerHTML = "<p>Recette introuvable.</p>";
    }
}