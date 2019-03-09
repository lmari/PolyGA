
var txt = {
  setup: "Configurazione",
  numPts: "#geni", toolNumPts: "Numero di geni nel DNA\n(=numero di punti di controllo di ogni polinomio).",
  numSrs: "#individui", toolNumSrs: "Numero di individui nella popolazione\n(=numero di polinomi nella popolazione).",
  selection: "Selezione",
  numDel: "#eliminati", toolNumDel: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati).",
  generation: "Generazione",
  combin: "%crossing over", toolCombin: "Percentuale di crossing over\n(=percentuale di ricombinazione).",
  change: "%mutazioni", toolChange: "Percentuale di mutazioni\n(=percentuale di cambiamenti).",
  chang2: "amp mutazioni", toolChang2: "Ampiezza delle mutazioni\n(=ampiezza dei cambiamenti).",
  numNew: "#nuovi individui", toolNumNew: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati).",
  manExec1: "1. Individua", manExec2: "2. Seleziona", manExec3: "3. Aggiorna",
  toolManExec: "Gestisce manualmente l’evoluzione, in tre fasi:\n1. individua gli individui da eliminare;\n2. elimina gli individui individuati;\n3. genera nuovi individui.",
  autoExec1: "1. Attiva l’evoluzione", autoExec2: "2. Ferma l’evoluzione",
  toolAutoExec: "Attiva o ferma l’evoluzione.",
  setAll: "Riconfigura il sistema", toolSetAll: "Riconfigura il sistema in accordo ai parametri scelti.",
  resetTarget: "Crea un nuovo obiettivo", toolResetTarget: "Crea un nuovo obiettivo casuale.",
  showParams: "Mostra i parametri", toolShowParams: "Mostra i parametri degli individui della popolazione.",
};

function setText(container, id) { $('#' + container).html(txt[id]); }
