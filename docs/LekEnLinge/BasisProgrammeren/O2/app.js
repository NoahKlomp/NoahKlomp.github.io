const geheim = generateRandomPassword();
var invoer = await input("geef een wachtwoord:");
let code = `
    if (geheim == "` + invoer + `") { 
        window.alert("Toegang verleend."); 
    } else { 
        window.alert("Toegang geweigerd."); 
    }`;

show(code);
eval(code);
