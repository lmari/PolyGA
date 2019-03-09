
var txt = {
  evolByStep: "Evoluzione: passo-passo", evolFast: "veloce",
  manExec1: "1. Individua", manExec2: "2. Seleziona", manExec3: "3. Aggiorna",
  toolManExec: "Gestisce manualmente l’evoluzione, in tre passi:<br>1. individua gli individui da eliminare;<br>2. elimina gli individui individuati;<br>3. genera nuovi individui.",
  autoExec1: "1. Attiva l’evoluzione", autoExec2: "2. Ferma l’evoluzione",
  toolAutoExec: "Attiva o ferma la evoluzione.",
  setup: "Configurazione:",
  numPts: "#geni", toolNumPts: "Numero di geni nel DNA (<i>numero di punti di controllo di ogni polinomio</i>).",
  numSrs: "#individui", toolNumSrs: "Numero di individui nella popolazione (<i>numero di polinomi nella popolazione</i>).<br>Nota che si assume che il numero di individui nella popolazione sia costante.",
  selection: "Selezione:",
  numDel: "#eliminati", toolNumDel: "Numero di individui eliminati nella selezione (<i>numero di polinomi eliminati</i>).<br>Può essere al massimo pari al numero di individui della popolazione meno uno, in modo da garantire comunque una continuità nella popolazione.",
  generation: "Generazione:",
  combin: "%crossing over", toolCombin: "Percentuale di crossing over (<i>percentuale di ricombinazione</i>).<br>E’ un valore tra 0 e 50 che descrive la probabilità che ogni gene di un figlio sia il gene di un genitore: 0 significa che non c’è crossing over, e quindi la riproduzione è asessuale; 50 significa che i geni dei figli sono presi metà da un genitore e metà dall’altro.",
  change: "%mutazioni", toolChange: "Percentuale di mutazioni (<i>percentuale di cambiamenti</i>).<br>E’ un valore tra 0 e 100 che descrive la probabilità che ogni gene subisca una mutazione.",
  chang2: "amp mutazioni", toolChang2: "Ampiezza delle mutazioni (<i>ampiezza dei cambiamenti</i>).<br>E’ un valore tra 0 e 100 che descrive quanto sono grandi numericamente le mutazioni, quando si verificano.",
  immigration: "Immigrazione:",
  numNew: "#nuovi individui", toolNumNew: "Numero di individui entrati nella popolazione per immigrazione (<i>numero di nuovi polinomi</i>).<br>Può essere al massimo pari al numero di individui della popolazione. Poiché che si assume che il numero di individui nella popolazione sia costante, ogni nuovo immigrato opera una selezione su un individuo preesistente della popolazione.",
  setAll: "Riconfigura il sistema", toolSetAll: "Riconfigura il sistema in accordo ai parametri scelti.",
  resetTarget: "Crea un nuovo obiettivo", toolResetTarget: "Crea un nuovo obiettivo casuale.",
  showParams: "Mostra i parametri", toolShowParams: "Mostra i parametri degli individui della popolazione.",
};

function setText(container, id) { $('#' + container).html(txt[id]); }
