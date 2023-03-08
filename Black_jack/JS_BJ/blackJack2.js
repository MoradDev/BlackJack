var sabot = ["2trefle", "3trefle", "4trefle", "5trefle", "6trefle", "7trefle",
"8trefle", "9trefle", "10trefle", "10VALETtrefle", "10DAMEtrefle",
"10ROItrefle", "11AStrefle", "2coeur", "3coeur", "4coeur", "5coeur",
"6coeur", "7coeur", "8coeur", "9coeur", "10coeur", "10VALETcoeur",
"10DAMEcoeur", "10ROIcoeur", "11AScoeur", "2pique", "3pique", "4pique",
"5pique", "6pique", "7pique", "8pique", "9pique", "10pique", "10VALETpique",
"10DAMEpique", "10ROIpique", "11ASpique", "2carreau", "3carreau", "4carreau",
"5carreau", "6carreau", "7carreau", "8carreau", "9carreau", "10carreau",
"10VALETcarreau", "10DAMEcarreau", "10ROIcarreau", "11AScarreau"];


var banquier = {
    donne:[],
    pointMain:0,
    nbrAs:false,
    carteRecu:"",
}

var joueur = {
    donne:[],
    pointMain:0,
    nbrAs:false,
    carteRecu:"",
}

var seuil = 17;

var compteurPartiesBanquier = 0;
var compteurPartiesJoueur = 0;

// var zoneJoueur = document.getElementById("tablejoueur");
// var zoneBanquier = document.getElementById("tablebanquier");

const blackJack = 21;

/* ces 4 fonctions seront appelées à chaque fois que le programme
doit distribuer une carte*/


function distribuerCarte(tailleSabot, utilisateur){
    
    var indice = Math.floor(Math.random() * tailleSabot);
    var carteTempo = sabot[indice];

    sabot.splice(indice, 1);
    if(parseInt(carteTempo, 10) === 11){ 
            utilisateur.nbrAs = true;
    } 
    if (sabot.length === 0){
        sabot = ["2trefle", "3trefle", "4trefle", "5trefle", "6trefle", "7trefle",
        "8trefle", "9trefle", "10trefle", "10VALETtrefle", "10DAMEtrefle",
        "10ROItrefle", "11AStrefle", "2coeur", "3coeur", "4coeur", "5coeur",
        "6coeur", "7coeur", "8coeur", "9coeur", "10coeur", "10VALETcoeur",
        "10DAMEcoeur", "10ROIcoeur", "11AScoeur", "2pique", "3pique", "4pique",
        "5pique", "6pique", "7pique", "8pique", "9pique", "10pique", "10VALETpique",
        "10DAMEpique", "10ROIpique", "11ASpique", "2carreau", "3carreau", "4carreau",
        "5carreau", "6carreau", "7carreau", "8carreau", "9carreau", "10carreau",
        "10VALETcarreau", "10DAMEcarreau", "10ROIcarreau", "11AScarreau"];
    }

    return carteTempo;
}
    
function comptePts(carteDistribue, utilisateur){

    if (parseInt(carteDistribue, 10) < 11) { 
        utilisateur.pointMain += parseInt(carteDistribue, 10);
        if(utilisateur.pointMain > blackJack && utilisateur.nbrAs === true){
            utilisateur.pointMain -= 10;
            utilisateur.nbrAs = false;
        }

            
    }else {
         if (utilisateur.pointMain < 11) {
            utilisateur.pointMain += 11;
            utilisateur.nbrAs = true;

        }else {
            utilisateur.pointMain++;
            utilisateur.nbrAs = false;
             }            
        }
    }


function creerCarteJoueur(){
    
    var zoneJoueur = document.getElementById("tablejoueur");
    
    var carte = document.createElement("div");
        
    carte.setAttribute("class","image");

    var imageCarte = document.createElement("img");

    imageCarte.setAttribute("class","imageCarte");
    
    imageCarte.setAttribute("src", "CSS_BJ/face/"+ joueur.carteRecu+'.svg');

    carte.appendChild(imageCarte);
           
    zoneJoueur.appendChild(carte);

    var mainJoueur = document.getElementById("pointMainJoueur");

    mainJoueur.innerHTML = "";

    mainJoueur.innerHTML = joueur.pointMain;
    
    }
    
    
function creerCarteBanquier(){
        
    var zoneBanquier = document.getElementById("tablebanquier");
    
    var carte = document.createElement("div");
        
    carte.setAttribute("class","image");
    
    var imageCarte = document.createElement("img");

    imageCarte.setAttribute("class","imageCarte");
    
    imageCarte.setAttribute("src", "CSS_BJ/face/" + banquier.carteRecu+'.svg');

    carte.appendChild(imageCarte);
           
    zoneBanquier.appendChild(carte);

    var mainBanquier = document.getElementById("pointMainBanquier");

    mainBanquier.innerHTML = "";

    mainBanquier.innerHTML = banquier.pointMain;

    }




// CETTE FONCTION REMET LES COMPTEURS A ZERO DE NOS OBJETS banquier ET joueur

function clear(){
    
    joueur.donne=[];
    joueur.pointMain=0;
    joueur.nbrAs=false;
    joueur.carteRecu="";

    var zoneJoueur = document.getElementById("tablejoueur");
    zoneJoueur.innerHTML = "";

    
    banquier.donne=[];
    banquier.pointMain=0;
    banquier.nbrAs=false;
    banquier.carteRecu="";

    var zoneBanquier = document.getElementById("tablebanquier");
    zoneBanquier.innerHTML = "";
}

//////////////////////////////////////////////////////////////////////////////




function nouvelleDonne(){

        clear();

        for (var i = 0; i < 2; i++) {

             joueur.carteRecu = distribuerCarte(sabot.length, joueur);
    
             joueur.donne.push(joueur.carteRecu);
    
             comptePts(joueur.carteRecu, joueur);

             creerCarteJoueur();
           
             banquier.carteRecu = distribuerCarte(sabot.length, banquier);
    
             banquier.donne.push(banquier.carteRecu);
    
             comptePts(banquier.carteRecu, banquier);

             creerCarteBanquier();

         };
    }
      


  function donneBanquier(){
    while (banquier.pointMain <= seuil){

        banquier.carteRecu = distribuerCarte(sabot.length, banquier);
       
        banquier.donne.push(banquier.carteRecu);
        
        comptePts(banquier.carteRecu, banquier);

        creerCarteBanquier();

        };

    finPartie();

  }
       
                 
                       
                        
function finPartie(){

    var partieBanquier = document.getElementById ("nbPartieBanquier");
    var partieJoueur = document.getElementById ("nbPartieJoueur");

    if (joueur.pointMain > blackJack){
        compteurPartiesBanquier++;
        partieBanquier.innerHTML = "";
        partieBanquier.innerHTML = compteurPartiesBanquier;
        alert("Vous avez dépassé 21. le point va à la banque.");

    }else if ((joueur.pointMain <= blackJack && banquier.pointMain > blackJack) || 
                    (banquier.pointMain < joueur.pointMain && joueur.pointMain <= blackJack)) {
        compteurPartiesJoueur++;
        partieJoueur.innerHTML = "";
        partieJoueur.innerHTML = compteurPartiesJoueur;
        alert("Felicitation, vous avez gagné cette partie !!");        

    }else if(joueur.pointMain === banquier.pointMain){
        compteurPartiesJoueur++;
        partieJoueur.innerHTML = "";
        partieJoueur.innerHTML = compteurPartiesJoueur;
        compteurPartiesBanquier++;
        partieBanquier.innerHTML = "";
        partieBanquier.innerHTML = compteurPartiesBanquier;
        alert("Ex-aequo ! un point chacun.");

    }else{
        compteurPartiesBanquier++;
        partieBanquier.innerHTML = "";
        partieBanquier.innerHTML = compteurPartiesBanquier;
        alert("Le banquier a gagné cette partie !");
        
    };

}



var hit = document.getElementById("hit");
var stand = document.getElementById("stand");
var over = document.getElementById("over");
var boutonDonne = document.getElementById("boutonDonne");

hit.addEventListener("click", function(){
    joueur.carteRecu = distribuerCarte(sabot.length, banquier);
       
    joueur.donne.push(joueur.carteRecu);
        
    comptePts(joueur.carteRecu, joueur);

    creerCarteJoueur();
});

stand.addEventListener("click", function(){
    donneBanquier();
});

over.addEventListener("click", function(){
    finPartie();
});

boutonDonne.addEventListener("click", function(){
    nouvelleDonne();
});


nouvelleDonne();
