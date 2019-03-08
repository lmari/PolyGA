
var txt = { setup: "Setup",
  tNumPts: "#geni", toolNumPts: "Numero di geni nel DNA\n(=numero di punti di controllo di ogni polinomio)",
  tNumSrs: "#individui", toolNumSrs: "Numero di individui nella popolazione\n(=numero di polinomi nella popolazione)",
  selection: "Selezione",
  tNumDel: "#eliminati", toolNumDel: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati)",
  generation: "Generazione",
  tCombin: "%crossing over", toolCombin: "Percentuale di crossing over\n(=percentuale di ricombinazione)",
  tChange: "%mutazioni", toolChange: "Percentuale di mutazioni\n(=percentuale di cambiamenti)",
  tChang2: "amp mutazioni", toolChang2: "Ampiezza delle mutazioni\n(=ampiezza dei cambiamenti)",
  tNumNew: "#nuovi individui", toolNumNew: "Numero di individui eliminati nella selezione\n(=numero di polinomi eliminati)",

};

function setText(container, id) { $('#' + container).html(txt[id]); }
