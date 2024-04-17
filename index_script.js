document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var length = document.getElementById('length').value;
    var includeUppercase = document.getElementById('includeUppercase').checked;
    var includeNumbers = document.getElementById('includeNumbers').checked;
    var includeSymbols = document.getElementById('includeSymbols').checked;
    var baseInput = document.getElementById('baseInput').value;

    var charset = '';
    var uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numberCharset = '0123456789';
    var symbolCharset = '!@#$%^&*()_+{}[]|:;<>,.?';

    if (includeUppercase) charset += uppercaseCharset;
    if (includeNumbers) charset += numberCharset;
    if (includeSymbols) charset += symbolCharset;

    // Vérifie si la base d'entrée n'est pas vide avant de l'ajouter à la base de caractères
    if (baseInput.trim() !== '') {
        charset += baseInput;
    }

    var password = '';
    var baseLength = baseInput.length;
    var charsetLength = charset.length;

    if (charsetLength === 0) {
        document.getElementById('passwordOutput').innerText = 'Veuillez sélectionner au moins un type de caractères.';
        return; // Arrête l'exécution de la fonction si aucun type de caractères n'est sélectionné
    }

    // Place le mot de base aléatoirement dans le mot de passe
    var baseIndex = Math.floor(Math.random() * (length - baseLength + 1));

    for (var i = 0; i < length; i++) {
        if (i >= baseIndex && i < baseIndex + baseLength) {
            password += baseInput[i - baseIndex]; // Ajoute le caractère de la base d'entrée
        } else {
            var randomIndex = Math.floor(Math.random() * charsetLength);
            password += charset[randomIndex]; // Ajoute un caractère aléatoire du jeu de caractères
        }
    }

    document.getElementById('passwordOutput').innerText = 'Mot de passe généré : ' + password;
});
