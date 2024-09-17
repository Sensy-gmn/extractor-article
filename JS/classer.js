import fs from "fs";
import result from "../result.json" assert { type: "json" };

/**
 * trier les objets reçus en fonction de la taille du text *
 *
 * ---------- [ Petit : < 40 mots ]
 * ---------- [ Moyen : <= 90 mots ]
 * ---------- [ Grand : > 90 mots ]
 *
 **/

const taille = {
    petit: 100,
    moyen: 300,
    grand: 300,
};

let petitText = [];
let moyenText = [];
let grandText = [];

result.forEach((item) => {
    let balise = item.tag;
    let text = item.text;
    let keywords = item.nbr_occurence_per_tag_per_keywords;

    // Nettoyer le texte
    let cleanedText = text.replace(/\n+/g, " ");

    let wordCount = cleanedText.split(" ").length;

    if (wordCount < taille.petit) {
        petitText.push(item);
    } else if (wordCount <= taille.moyen) {
        moyenText.push(item);
    } else {
        grandText.push(item);
    }
});

fs.writeFileSync("JS/petitText.json", JSON.stringify(petitText, null, 2));
fs.writeFileSync("JS/moyenText.json", JSON.stringify(moyenText, null, 2));
fs.writeFileSync("JS/grandText.json", JSON.stringify(grandText, null, 2));
