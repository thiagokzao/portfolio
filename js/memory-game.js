/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 /*
 *TODO: Store variables in local storage
 *TODO: create leadboards
 */

var contaMovimento = 0; // armazena contagem de cliques
// TODO: criar array com lista de icones
var array = []; //armazena icones do hardcoded no html
var isOpen = 0; //controle de cartas viradas
var opt1 = ""; //armazena primeiro clique
var opt2 = ""; // armazena segundo clique
var finalDeJogo = 0; // controle de fim de jogo
var record = 0; // armazena melhor jogada
var stars = 3;
var iniciaContador = false;
var tempo;

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

// Embaralhamento do jogo inicial
$(function () {
    preparaJogo();
})

// armazena icones
$('.card').each(function () {
    array.push($(this).html());
});

// Função ouvinte dos eventos
$('.deck').on('click', ' .card ', function (evt) {
    contaMovimento++;
    if (!$(this).hasClass('match')) {
        if (!$(this).hasClass('open') && isOpen <= 1) {
            mostraCarta($(this));
            crush(opt1, opt2, $(this));
        }
        $('.moves').text(contaMovimento)
    }
    if (contaMovimento == 28) {
        $('.stars li').first().remove()
    } else if (contaMovimento == 34) {
        $('.stars li').first().remove()
    } else if (contaMovimento == 40) {
        $('.stars li').first().remove()
    }
});

// embaralha o jogo
$('.restart').on('click', function () {
    preparaJogo();
    $('.msg-modal').remove(); //remove mensagem do modal
});

//Função de controle de clique
function mostraCarta(clique) {
    opt1 == "" ? opt1 = $(clique).html() : opt2 = $(clique).html();
    $(clique).addClass('open show');
    isOpen++;
}

// Funçao que controla cartas abertas e verifica se deu crush ;D
function crush(clique1, clique2, clique) {
    if (clique2 != "") {
        if (clique1 == clique2) {
            $('.show').addClass('match');
            $('.show').removeClass('open show');
            finalizaJogo();
        } else {
            setTimeout(function () {
                $('.show').addClass('wrong');
                setTimeout(function () {
                    $('.show').removeClass('open show wrong');
                }, 500);
            }, 200);
        }
        controlaCliques();
    }
}

// Funcão de embaralhamento
function preparaJogo() {
    var contador = 0;
    // zera contagem de movimentos
    contaMovimento = 0;

    //embaralha icones
    array = shuffle(array);

    //Vira todas cartas para baixo
    $('.card').removeClass('open show match');

    //remove icones e adiciona em novas posiçoes
    $('.card').each(function () {
        $(this).children().remove();
        $('.moves').text(contaMovimento);
        $(this).append(array[contador]);
        contador++;
    });

    //reset timer
    clearTimeout(t);
    iniciaContador = false;
    $('#timer').text("00:00:00")
    seconds = 0; minutes = 0; hours = 0;

    //reseta estrelas
    if ($('.stars li').length < 3) {
        counting_stars = stars - $('.stars li').length;;
        for (var i = $('.stars li').length; i < 3; i++) {
            $('.stars').append('<li><i class="fa fa-star"></i></li>')
        }
    }
}

// Função que reiniciar os indeicadores
function controlaCliques() {
    isOpen = 0;
    opt1 = "";
    opt2 = "";
}

//Funçao que finalizar o jogo
function finalizaJogo() {
    finalDeJogo++;
    if (finalDeJogo == 8) {
        // Stop timer
        clearTimeout(t);
        //Chama modal fim de jogo
        $('#myModal').modal('show');
        $('.modal-body').append(`<p class="msg-modal">Você terminout com  ${contaMovimento} cliques. <br /><br />Tente superar seu recorde, clique em jogar novamente.</p>`);
        $('.modal-body').append('<p>Seu tempo: ' +  $('#timer').text() + '</p>');
        // inicia um novo jogo
        $('#new-game').on('click', function () {
            $('#myModal').modal('hide');
            if (contaMovimento > 0) {
                if (record == 0 || contaMovimento < record) {
                    record = contaMovimento;
                    $('.best').text(record);
                }
                controlaCliques();
                $('.msg-modal').remove(); //remove mensagem do modal
                preparaJogo();
            }
        });
        finalDeJogo = 0;
        
    }
}

$('.card').on('click', function(){
    if (!iniciaContador){
        timer();
    }
    iniciaContador = true;
    console.log(tempo);
})


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