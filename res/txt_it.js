
var txt = {
  setup: "Configurazione",
  tNumPts: "#geni", toolNumPts: "Numero di geni nel DNA\n(=numero di punti di controllo di ogni polinomio).",
  tNumSrs: "#individui", toolNumSrs: "Numero di individui nella popolazione\n(=numero di polinomi nella popolazione).",
  selection: "Selezione",
  tNumDel: "#eliminati", toolNumDel: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati).",
  generation: "Generazione",
  tCombin: "%crossing over", toolCombin: "Percentuale di crossing over\n(=percentuale di ricombinazione).",
  tChange: "%mutazioni", toolChange: "Percentuale di mutazioni\n(=percentuale di cambiamenti).",
  tChang2: "amp mutazioni", toolChang2: "Ampiezza delle mutazioni\n(=ampiezza dei cambiamenti).",
  tNumNew: "#nuovi individui", toolNumNew: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati).",
  bManExec1: "1. Individua", bManExec2: "2. Seleziona", bManExec3: "3. Aggiorna",
  toolBManExec: "Gestisce manualmente l’evoluzione, in tre fasi:\n1. individua gli individui da eliminare;\n2. elimina gli individui individuati;\n3. genera nuovi individui.",
  bAutoExec1: "1. Attiva l’evoluzione", bAutoExec2: "2. Ferma l’evoluzione",
  toolBAutoExec: "Attiva o ferma l’evoluzione.",
};

function setText(container, id) { $('#' + container).html(txt[id]); }
