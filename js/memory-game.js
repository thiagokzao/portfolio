/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var contaMovimento = 0; // armazena contagem de cliques
// TODO: criar array com lista de icones
var array = []; //armazena icones do hardcoded no html
var isOpen = 0; //controle de cartas viradas
var opt1 = ""; //armazena primeiro clique
var opt2 = ""; // armazena segundo clique
var finalDeJogo = 0; // controle de fim de jogo
var best = 0; // armazena melhor jogada

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
    embaralhar();
})

// armazena icones
$('.card').each(function () {
    array.push($(this).html());
});

// reseta jogo
$('.restart').on('click', function () {
    embaralhar();
});

// Função ouvinte dos eventos
$('.deck').on('click', ' .card ', function (evt) {
    contaMovimento++;
    if (!$(this).hasClass('match')) {
        if (!$(this).hasClass('open') && isOpen <= 1) {
            controlaClique($(this));
            crush(opt1, opt2, $(this));
        }
        $('.moves').text(contaMovimento)
    }
    console.log(isOpen);
});

//Função de controle de clique
function controlaClique(clique) {
    opt1 == "" ? opt1 = $(clique).html() : opt2 = $(clique).html();
    $(clique).addClass('open show');
    isOpen++;
}

// Funçao que controla cartas abertas
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
                    $('.show').removeClass('open show wrong')
                }, 500);
            }, 200);



        }
        resetar();
    }
}

// Funcão de embaralhamento
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

// Função que reiniciar os indeicadores
function resetar() {
    isOpen = 0;
    opt1 = "";
    opt2 = "";
}

//Funçao que finalizar o jogo
function finalizaJogo() {
    finalDeJogo++;
    if (finalDeJogo == 8) {
        //Chama modal fim de jogo
        $('#myModal').modal('show');
        $('.modal-body').append(`<p class="msg-modal">Você terminout com  ${contaMovimento} cliques. <br /><br />Tente superar seu recorde, clique em ok para jogar novamente.</p>`);
        // inicia um novo jogo
        $('#new-game').on('click', function () {
            $('#myModal').modal('hide');
            if (best = 0 || best < contaMovimento) {
                best = contaMovimento;
                $('.best').text(best);
                resetar();
                embaralhar();
            }
            //remove mensagem do modal
            $('.msg-modal').remove();
        });
        finalDeJogo = 0;
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