function myFunction() {
    var fName = (document.getElementById("fname").value).toLowerCase();
    var lName = (document.getElementById("lname").value).toLowerCase();
    var bDay = parseInt(document.getElementById("day").value);
    var bMonth = parseInt(document.getElementById("month").value);
    var bYear = parseInt(document.getElementById("year").value);
    
    
    function letToNum(whatString){
        var gtype = 2;
        for (var i = 0; i < whatString.length; i++) { 
            gtype = gtype + (whatString[i]).charCodeAt() - 96;
        }
        return gtype;
    }
    
    function mixedDedicated(entry){
        if ((entry%3) == 1){
            return "single type";
        }
        else{
            return "mixed";
        }
    }
    
    
    var pTypes = ["Normal", "Grass", "Fire", "Water", "Electric", "Rock", "Fighting", 
    "Psychic", "Ghost", "Poison", "Dragon", "Ice", "Dark", "Bug", "Fairy", "Flying", 
    "Ground", "Steel"];
    
    var playerFavType = pTypes[letToNum(lName) % 18];
    var multitype = mixedDedicated(letToNum(fName))+ " ";
    
    var firstP = 1 + ( ( (letToNum(fName)  )  * (parseInt(bMonth)+parseInt(bDay))%721));
    var secondP = 1 + ( ((parseInt(bYear)*2) - ((parseInt(bDay)*2) ))%721);
    var thirdP =  1 + ((parseInt(bYear) + (parseInt(bMonth)))%721);
    var fourthP =  1 + ((parseInt(bYear) * (parseInt(bMonth)))%721);
    var fifthP =  (parseInt(bDay)*2) + (parseInt(bMonth)*3)%721;
    var sixthP =  1 + (letToNum(fName)%721);
    
    
    
    var demo= document.getElementById("demo");
    demo.innerHTML = "You would most likely be a " + multitype + playerFavType
        + " Pokemon - Trainer.  Look up pokemon numbers: " 
        + "<a href='/pokemonnum/"+firstP+"' target='_blank'>"+firstP+"</a>, " 
        + "<a href='/pokemonnum/"+secondP+"' target='_blank'>"+secondP+"</a>, " 
        + "<a href='/pokemonnum/"+thirdP+"' target='_blank'>"+thirdP+"</a>, "
        + "<a href='/pokemonnum/"+fourthP+"' target='_blank'>"+fourthP+"</a>, " 
        + "<a href='/pokemonnum/"+fifthP+"' target='_blank'>"+fifthP+"</a> and " 
        + "<a href='/pokemonnum/"+sixthP+"' target='_blank'>"+sixthP+"</a> ";
        
    var elem = document.createElement("img");
    elem.setAttribute("src", "./static/img/"+playerFavType.toLowerCase()+".png");
    elem.setAttribute("height", "200");
    elem.setAttribute("width", "400");
    elem.setAttribute("alt", "Image");
    demo.appendChild(elem);
    demo.style.backgroundColor= "rgba(241, 241, 241, 0.5)";
    
    
}