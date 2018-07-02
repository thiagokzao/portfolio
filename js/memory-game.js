/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

$(function () {
    embaralhar();
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var contaMovimento = 0;
var array = [];
var isOpen = 0;
var opt1 = "";
var opt2 = "";
var finalDeJogo = 0;

$('.card').each(function () {
    array.push($(this).html());
});


$('.restart').on('click', function () {
    embaralhar();
});


$('.deck').on('click', ' .card ', function (evt) {
    contaMovimento++;
    if (!$(this).hasClass('match')) {
        if (!$(this).hasClass('open') && isOpen <= 1) {
            regrasJogo($(this));
            crush(opt1, opt2, $(this));
        }
        $('.moves').text(contaMovimento)
    }
    console.log(isOpen);
});

function regrasJogo(clique) {
    opt1 == "" ? opt1 = $(clique).html() : opt2 = $(clique).html();
    $(clique).addClass('open show');
    isOpen++;
}


function crush(clique1, clique2, clique) {
    if (clique2 != "") {
        if (clique1 == clique2) {
            $('.show').addClass('match');
            $(clique).removeClass('open show');
            ganhador();
        } else {
            setTimeout(function () {
                $('.card').removeClass('open show')
            }, 500);
        }
        resetar();
    }
}

function embaralhar() {
    var contador = 0;
    // zera contagem de movimentos
    contaMovimento = 0;
    //embaralha icones
    array = shuffle(array);
    $('.card').removeClass('open show match')
    $('.card').each(function () {
        $(this).children().remove();
        $('.moves').text(contaMovimento);
        $(this).append(array[contador]);
        contador++;
    });
}

function resetar (){
    isOpen = 0;
    opt1 = "";
    opt2 = "";
}

function ganhador(){
    finalDeJogo++;
    if(finalDeJogo == 8){
        setTimeout(function () {
        alert("Fim de jogo. Você terminout com  " + contaMovimento + " cliques. \nTente superar seu recorde, clique em ok para jogar novamente.");
        resetar();
        embaralhar();
        }, 500);
    }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */