document.addEventListener('DOMContentLoaded', function () {
    const passwordForm = document.getElementById('passwordForm');

    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        const length = document.getElementById('length').value;
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;
        const baseInput = document.getElementById('baseInput').value;

        // Générer le mot de passe
        const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols, baseInput);

        // Afficher le mot de passe sur la page
        const passwordOutput = document.getElementById('passwordOutput');
        passwordOutput.textContent = 'Mot de passe généré : ' + password;

        // Évaluer la force du mot de passe et afficher l'indicateur de sécurité
        evaluatePasswordStrengthAndDisplay(password);
    });

    // Fonction pour générer le mot de passe
// Fonction pour générer le mot de passe
function generatePassword(length, includeUppercase, includeNumbers, includeSymbols, baseInput) {
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
        return ''; // Retourne une chaîne vide si aucun type de caractères n'est sélectionné
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

    return password; // Retourne le mot de passe généré
}

    // Fonction pour évaluer la force du mot de passe et afficher l'indicateur de sécurité
    function evaluatePasswordStrengthAndDisplay(password) {
        var passwordStrength = evaluatePasswordStrength(password);

        // Affichage de l'indicateur de sécurité sur la page
        var strengthIndicator = document.getElementById('passwordStrengthIndicator');
        if (passwordStrength < 0) {
            strengthIndicator.innerText = 'Faible';
            strengthIndicator.style.color = 'red';
        } else if (passwordStrength < 4) {
            strengthIndicator.innerText = 'Moyen';
            strengthIndicator.style.color = 'orange';
        } else if (passwordStrength < 8) {
            strengthIndicator.innerText = 'Bon';
            strengthIndicator.style.color = 'green';
        } else {
            strengthIndicator.innerText = 'Parfait';
            strengthIndicator.style.color = 'blue';
        }
    }

// Fonction pour évaluer la force du mot de passe
function evaluatePasswordStrength(password) {
    var length = password.length;
    var complexity = 0;

    // Vérifie la longueur du mot de passe
    if (length < 6) {
        complexity -= 1;
    } else if (length >= 6 && length < 8) {
        complexity += 1;
    } else if (length >= 8 && length < 10) {
        complexity += 2;
    } else if (length >= 10 && length < 12) {
        complexity += 3;
    } else {
        complexity += 4;
    }

    // Vérifie la présence de différents types de caractères
    var hasLowercase = /[a-z]/.test(password);
    var hasUppercase = /[A-Z]/.test(password);
    var hasNumbers = /[0-9]/.test(password);
    var hasSymbols = /[^a-zA-Z0-9]/.test(password);

    var typesCount = (hasLowercase ? 1 : 0) + (hasUppercase ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);
    complexity += typesCount;

    // Vérifie s'il y a des séquences prévisibles
    var sequentialChars = /(123|abc|xyz|qwerty)/i.test(password);
    if (sequentialChars) {
        complexity -= 1;
    }

    return complexity;
}


});
