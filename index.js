const display = document.getElementById("display");
const un = document.querySelector("#un");
un.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "1";
  calculerAutomatiquement();
});
const deux = document.querySelector("#deux");
deux.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "2";
  calculerAutomatiquement();
});
const trois = document.querySelector("#trois");
trois.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "3";
  calculerAutomatiquement();
});
const quatre = document.querySelector("#quatre");
quatre.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "4";
  calculerAutomatiquement();
});
const cinq = document.querySelector("#cinq");
cinq.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "5";
  calculerAutomatiquement();
});
const six = document.querySelector("#six");
six.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "6";
  calculerAutomatiquement();
});
const sept = document.querySelector("#sept");
sept.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "7";
  calculerAutomatiquement();
});
const huit = document.querySelector("#huit");
huit.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "8";
  calculerAutomatiquement();
});
const neuf = document.querySelector("#neuf");
neuf.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "9";
  calculerAutomatiquement();
});
const zero = document.querySelector("#zero");
zero.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "0";
  calculerAutomatiquement();
});

const plus = document.querySelector("#plus");
plus.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "+";
  calculerAutomatiquement();
});
const moins = document.querySelector("#moins");
moins.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "-";
  calculerAutomatiquement();
});
const fois = document.querySelector("#fois");
fois.addEventListener("click", () => {
  document.getElementById("display").innerHTML += " × ";
  calculerAutomatiquement();
});
const diviser = document.querySelector("#diviser");
diviser.addEventListener("click", () => {
  document.getElementById("display").innerHTML += " ÷ ";
  calculerAutomatiquement();
});
const modulo = document.querySelector("#modulo");
modulo.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "%";
  calculerAutomatiquement();
});

let compeurTableParenthese = 0;
const moin_un = document.querySelector("#moin_un");
moin_un.addEventListener("click", () => {
  document.getElementById("display").innerHTML += "(-";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
});
const tableauParenthese = [")", "("];
const parenthese = document.querySelector("#parenthese");
parenthese.addEventListener("click", () => {
  compeurTableParenthese =
    (compeurTableParenthese + 1) % tableauParenthese.length;
  document.getElementById("display").innerHTML +=
    tableauParenthese[compeurTableParenthese];
  calculerAutomatiquement();
});

const resultat = document.getElementById("resultat");

// =========================================
// GESTION DE L'HISTORIQUE
// =========================================

// Récupère ou initialise l'array historique depuis le localStorage
function obtenirHistorique() {
  const historique = localStorage.getItem("calculatrice_historique");
  return historique ? JSON.parse(historique) : [];
}

// Sauvegarde l'historique dans le localStorage
function sauvegarderHistorique(historique) {
  localStorage.setItem("calculatrice_historique", JSON.stringify(historique));
}

// Ajoute une entrée à l'historique
function ajouterAuHistorique(expression, resultValue) {
  const historique = obtenirHistorique();
  const dateActuelle = new Date();

  // Format : jj/mm à hh:mm
  const options = { month: "2-digit", day: "2-digit" };
  const dateFormatee = dateActuelle.toLocaleDateString("fr-FR", options);
  const heureFormatee = dateActuelle.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateComplete = `${dateFormatee} à ${heureFormatee}`;

  // Créer l'objet historique
  const entree = {
    calcul: `${expression}=${resultValue}`,
    date: dateComplete,
    timestamp: dateActuelle.getTime(),
  };

  // Ajouter à l'historique
  historique.unshift(entree); // Ajoute au début (plus récent)

  // Limiter à 50 entrées maximum
  if (historique.length > 50) {
    historique.pop();
  }

  sauvegarderHistorique(historique);
  afficherHistorique();
}

// Affiche l'historique sur la page
function afficherHistorique() {
  const historique = obtenirHistorique();
  const historyContainer = document.getElementById("history-container");

  if (!historyContainer) {
    console.log("Conteneur historique non trouvé dans le HTML");
    return;
  }

  historyContainer.innerHTML = "";

  if (historique.length === 0) {
    historyContainer.innerHTML =
      "<div style='padding: 10px; color: #999;'>Aucun historique</div>";
    return;
  }

  historique.forEach((entree) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <a href="./index.html">
        <div class="history-calcul">${entree.calcul}</div>
        <div class="history-date">${entree.date}</div>
      </a>
    `;
    div.style.cssText = `
      padding: 10px;
      margin: 5px 0;
      background: #f0f0f0;
      border-radius: 5px;
      cursor: pointer;
      border-left: 3px solid #0066cc;
    `;

    div.addEventListener("click", () => {
      const calcul = entree.calcul.split("=")[0];
      display.innerHTML = calcul;
      calculerAutomatiquement();
    });

    historyContainer.appendChild(div);
  });
}

// Vider l'historique
function viderHistorique() {
  if (confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ?")) {
    localStorage.removeItem("calculatrice_historique");
    afficherHistorique();
  }
}

function calculerAutomatiquement() {
  const display = document.getElementById("display");
  let expression = display.innerHTML.trim();

  expression = expression.replace(/ × /g, "*");
  expression = expression.replace(/ ÷ /g, "/");
  expression = expression.replace(/−/g, "-");
  expression = expression.replace(/\^/g, "**");
  expression = expression.replace(/tan/g, "Math.tan");
  expression = expression.replace(/cos/g, "Math.cos");
  expression = expression.replace(/sin/g, "Math.sin");
  expression = expression.replace(/ln/g, "Math.log");
  expression = expression.replace(/log/g, "Math.log10");
  expression = expression.replace(/e/g, "Math.E");
  expression = expression.replace(/π/g, "Math.PI");
  expression = expression.replace(/sqrt/g, "Math.sqrt");
  expression = expression.replace(/\|x\|/g, "Math.abs(x)");
  expression = expression.replace(/x!/g, "factorial(x)");
  if (expression === "" || /[+\-*/%]$/.test(expression)) {
    resultat.innerHTML = "Complète l'expression";
    resultat.style.opacity = "30%";
  } else {
    try {
      const resultate = eval(expression);
      if (
        resultate === Infinity ||
        resultate === -Infinity ||
        isNaN(resultate)
      ) {
        resultat.innerHTML = "Math error";
      } else {
        resultat.style.opacity = "100%";
        resultat.innerHTML = resultate;
      }
    } catch (error) {
      resultat.innerHTML = "Math error";
    }
  }
  updateSupprimer();
}

const egal = document.querySelector("#egal");
egal.addEventListener("click", () => {
  const display = document.getElementById("display");
  const expression = display.innerHTML.trim();
  const result = resultat.innerHTML;

  // Ajouter au historique si le résultat est valide
  if (
    result &&
    result !== "Math error" &&
    result !== "Complète l'expression" &&
    result !== ""
  ) {
    ajouterAuHistorique(expression, result);
  }

  display.innerHTML = resultat.innerHTML;
  resultat.innerHTML = "";
  const resultat_afficher = document.getElementById("resultat_afficher");
  const date = document.getElementById("date");
  const dateActuel = new Date();
  const options = { month: "numeric", day: "numeric" };
  const formattedDate = dateActuel.toLocaleDateString("fr-FR", options);
  date.innerHTML = formattedDate;
  resultat_afficher.innerHTML = display.innerHTML;
});

const virgule = document.querySelector("#virgule");
virgule.addEventListener("click", () => {
  document.getElementById("display").innerHTML += ".";
  calculerAutomatiquement();
});
const effacer = document.querySelector("#effacer");
effacer.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML = "";
  resultat.innerHTML = "";
  updateSupprimer();
});

const carre = document.querySelector("#carre");
carre.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "^2";
  calculerAutomatiquement();
  updateSupprimer();
});
const puissance_x = document.querySelector("#puissance_x");
puissance_x.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "^";
  calculerAutomatiquement();
  updateSupprimer();
});
const racine_carree = document.querySelector("#racine_carree");
racine_carree.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "^0.5";
  calculerAutomatiquement();
  updateSupprimer();
});
const inverse = document.querySelector("#inverse");
inverse.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "^-1";
  calculerAutomatiquement();
  updateSupprimer();
});

const tangente = document.querySelector("#tangente");
tangente.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "tan(";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
  updateSupprimer();
});
const cosinus = document.querySelector("#cosinus");
cosinus.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "cos(";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
  updateSupprimer();
});

const sinus = document.querySelector("#sinus");
sinus.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "sin(";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
  updateSupprimer();
});

const ln = document.querySelector("#ln");
ln.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "ln(";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
  updateSupprimer();
});

const log = document.querySelector("#log");
log.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "log(";
  compeurTableParenthese = 1;
  calculerAutomatiquement();
  updateSupprimer();
});

const nombre_euler = document.querySelector("#nombre_euler");
nombre_euler.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "e";
  calculerAutomatiquement();
  updateSupprimer();
});

const exponentielle = document.querySelector("#exponentielle");
exponentielle.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "e^";
  calculerAutomatiquement();
  updateSupprimer();
});

const valeur_absolue = document.querySelector("#valeur_absolue");
valeur_absolue.addEventListener("click",()=>{
  const display=document.getElementById("display");
  display.innerHTML+="|";
  calculerAutomatiquement;
  updateSupprimer;
});
const radians = document.querySelector("#radians");
radians.title="Permet de basculer entre les modes degrés et radians pour les fonctions trigonométriques.";
const tablauAngle=["deg","Rad"];
let compteurAngle=0;
radians.addEventListener("click", () => {
  const angle=document.querySelector("#angle");
  compteurAngle=(compteurAngle+1)%tablauAngle.length;
  angle.innerHTML=tablauAngle[compteurAngle];
  // const display = document.getElementById("display");
  // display.innerHTML += "Rad(";
  // compeurTableParenthese = 1;
  // calculerAutomatiquement();
  updateSupprimer();
});


const pi = document.querySelector("#pi");
pi.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML += "π";
  calculerAutomatiquement();
  updateSupprimer();
});

const suivant = document.querySelector("#suivant");

const historyToggle = document.querySelector("#history-toggle");
const straighten = document.querySelector("#straighten");
const calculateMulti = document.querySelector("#calculate_multi");

// Gestion du toggle historique
if (historyToggle) {
  historyToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const historyPanel = document.getElementById("history-panel");
    if (historyPanel) {
      historyPanel.style.display =
        historyPanel.style.display === "none" ? "block" : "none";
    }
  });
}

const supprimer = document.querySelector("#supprimer");
function updateSupprimer() {
  const display = document.getElementById("display");
  if (display && display.textContent.trim() !== "") {
    supprimer.classList.remove("delete");
    supprimer.classList.add("operation");
  } else {
    supprimer.classList.add("delete");
    supprimer.classList.remove("operation");
  }
}

updateSupprimer();

supprimer.addEventListener("click", () => {
  const display = document.getElementById("display");
  display.innerHTML = display.innerHTML.slice(0, -1);
  calculerAutomatiquement();
  updateSupprimer();
});

console.log(display.innerHTML);

const cursor = document.getElementById("cursor");
document.addEventListener("keydown", () => {
  cursor.style.display = "none";
  setTimeout(() => (cursor.style.display = "inline-block"), 500);
});

const Changement = [
  {
    sinus: "sin",
    cosinus: "cos",
    tangente: "tan",
    ln: "ln",
    exponentielle: "e<sup>x</sup>",
    valeur_absolue: "|x|",
    log: "log",
    carre: "x<sup>2</sup>",
    pi: "π",
    racine_carree: "&#8730;",
    inverse: "1/x",
    puissance_x: "x<sup>y</sup>",
    nombre_euler: "e",
  },
  {
    sinus: "sin<sup>-1</sup>",
    cosinus: "cos<sup>-1</sup>",
    tangente: "tan<sup>-1</sup>",
    ln: "sinh",
    exponentielle: "sinh<sup>-1</sup>",
    valeur_absolue: "2<sup>x</sup>",
    log: "cosh",
    carre: "cosh<sup>-1</sup>",
    pi: "x<sup>3</sup>",
    racine_carree: "<sup>3</sup>&#8730;",
    inverse: "tanh",
    puissance_x: "tanh<sup>-1</sup>",
    nombre_euler: "x!",
  },
];

let compteurChangement = 0;

function fonctionChangement() {
  const index = Changement[compteurChangement];
  sinus.innerHTML = index.sinus;
  sinus.classList.add("w-stretch");
  cosinus.innerHTML = index.cosinus;
  tangente.innerHTML = index.tangente;
  ln.innerHTML = index.ln;
  exponentielle.innerHTML = index.exponentielle;
  exponentielle.classList.add("w-stretch");
  valeur_absolue.innerHTML = index.valeur_absolue;
  log.innerHTML = index.log;
  carre.innerHTML = index.carre;
  pi.innerHTML = index.pi;
  racine_carree.innerHTML = index.racine_carree;
  inverse.innerHTML = index.inverse;
  puissance_x.innerHTML = index.puissance_x;
  nombre_euler.innerHTML = index.nombre_euler;
}

const tableaudirection = ["&larr;","&rarr;"];
let index=0;
suivant.addEventListener("click", () => {
  compteurChangement = (compteurChangement + 1) % Changement.length;
  index=(index+1)%tableaudirection.length;
  suivant.innerHTML = tableaudirection[index];
  suivant.title="suivant";
  fonctionChangement();
});

fonctionChangement();

// =========================================
// INITIALISATION DE L'HISTORIQUE
// =========================================
afficherHistorique();
