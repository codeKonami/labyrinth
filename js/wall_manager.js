game.WallManager = me.Container.extend({
  init: function (level) {
    this._super(me.Container, "init", [0, 0, (level*10 + 5)*32, (level*10 + 5)*32]);
  },
  createWalls: function (level) {

    var _tailleMax = 5;
    if(level == 0){
      _tailleMax = 5;
    } else if(level == 1){
      _tailleMax = 9;
    } else {
      _tailleMax = (level - 1)*10 + 5;
    }


    /*
    ** Formule de génération des maps
    ** (level - 1)*10 + 5
    */
    var map = new Array(_tailleMax);
    var pile = new Array();
    var x, y , k, l, temp,fin, nbVoisins, dir;
    var voisins = new Array(4);

    // Comme le calcul va être fait de nombreuses fois, on stocke le tout
    var maxTailleMax = _tailleMax-1;

    //On définit les bordures horizontales et on
    for(x = 0; x < _tailleMax; x++){
        //Nécessaire en JS pour gérer les tableaux à 2 dimensions
        map[x] = new Array(_tailleMax);
        map[0][x] = map[x][0] = 2;
        //dessinerCarre(_tailleMax, _couleur.C_2, ctx, x, y)
    }

    //Generation du reste du labyrinthe
    for(y = 2; y < _tailleMax; y=y+2){
        for(x = 2; x < _tailleMax; x=x+2){
            map[x][y-1] = 2;
            map[x-1][y] = 2;
            map[x][y] = 2;

        }
    }
    // Coordonnées aléatoire du début du chemin
    temp = Math.floor((_tailleMax-2)/2);
    x = Math.floor(Math.random()*temp)*2+1;
    y = Math.floor(Math.random()*temp)*2+1;
    do{
        fin = false;
        while(!fin){
            map[x][y] = 1;
            //Recherche des voisins libres
            nbVoisins = 0; //Dans un premier temps, aucun voisin n'a été trouvé
            //On test chaque case voisine, si la case est vide, on stocke sa direction dans un tableau
            if (( y-2 >= 1)&&( map[x][y-2] != 1 ))               voisins[nbVoisins++] = 0;
            if (( y+2 <= maxTailleMax)&&( map[x][y+2] != 1 ))    voisins[nbVoisins++] = 2;
            if (( x+2 <= maxTailleMax)&&( map[x+2][y] != 1 ))    voisins[nbVoisins++] = 1;
            if (( x-2 >= 1)&&( map[x-2][y] != 1 ))               voisins[nbVoisins++] = 3;

            //Si aucun voisin libre n'a été trouvé, on s'arrête là
            if(nbVoisins == 0 )fin = true;

            //Sinon, on cherche la prochaine case à visiter
            else{
                //Initialisation de la future direction de la case
                k = l = 0;
                //On empile le contexte de la case actuelle, pour revenir dessus ensuite
                pile.push(x);
                pile.push(y);
                //On choisit une direction selon celles stockées précédemment dans le tableau
                dir = voisins[Math.floor(Math.random()*nbVoisins)];
                switch(dir){
                    case 0 :
                        l -= 2;
                        break;
                    case 1 :
                        k += 2;
                        break;
                    case 2 :
                        l += 2;
                        break;
                    case 3 :
                        k -= 2;
                        break;
                    default :
                        break;
                }
                //On retire le mur situé entre l'ancienne et la nouvelle case
                map[x+k/2][y+l/2] = 0;
                //On redéfinit les coordonnées de la case courante
                x += k;
                y += l;
            }
        }
        //Dans la mesure ou auncun voisin n'a été trouvé, on dépile afin de repartir
        //sur une autre case précédemment visitée
        y = pile.pop();
        x = pile.pop();
    }
    while(pile[0]);


    //Définition du départ et arrivée du laby
    map[1][1] = 0;
    map[_tailleMax-2][maxTailleMax] = 4;

    for(var y = 0; y < _tailleMax; y++){
        for(var x = 0; x < _tailleMax; x++){
            // Utilisation d'un switch, plus pratique qu'une indexation
            // lors de la présence de cas particuliers
            switch(map[x][y]){
                case 0 :
                    this.addChild(me.pool.pull("floor", x*32, y*32));
                    break;
                case 1 :
                    this.addChild(me.pool.pull("floor", x*32, y*32));
                    break;
                case 2 :
                    this.addChild(me.pool.pull("wall", x*32, y*32));
                    break;
                case 3 :
                    //this.addChild(me.pool.pull("man", x*32, y*32));
                    break;
                case 4 :
                    this.addChild(me.pool.pull("exit", x*32, y*32));
                    break;
                default :

                    break;
            }
        }
    }
  }
});
