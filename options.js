//Saves options to local.storage
function save_options() {
    console.log("Saving!!")
    const elementPrefix = "FavoriteTeam"
    const favoriteTeams = []
    for (var i=1; i<13; i++) {
        var favTeam = document.getElementById(elementPrefix.concat(i.toString())).value
        console.log(favTeam)
        if (favTeam) {
            console.log("Pushing!")
            favoriteTeams.push(favTeam);
        }
    }
    let contentToStore = {};
    contentToStore["FavoriteTeams"] = favoriteTeams;
    browser.storage.local.set(contentToStore);
    console.log("Saved!")
}


document.getElementById('save').addEventListener('click', save_options);