const fs = require("fs");
const path = require("path");

const files = ["index.html", "app.js"];

const replacements = [
  ["�ܰ", "☰"],
  ["�ffnen", "Öffnen"],
  ["�hnlichkeit", "Ähnlichkeit"],
  ["�� Dauer", "Ø Dauer"],
  ["�� Lautstärke", "Ø Lautstärke"],
  ["�Sbungen", "Übungen"],
  ["�Sbung", "Übung"],
  ["�Sbungs", "Übungs"],
  ["Vorf�hrung", "Vorführung"],
  ["Vorf�hr-Audio", "Vorführ-Audio"],
  ["Vorf�hr", "Vorführ"],
  ["gleichmä�xiger", "gleichmäßiger"],
  ["gro�x", "groß"],
  ["ausw�hlen", "auswählen"],
  ["Heute �ben", "Heute üben"],
  ["gleichm��ig", "gleichmäßig"],
  ["Lautst�rke", "Lautstärke"],
  ["Durchg�ngen", "Durchgängen"],
  ["W�rter", "Wörter"],
  ["f�r", "für"],
  ["ausgew�hlt", "ausgewählt"],
  ["gel�scht", "gelöscht"],
  ["l�uft", "läuft"],
  ["l�dt", "lädt"],
  ["m�glich", "möglich"],
  ["N�chster", "Nächster"],
  ["N�chste", "Nächste"],
  ["n�chste", "nächste"],
  ["Abschnittsl�nge", "Abschnittslänge"],
  ["S�tze", "Sätze"],
  ["H�ren", "Hören"],
  ["Schneefl�cklein", "Schneeflöcklein"],
  ["ge�bt", "geübt"],
  ["Wort f�r Wort", "Wort für Wort"],
  ["Vokal�bung", "Vokalübung"],
  ["Mund�ffnung", "Mundöffnung"],
  ["logop�dische", "logopädische"],
  ["zur�ckgesetzt", "zurückgesetzt"],
  ["pr�fen", "prüfen"],
  ["Auswertung f�r", "Auswertung für"],
  ["Patient ausgew�hlt", "Patient ausgewählt"],
  ["Ruhige �bungen", "Ruhige Übungen"],
  ["LogoSound-�bung", "LogoSound-Übung"],
  ["erstellte �bung", "erstellte Übung"],
  ["Noch keine �bung", "Noch keine Übung"],
  ["Tagespl�ne", "Tagespläne"],
  ["L�schen", "Löschen"],
  ["Zur�ck", "Zurück"],
  ["�berspringen", "Überspringen"],
  ["ge�ffnet", "geöffnet"],
  ["pers�nlichen", "persönlichen"],
  ["St�rke", "Stärke"],
  ["Auff�llig", "Auffällig"],
  ["st�rker", "stärker"],
  ["� gesamt", "Ø gesamt"],
  ["� Frequenz", "Ø Frequenz"],
  ["Bereich �", "Bereich Ø"],
  ["� Lautstärke", "Ø Lautstärke"],
  ["�bungsstimme", "Übungsstimme"],
  ["m�nnlich", "männlich"],
  ["W�rme", "Wärme"],
  ["Verst�rkung", "Verstärkung"],
  ["nat�rlich", "natürlich"],
  ["�bungen", "Übungen"],
  ["�bung", "Übung"],
  [" · ", " · "],
];

for (const file of files) {
  const absolute = path.join(process.cwd(), file);
  let content = fs.readFileSync(absolute, "utf8");
  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  content = content
    .replace(/">�<\/button>/g, '">×</button>')
    .replace(/aria-label="Nach oben">×<\/button>/g, 'aria-label="Nach oben">↑</button>')
    .replace(/aria-label="Nach unten">×<\/button>/g, 'aria-label="Nach unten">↓</button>')
    .replace(/> \uFFFD /g, "> · ")
    .replace(/ \uFFFD /g, " · ")
    .replace(/\uFFFD\u0013ffnen/g, "Öffnen")
    .replace(/\uFFFD\u001Ehnlichkeit/g, "Ähnlichkeit")
    .replace(/\uFFFD\uFFFDDauer/g, "Ø Dauer")
    .replace(/\uFFFD\uFFFDLautstärke/g, "Ø Lautstärke")
    .replace(/\uFFFDSbungen/g, "Übungen")
    .replace(/\uFFFDSbung/g, "Übung")
    .replace(/\uFFFDSbungs/g, "Übungs")
    .replace(/Vorf\uFFFDhrung/g, "Vorführung")
    .replace(/Vorf\uFFFDhr/g, "Vorführ")
    .replace(/gleichmä\uFFFDxiger/g, "gleichmäßiger")
    .replace(/gro\uFFFDx/g, "groß")
    .replace(/ausw\uFFFDhlen/g, "auswählen")
    .replace(/gleichm\uFFFD\uFFFDig/g, "gleichmäßig")
    .replace(/Lautst\uFFFDrke/g, "Lautstärke")
    .replace(/Durchg\uFFFDngen/g, "Durchgängen")
    .replace(/W\uFFFDrter/g, "Wörter")
    .replace(/f\uFFFDr/g, "für")
    .replace(/ausgew\uFFFDhlt/g, "ausgewählt")
    .replace(/gel\uFFFDscht/g, "gelöscht")
    .replace(/l\uFFFDuft/g, "läuft")
    .replace(/l\uFFFDdt/g, "lädt")
    .replace(/m\uFFFDglich/g, "möglich")
    .replace(/N\uFFFDchste/g, "Nächste")
    .replace(/N\uFFFDchster/g, "Nächster")
    .replace(/n\uFFFDchste/g, "nächste")
    .replace(/Abschnittsl\uFFFDnge/g, "Abschnittslänge")
    .replace(/S\uFFFDtze/g, "Sätze")
    .replace(/H\uFFFDren/g, "Hören")
    .replace(/Schneefl\uFFFDcklein/g, "Schneeflöcklein")
    .replace(/ge\uFFFDbt/g, "geübt")
    .replace(/Vokal\uFFFDbung/g, "Vokalübung")
    .replace(/Mund\uFFFDffnung/g, "Mundöffnung")
    .replace(/logop\uFFFDdische/g, "logopädische")
    .replace(/zur\uFFFDck/g, "zurück")
    .replace(/pr\uFFFDfen/g, "prüfen")
    .replace(/pers\uFFFDnlich/g, "persönlich")
    .replace(/St\uFFFDrke/g, "Stärke")
    .replace(/Auff\uFFFDllig/g, "Auffällig")
    .replace(/st\uFFFDrker/g, "stärker")
    .replace(/\uFFFD gesamt/g, "Ø gesamt")
    .replace(/\uFFFD Frequenz/g, "Ø Frequenz")
    .replace(/Bereich \uFFFD/g, "Bereich Ø")
    .replace(/\uFFFD Lautstärke/g, "Ø Lautstärke")
    .replace(/\uFFFDbungsstimme/g, "Übungsstimme")
    .replace(/m\uFFFDnnlich/g, "männlich")
    .replace(/W\uFFFDrme/g, "Wärme")
    .replace(/Verst\uFFFDrkung/g, "Verstärkung")
    .replace(/nat\uFFFDrlich/g, "natürlich")
    .replace(/vollst\uFFFDndigen/g, "vollständigen")
    .replace(/gegen\uFFFDber/g, "gegenüber")
    .replace(/Stimmstabilit\uFFFDt/g, "Stimmstabilität")
    .replace(/Gleichm\uFFFD\uFFFDigkeit/g, "Gleichmäßigkeit")
    .replace(/k\uFFFDnnen/g, "können")
    .replace(/ver\uFFFDndern/g, "verändern")
    .replace(/gew\uFFFDhlt/g, "gewählt")
    .replace(/Verst\uFFFDndlichkeit/g, "Verständlichkeit")
    .replace(/F\uFFFDr/g, "Für")
    .replace(/>\uFFFDffnen</g, ">Öffnen<")
    .replace(/\uFFFD/g, "×");

  fs.writeFileSync(absolute, content, "utf8");
}

console.log("Mojibake fix applied.");
