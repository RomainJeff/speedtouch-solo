/**
 * SpeedTouch
 * @author Romain Quilliot <romain.addweb@gmail.com>
 * Tous droits réservés 2013
 */


//Redimension des zones de cliques
clickAreaDimension();
setInterval(clickAreaDimension, 100);

// On positionne les scores
positionScores();
setInterval(positionScores, 100);

// On positionne les boutons
positionButton();
setInterval(positionButton, 100);

// On positionne les regles
positionRegles();

// Permet de savoir si le buzzer a sonné
var hasBuzzed = false;

// Permet de savoir qui a cliqué
var playerOne = false;
var playerTwo = false;

// Score des deux joueurs
var scorePlayerOne = 0;
var scorePlayerTwo = 0;

// On stock les couleurs des zones de cliques
var colorP1 = $('#playerOne').css('background');
var colorP2 = $('#playerTwo').css('background');

// Permet de savoir si un utilisateur a deja cliqué
var found = false;

// On ecoute le bouton begin pour commencer le jeu
$('#overlay').on('click', '#begin', function(){
    $('#overlay').fadeOut();
    reset();
});

// On ecoute le bouton tuto pour avoir les regles
$('#overlay').on('click', '#tuto', function(){
    $('#begin, #tuto').fadeOut(400, 'swing', function(){
        $('#regles').fadeIn();
    });
});

// On ecoute le bouton retour
$('#overlay').on('click', '#retour', function(){
    $('#regles').fadeOut(400, 'swing', function(){
        $('#begin, #tuto').fadeIn();
    });
});

var i = 0;

// On parcour les zones de cliques
$('.clickArea').each(function() {

    var Eventhandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

    // Quand l'utilisateur clique sur une zone de clique
    document.getElementsByClassName('clickArea')[i].addEventListener(Eventhandler, function(e) {

        e.preventDefault();

        // Si le buzzer a sonné
        if (hasBuzzed) {

            var id = $(this).attr('id');

            // Si le clique est le joueur 1
            if (id == 'playerOne') {
                playerOne = true;
            } else if (id == 'playerTwo') {
                playerTwo = true;
            }

            // Si le joueur 1 a cliqué en premier
            if (playerOne == true && playerTwo == false && found == false) {
                // On ajoute ses points
                found = true;
                scorePlayerOne++;
            } else if (playerTwo == true && playerOne == false && found == false) {
                // On ajoute ses points
                found = true;
                scorePlayerTwo++;
            }

            // Si un utilisateur a gagné
            if (found == true) {
                // On redonne leur couleurs aux zones de cliques
                $('#playerOne').css('background', colorP1);
                $('#playerTwo').css('background', colorP2);

                // On met a jour le score
                score();

                // Si un des joueurs à 9
                if (scorePlayerOne >= 9 || scorePlayerTwo >= 9) {

                    // On stop le jeu
                    started = false;
                    // On affiche l'écran des gagnants
                    endDisplay();

                    // On remet à 0 le score des joueurs
                    scorePlayerOne = 0;
                    scorePlayerTwo = 0;

                    // On reset tout
                    varReset();

                    // On affiche le score
                    score();

                } else {
                    // On refait sonner le buzzer
                    reset();
                }
            }

        }

    });

    i++;
});

/**
 * Fonction pour debuguer
 * @param texte
 */
function debug(texte)
{
    $('#debug').prepend(texte +"<br>");
}

/**
 * Fonction pour faire sonner le buzzer
 */
function reset()
{
    varReset();

    var delai = (Math.random() * 10000);

    if (delai <= 1000) {
        delai = delai + 1000;
    }

    setTimeout(function(){
        $('.clickArea').css('background', '#2980b9');
        hasBuzzed = true;
    }, delai);
}

/**
 * Fonction pour remettre à zero les
 * variables à chaque tour
 */
function varReset()
{
    playerOne = false;
    playerTwo = false;
    hasBuzzed = false;
    found = false;
}

/**
 * Fonction pour afficher l'ecran de fin
 */
function endDisplay()
{
    var joueur = 2;

    if (scorePlayerOne > scorePlayerTwo) {
        joueur = 1;
    }

    $('#overlay').html(
        '<h1>Le joueur '+ joueur +' gagne !</h1>'+
        '<button id="begin">Rejouer</button>'
    );

    positionButton();

    $('#overlay').fadeIn();
}

/**
 * Fonction pour afficher le score
 */
function score()
{
    $('#scorePlayerOne').html(scorePlayerOne);
    $('#scorePlayerTwo').html(scorePlayerTwo);
}

/**
 * Fonction pour positionnner le bouton
 * en fonction de la résolution d'écran
 */
function positionButton()
{
    var button = $('#begin');
    var h = $('h1');
    var height = $(window).height() / 2;

    if (h.length > 0) {
        h.css({
            marginTop: (height - 100 - button.height())
        });
    }

    if (button.length > 0 && h.length == 0) {
        button.css({
            marginTop: (height - button.height())
        });
    }
}

/**
 * Fonction pour positionnner le bouton
 * en fonction de la résolution d'écran
 */
function positionRegles()
{
    var regles = $('#regles');
    var height = $(window).height() / 2;

    regles.css({
        marginTop: (height - regles.height())
    });
}

/**
 * Fonction pour positionner les scores selon
 * la résolution d'écran
 */
function positionScores()
{
    var score1 = $('#scorePlayerOne');
    var score2 = $('#scorePlayerTwo');
    var height = $('.clickArea').height() / 2;
    var width  = $('.clickArea').width() / 2;

    score1.css({
        top: (height - score1.height() / 2),
        left: (width - score1.width() / 2)
    });

    score2.css({
        top: (height - score2.height() / 2),
        left: (width - score2.width() / 2)
    });
}

function clickAreaDimension()
{
    var height = $(window).height() / 2;

    // On dimensionne les zones de clicks
    $('.clickArea').css({
        height: height
    });
}