
var txt = { setup: "Setup",
  tNumPts: "#geni", toolNumPts: "Numero di geni nel DNA (=numero di punti di controllo di ogni polinomio)",
  tNumSrs: "#individui", toolNumSrs: "Numero di individui nella popolazione (=numero di polinomi nella popolazione)",
  selection: "Selezione",
  tNumDel: "#eliminati", toolNumDel: "Numero di individui eliminati nella selezione (=numero di polinomi elminati)",

};

function setText(container, id) { $('#' + container).html(txt[id]); }
