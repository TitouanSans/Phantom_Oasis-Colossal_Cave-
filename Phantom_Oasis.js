
const moduleDes = require("./Lancer_des.js");

//On précise que nous taperons de l'utf 8 dans la console
process.stdin.setEncoding('utf8');

// MAP
let map = [
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "V", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "O", "_", "_", "_"],
];
let joueur = {
    x: 2,
    y: 2
};

//Afficher le texte au fur et à mesure
function slow_log_simple(mot, time) {
    let lettre_courante = 0;
    for (let i = 0; i < mot.length; i++) {
        setTimeout(() => {
            process.stdout.write(mot[lettre_courante]);
            lettre_courante++;
        }, i * time);
    }
}

function slowLog(texte, time, suite) {
    let lettreCourante = 0;
    for (let i = 0; i < texte.length + 1; i++) {
        setTimeout(() => {
            if (i < texte.length) {
                process.stdout.write(texte[lettreCourante]);
                lettreCourante++;
            } else {
                suite();
            }
        }, i * time);
    }
}


/* 
direction = N, S, O, E
*/
function go(direction) {
    //retourner un message qui décrit le contenu de la case
    switch (direction) {
        case "O":
            if (joueur.x > 0) {
                joueur.x--;
                console.log("\nVous aller à l'ouest");
            } else {
                console.log("\nVous ne pouvez pas aller plus loin.");
            }
            break;
        case "N":
            if (joueur.y > 0) {
                joueur.y--;
                console.log("\nVous aller au nord");
            } else {
                console.log("\nVous ne pouvez pas aller plus loin.");
            }
            break;
        case "E":
            if (joueur.x < map[joueur.y].length-1) {
                joueur.x++;
                console.log("\nVous aller à l'est");
            } else {
                console.log("\nVous ne pouvez pas aller plus loin.");
            }
            break;
        case "S" :
            if(joueur.y < map.length - 1){
                joueur.y++;
                console.log("\nVous aller au sud");
            } else {
                console.log("\nVous ne pouvez pas aller plus loin.");
            }
            break;
        default:

    }
 // CASE OU JOUEUR EST
    switch (map[joueur.y][joueur.x]) {
        case "_":
            console.log("Rien à part des dunes et du sable.")
            process.stdin.pause(); 
		    slowLog(action,30, () =>{
                process.stdin.resume();
            } );
            //console.log(moduleDes.LancerDes(5))
           // process.exit();
            break;
        case "V": //VILLAGE
            console.log("Vous retournez à Pokoko, vous êtes soigné et prêt à repartir !")
            process.stdin.pause(); 
		    slowLog(action,20, () =>{
                process.stdin.resume();
            });
            break;
        case "O": //OASIS
            process.stdin.pause();
		    slowLog(oasis,20, () =>{
                process.stdin.resume();
            });
            break;
    };
};

//-----------------------------------------------------------------------------

// INTRODUCTION
function slowLog(texte,time,suite){
    let lettreCourante = 0;
    for( let i = 0; i < texte.length + 1; i++){
        setTimeout(() =>{
            if( i < texte.length){
                process.stdout.write(texte[lettreCourante]);
                lettreCourante++;
            }else{
                suite();
            }
        }, i*time);
    }
}

let intro = 
`Le village de Pokoko est menacé par la soif depuis l'asséchement de son puit !
Vous êtes le meilleur guerrier du village, c'est donc vous qui devra parcourir le désert de Mézarar pour trouver l'Oasis Fantôme !
Mais attention, le désert est remplie de créatures hostiles, qui sait ce que vous rencontrerez...

(Pour intéragir avec le jeu, tappez l'une des commandes indiquées entre des [].)
(Tapper AIDE pour avoir les détails des commandes.)
`;

let move = 
`\nOù aller ?
[N(nord) - S(sud) - O(ouest) - E(est)]
`;

let action = 
`
Que faire ? 
[PARTIR - CHERCHER - SAC]
`;

let oasis = 
/*`
Alors que vous atteignez le haut d'une dune, un éclat bleuté vous frappe la rétine...
Une grande marre bordé de verdure s'offre à vous, VOUS AVEZ ENFIN ATTEIND L'OASIS FANTÔME !

Mais quelque chose semble bouger, un lézard géant couché prêt de l'oasis vous fixe.

Soudain il vous charge ! Le combat est inévitable !`
*/
`
Alors que vous atteignez le haut d'une dune, un éclat bleuté vous frappe la rétine...
Une grande marre bordé de verdure s'offre à vous, VOUS AVEZ ENFIN ATTEIND L'OASIS FANTÔME !

LE VILLAGE EST SAUVÉ DE LA SÉCHERESSE !

OOOOOOO  OOOOOOO  O        O   OOOOOO  O  OOOOOOO   OOOOO   OOOOOOO  O   OOOOO   OO    O   OOOOOO
O        O        O           O              O     O     O     O        O     O  O O   O  O
OOOOO    OOOOOOO  O        O  O        O     O     OOOOOOO     O     O  O     O  O  O  O   OOOOO
O        O        O        O  O        O     O     O     O     O     O  O     O  O   O O        O
O        OOOOOOO  OOOOOOO  O   OOOOOO  O     O     O     O     O     O   OOOOO   O    OO  OOOOOO
`

/* début du script ici */
process.stdin.pause(); //stopper l'entrée pour ne pas pirater le texte
slowLog(intro,0/*30*/,()=> {    
    slowLog(
`
Que faire ? 
[PARTIR - CHERCHER - SAC]
`,10, () => {
		process.stdin.resume();//réactiver l'entrée
	} );
});

//A chaque entrée dans la console, on appellera la fonction fléchée, rep sera la réponse tapée dans la console
//Ici on déclare ce que l'on fera lorsqu'on recevra une donée
process.stdin.on('data', (d) => {	
	let rep = d.toString().trim() 
	if(rep == "PARTIR"){
		process.stdin.pause(); //stopper l'entrée
		slowLog(move,10, () =>{
			process.stdin.resume();//réactiver l'entrée à la fin du log
		});
	}
	if(rep == "QUITTER"){
		process.exit();
	}

	if(rep == "N"){
        go("N")
	}
	if(rep == "S"){
        go("S")
	}
	if(rep == "O"){
        go("O")
	}
	if(rep == "E"){
        go("E")
	}
	
});


