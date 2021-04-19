document.body.style.border = "5px solid red";


// console.log("Test!");
// elems = document.getElementsByClassName("League-Countdown");
// console.log("ELEMS");
// console.log(elems);
// var scoreCards = null;
// if (elems) {
//     console.log("HA");
//     scoreCards = elems.item(0).parentElement;
//     console.log("test");
//     console.log(scoreCards)
// }

function findScoreCards() {
    elems = document.getElementsByClassName("League-Countdown");
    if (!elems) {
        console.log("Failed to find League-Countdown");
        return null
    }
    //This will break horribly 
    scoreCards = elems.item(0).parentElement.children.item(1).children;
    return scoreCards
}

function teamNamesFromScoreCard(element){
    names = element.getElementsByClassName("GameWidget-ScoreName")
    return [names[0].textContent, names[1].textContent];
}

function getPlayingTeams(){
    cards = findScoreCards();
    var games = []
    for (var i = 0; i < cards.length; i++) {
        item = {}
        item.number = i;
        item.card = cards[i];
        item.teams = teamNamesFromScoreCard(cards[i]);
        games.push(item)
    }
    return games
}

function teamNameInGame(game, team){
    for (const teamName of game.teams) {
        if (teamName === team) {
            return true
        }
    }
    return false
}
function teamNameInGames(games, team) {
    for (const game of games) {
        if (teamNameInGame(game, team)) {
            return true
        }
    }
    return false
}


function sortTeams(currentGames, priorityTeams){
    console.log("Priority Teams")
    if (!priorityTeams) {
        priorityTeams = []
    }
    sortedGames = []
    console.log(priorityTeams)
    console.log(priorityTeams.length)
    // Add games in order of priority
    for (var i = 0; i < priorityTeams.length; i++) {         // Ignore
        for (var j = 0; j < currentGames.length; j++) {      // This
            for (const teamName of currentGames[j].teams){   // Garbage
                console.log("".concat(priorityTeams[0].concat(" + ").concat(teamName)))
                if (teamName === priorityTeams[i]) {
                    if (!teamNameInGames(sortedGames, priorityTeams[i])) {
                        sortedGames.push(currentGames[j]);
                    }
                }
            }
        }
    }
    //Add the rest of the games
    for (var i = 0; i < currentGames.length; i++) {
        if (!teamNameInGames(sortedGames, currentGames[i].teams[0])){
            sortedGames.push(currentGames[i]);
        }
    }
    console.log(sortedGames)
    return sortedGames
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function replaceTeamsWithSortedTeams(sortedTeams) {
    elems = document.getElementsByClassName("League-Countdown");
    if (!elems) {
        console.log("Failed to find League-Countdown");
        return null
    }
    //This will break horribly 
    scoreCardContainer = elems.item(0).parentElement.children.item(1)
    removeAllChildNodes(scoreCardContainer);
    for (const team of sortedTeams){
        scoreCardContainer.append(team.card)
    }

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function main() {
    console.log("Waiting to start...")
    //replaceTeamsWithSortedTeams(sortTeams(getPlayingTeams()))
	setTimeout(function() {
        console.log('Initialized!');
        browser.storage.local.get("FavoriteTeams").then(result => replaceTeamsWithSortedTeams(sortTeams(getPlayingTeams(), result["FavoriteTeams"])))
    }, 2000);
}

main()