//#pragma strict
import System.Collections.Generic;
import UnityEngine.EventSystems;
import UnityEngine.UI;

///TOUT SUR LA BDD
//Nom de la base
var nomBase  : String = "Base.sqdb";
var maBase : dbAccess ; 
public var corvoTexte : GameObject;

//Nom des tables
var VerbTable: String = "VerbTable";
var AdjTable : String = "AdjTable";
var NomsTable: String = "NomsTable";
var PrefTable: String = "PrefTable";
var GabTable : String = "GabTable";

//Noms des colonnes de chaque table
var nomColonnesVerb = new Array ("Verbe", "Prefixe");
var nomColonnesAdj = new Array ("Masculin", "Feminin", "Prefixe");
var nomColonnesNoms = new Array ("Nom","Genre", "Prefixe");
var nomColonnesPref = new Array ("Prefixe");
var nomColonnesGab = new Array ("Gabarit");

var donneesBase : ArrayList = new ArrayList(); 	///LES LIGNES DE LA BASE LORS DE LA LECTURE

//On aura besoin du genre
var genreActuel;

//Et ça c'est pour l'édition / l'affichage de la base de donnée
var panels : GameObject[];
var inputField : GameObject;
var boutonGenre : GameObject;
var boutonPrefixe : GameObject;
var inputField2 : GameObject;

var nameTexts : GameObject[] ;
var verbTexts : GameObject[] ;
var adjTexts: GameObject[] ;
var prefText : GameObject;
var gabText : GameObject;

var namePrefab : GameObject;

///////AU DEBUT ON CREE LA TABLE SI ELLE N'EXISTE PAS
function Start () 
{
	var verbTable = VerbTable;	
	var adjTable = AdjTable;	
	var nomsTable = NomsTable;	
	var prefTable = PrefTable;	
	var gabTable = GabTable;	

	maBase = new dbAccess() ;
	maBase.OpenDB(nomBase);    
	var valeursColonnesVerb = new Array ("PRIMARY KEY","");
	var valeursColonnesAdj = new Array ("PRIMARY KEY","","");
	var valeursColonnesNoms = new Array ("PRIMARY KEY","","");
	var valeursColonnesPref = new Array ("PRIMARY KEY");
	var valeursColonnesGab = new Array ("PRIMARY KEY");

////////////////////////////////////////////////////////////
//////////DÉCOMMENTER POUR RECRÉER LA BASE//////////////////
////////////////////////////////////////////////////////////
// try
// {
// 	maBase.CreateTable (verbTable,nomColonnesVerb,valeursColonnesVerb);
// 	maBase.CreateTable (adjTable,nomColonnesAdj,valeursColonnesAdj);
// 	maBase.CreateTable (nomsTable,nomColonnesNoms,valeursColonnesNoms);
// 	maBase.CreateTable (prefTable,nomColonnesPref,valeursColonnesPref);
// 	maBase.CreateTable (gabTable,nomColonnesGab,valeursColonnesGab);
// }

// catch(e)
// {
// 	Debug.Log("Erreur normale : " + e);
// }


// var verbes = [["accéder", "2"], ["accélérer", "2"], ["ajuster", "2"], ["améliorer", "2"], ["amplifier", "2"], ["analyser", "2"], ["annuler", "2"], ["bouffoner", "2"], ["bouillir", "2"], ["calcifrer", "2"], ["compresser", "2"], ["créer", "2"], ["décélérer", "2"], ["décoder", "2"], ["décrypter", "2"], ["déstabiliser", "2"], ["détecter", "2"], ["diminuer", "2"], ["dupliquer", "2"], ["encoder", "2"], ["encrypter", "2"], ["fracasser", "2"], ["induire", "2"], ["inhiber", "2"], ["inverser", "2"], ["ioniser", "2"], ["moduler", "2"], ["neutraliser", "2"], ["optimiser", "2"], ["phaser", "2"], ["polariser", "2"], ["pournifier", "2"], ["réarranger", "2"], ["recombiner", "2"], ["recréer", "2"], ["rediriger", "2"], ["relayer", "2"], ["scanner", "2"], ["signaler", "2"], ["stabiliser", "2"], ["surcharger", "2"], ["transformer", "2"], ["trouer", "2"], ["zombifier", "2"]];
// var noms = [["aimant", "1", "2"], ["alignement", "1", "2"], ["amplificateur", "1", "2"], ["anihilateur", "1", "2"], ["capsule", "2", "2"], ["assimilateur", "1", "2"], ["balise", "2", "2"], ["bouclier", "1", "2"], ["bouffon", "1", "2"], ["buffer", "1", "2"], ["calcifrage", "1", "2"], ["capacité", "2", "2"], ["capilectomie", "2", "2"], ["causalité", "2", "2"], ["chambre", "2", "2"], ["champ", "1", "2"], ["champ de force", "1", "2"], ["coeur", "1", "2"], ["conduit", "1", "2"], ["configuration", "2", "2"], ["continuum", "1", "2"], ["convertisseur", "1", "2"], ["corridor", "1", "2"], ["crevasse", "2", "2"], ["cristal", "1", "2"], ["cybergement", "1", "2"], ["déflecteur", "1", "2"], ["désintégrateur", "1", "2"], ["détonateur", "1", "2"], ["diagnostic", "1", "2"], ["disrupteur", "1", "2"], ["distortion", "2", "2"], ["écho", "1", "2"], ["efficience", "2", "2"], ["émission", "2", "2"], ["endiguement", "1", "2"], ["énergie", "2", "2"], ["entité", "2", "2"], ["filament", "1", "2"], ["filtre", "1", "2"], ["flot", "1", "2"], ["flux", "1", "2"], ["force", "2", "2"], ["formation", "2", "2"], ["fragment", "1", "2"], ["fragmenticule", "1", "2"], ["fréquence", "2", "2"], ["gain", "1", "2"], ["générateur", "1", "2"], ["gicleur", "1", "2"], ["glomérule", "2", "2"], ["goniotron", "1", "2"], ["graviton", "1", "2"], ["grille", "2", "2"], ["hologramme", "1", "2"], ["impulsion", "2", "2"], ["incursion", "2", "2"], ["inducteur", "1", "2"], ["inertie", "1", "2"], ["inhibiteur", "1", "2"], ["laplaxmol", "1", "2"], ["matiere", "2", "2"], ["matrice", "2", "2"], ["mécanisme", "1", "2"], ["mine", "2", "2"], ["mitochondrie", "2", "2"], ["moteur", "1", "2"], ["moulinotron", "1", "2"], ["multiplexeur", "1", "2"], ["nacelle", "2", "2"], ["noyau", "1", "2"], ["nuage", "1", "2"], ["ordinateur", "1", "2"], ["papsouille", "2", "2"], ["parallax", "1", "2"], ["particule", "2", "2"], ["plasma", "1", "2"], ["plutonneur", "1", "2"], ["porteuse", "2", "2"], ["poussée", "2", "2"], ["radiation", "2", "2"], ["rayon", "1", "2"], ["réhausseur", "1", "2"], ["relai", "1", "2"], ["rémouleur", "1", "2"], ["réplicateur", "1", "2"], ["réplication", "2", "2"], ["réseau", "1", "2"], ["résonnateur", "1", "2"], ["ressort", "1", "2"], ["rotation", "2", "2"], ["schisme", "1", "2"], ["séquence", "2", "2"], ["signal", "1", "2"], ["signature", "2", "2"], ["singularité", "2", "2"], ["sonde", "2", "2"], ["spouniseur", "1", "2"], ["survolteur", "1", "2"], ["sustentation", "2", "2"], ["syntagme", "1", "2"], ["tachyon", "1", "2"], ["transistor", "1", "2"], ["translateur", "1", "2"], ["transporteur", "1", "2"], ["trigloide", "1", "2"], ["trophoblaste", "1", "2"], ["tropisme", "1", "2"], ["tube", "1", "2"], ["tunnel", "1", "2"], ["turbulence", "1", "2"], ["vagissement", "1", "2"], ["vague", "2", "2"], ["vibration", "2", "2"], ["vide", "1", "2"], ["vortex", "1", "2"]];
// var adjectifs = [["à court rayon d''action", "à court rayon d''action", "0"], ["à grand rayon d''action", "à grand rayon d''action", "0"], ["à haute vitesse", "à haute vitesse", "0"], ["adaptatif", "adaptative", "2"], ["alternatif", "alternative", "2"], ["alvéolé", "alvéolée", "2"], ["artificiel", "artificielle", "2"], ["atomique", "atomique", "2"], ["baleiné", "baleinée", "2"], ["ballistique", "ballistique", "2"], ["basse vitesse", "basse vitesse", "2"], ["binaire", "binaire", "2"], ["bouffoné", "bouffonée", "2"], ["calorifique", "calorifique", "2"], ["carpien", "carpienne", "2"], ["centrique", "centrique", "2"], ["compressé", "compressée", "2"], ["connotatif", "connotative", "2"], ["corporel", "corporelle", "2"], ["cythérien", "cythérienne", "2"], ["dimensionnel", "dimensionnelle", "2"], ["directionnel", "directionnelle", "2"], ["dirigé", "dirigée", "2"], ["dynamique", "dynamique", "2"], ["encrypté", "encryptée", "2"], ["génique", "génique", "2"], ["gildoique", "gildoique", "2"], ["gravifique", "gravifique", "2"], ["gravitationnel", "gravitationnelle", "2"], ["holographique", "holographique", "2"], ["instable", "instable", "2"], ["interstellaire", "interstellaire", "2"], ["ionisé", "ionisée", "2"], ["linéaire", "linéaire", "2"], ["localisé", "localisée", "2"], ["magnétique", "magnétique", "2"], ["mécanique", "mécanique", "2"], ["microscopique", "microscopique", "2"], ["modulaire", "modulaire", "2"], ["moléculaire", "moléclaire", "2"], ["moncturien", "moncturienne", "2"], ["navigationnel", "navigationnelle", "2"], ["oblatif", "oblative", "2"], ["ossiphazolé", "ossiphazolée", "2"], ["parabolique", "parabolique", "2"], ["parallele", "parallele", "2"], ["phasé", "phasée", "2"], ["phasique", "phasique", "2"], ["plutonnant", "plutonnante", "2"], ["plutonné", "plutonnée", "2"], ["pourniflant", "pourniflante", "2"], ["quantique", "quantique", "2"], ["refroidi", "refroidie", "2"], ["réplicatif", "réplicative", "2"], ["résistant", "résistante", "2"], ["résonnant", "résonnante", "2"], ["spatial", "spatiale", "2"], ["spinoidal", "spinoidale", "2"], ["statique", "statique", "2"], ["stellaire", "stellaire", "2"], ["temporel", "temporelle", "2"], ["trigloidal", "trigloidale", "2"], ["valvué", "valvuée", "2"], ["véloce", "véloce", "2"], ["vibratile", "vibratile", "2"]];
// var prefixes = ["aéro", "ana", "anti", "auto", "bi", "bulbo", "capillo", "crypto", "extra", "hepta", "hétéro", "homo", "méta", "micro", "morpho", "morvo", "multi", "néo", "non", "nucléo", "octo", "penta", "poly", "proto", "pseudo", "puslo", "quadri", "rétro", "servo", "spiro", "sub", "sur", "thermo", "theta", "trans", "tri", "turbo", "ultra"];
// var gabarits = ["Si nous pouvons [v] [n] [a], nous devrions pouvoir [v] [n] [a] et [v] [n] [a] !", "Capitaine, je ne peux pas [v] [n] parce que [n] [a] est sur le point [d] [n] [a] !", "[v] [n] [a] est illogique, puisque [n] [a] va [v] [n] [a].", "Il est possible que [n] [a] puisse [v] [n] [a], mais seulement si nous pouvons [v] [n] [a] et [v] [n] [a] !", "Pas de panique ! [v] [n] [a] ne nous empêche pas [d] [n] [a] ni même [d] [n] [a].", "Voici [n] [a] dont il est temps [d] [n] [a] sans oublier [d] [n] [a].", "Damned, [n] [a] ne peut pas [v] [n] [a] ! Nous allons être obligé [d] [n] [a]...", "Tout va bien a bord. [n] [a] semble [v] correctement. Mais nous devrions [v] [n] [a] pour plus de sécurité.", "Alerte ! [n] [a] semble [v] dangereusement ! Il faut [v] [n] [a] d''urgence !!!", "Veuillez [v] [n] [a] avant [d] sciemment."];

// 	for(var element in verbes)
// 	{
// 		for (var i =0; i < element.Length ; i++)
// 			element[i] = "'"+element[i] +"'";

// 		maBase.InsertInto(verbTable,element);
// 	}


// 	for(var element in adjectifs)
// 	{
// 		for (var subElement in element)
// 			subElement = "'"+subElement +"'";

// 		maBase.InsertInto(adjTable,element);
// 	}

// 	for(var element in noms)
// 	{
// 		for (var subElement in element)
// 			subElement = "'"+subElement +"'";

// 		maBase.InsertInto(nomsTable,element);
// 	}

// 	for(var element in prefixes)
// 	{
// 		var arrayElement = ["'"+element+"'"];
// 		maBase.InsertInto(prefTable,arrayElement);
// 	}

// 	for(var element in gabarits)
// 	{
// 		var arrayElement2 = ["'"+element+"'"];
// 		maBase.InsertInto(gabTable,arrayElement2);
// 	}

NewCorvoPhrase();
MakeDisplay();

}

function OnApplicationQuit()
{
	maBase.CloseDB();
}


public function NewCorvoPhrase()
{

	//On récupère un gabarit aléatoire
	var gabarit : String ;
	gabarit = FindGabarit();

 	//n le découpe pour chercher de quoi on a besoin
 	var gabaritSplit : String[];
 	gabaritSplit = gabarit.Split(" "[0]);

	//Et ensuite on passe aux choses sérieuses
	for(var i = 0 ; i < gabaritSplit.Length ; i++)
	{
		//Les verbes -/-/-////////////////
		if(gabaritSplit[i] == "[v]" || gabaritSplit[i] == "[d]")
		{
			//Debug.Log("Trouvé un verbe !");
			var verbe = FindVerb();

			if(verbe[1] == "1")
				verbe[0] = AddPrefixe(verbe[0]);

			else
			{
				if(Mathf.Sign(Random.Range(-1f,1f)) == 1)
					verbe[0] = AddPrefixe(verbe[0]);
			}

			if(i==0)
				verbe[0] = char.ToUpper(verbe[0][0]) + verbe[0].Substring(1);

			var preposition : String = "";
			if(gabaritSplit[i] == "[d]")
			{
				if(verbe[0].StartsWith("a") || verbe[0].StartsWith("e") || verbe[0].StartsWith("i") || verbe[0].StartsWith("o") || verbe[0].StartsWith("u") || verbe[0].StartsWith("é")|| verbe[0].StartsWith("ê"))
					preposition = "d'";
				else
					preposition = "de ";

				verbe[0] = preposition + verbe[0];
				var regexVerbe = new Regex(Regex.Escape("[d]"));
				gabarit = regexVerbe.Replace(gabarit, verbe[0], 1);
			}
			else
			{
				var regexVerbed = new Regex(Regex.Escape("[v]"));
				gabarit = regexVerbed.Replace(gabarit, verbe[0], 1);
			}

			Debug.Log("Le verbe trouvé sera " + verbe[0]);

		}


		//Les noms -/-/-/////////////
		if(gabaritSplit[i] == "[n]")
		{
			var nom = FindNom();

			if(nom[1] == "1")
				nom[0] = AddPrefixe(nom[0]);

			else
			{
				if(Mathf.Sign(Random.Range(-1f,1f)) == 1)
					nom[0] = AddPrefixe(nom[0]);
			}

			Debug.Log("Trouvé un nom ! Ce sera à priori " + nom[0]);


			if (nom[0].StartsWith("a") || nom[0].StartsWith("e") || nom[0].StartsWith("i") || nom[0].StartsWith("o") || nom[0].StartsWith("u")|| nom[0].StartsWith("é")|| nom[0].StartsWith("ê"))
				nom[0] = "l'" + nom[0];

			else 
			{
				Debug.Log("Ce nom commence par une consomne !");
				if(genreActuel == 1)
					nom[0] = "le " + nom[0];

				if(genreActuel == 2)
					nom[0] = "la " + nom[0];
			}

			//Debug.Log("Le nom trouvé sera " + nom[0]);
			var regexNom = new Regex(Regex.Escape("[n]"));
			gabarit = regexNom.Replace(gabarit, nom[0], 1);
		}

			//Les adjectifs -/-/-/////////
			if(gabaritSplit[i].StartsWith("[a]"))
			{
				Debug.Log("Trouvé un adjectif !");
				var adjectif = FindAdjectif();
				
				//Debug.Log("L'adjectif trouvé sera " + adjectif[0]);

				//On remplace
				var regexAdj = new Regex(Regex.Escape("[a]"));
				gabarit = regexAdj.Replace(gabarit, adjectif[0], 1);
			}

		}

		gabarit = "''" + " " + gabarit + " " + " ''" ;   
		corvoTexte.GetComponent(Text).text = gabarit;

	}

	function FindGabarit()
	{
		donneesBase = maBase.ReadFullTable(GabTable);

		var index : int = Random.Range(0,donneesBase.Count);
		var gabSelected : String = donneesBase[index][0];
		return gabSelected;
	}

	function FindVerb()
	{
		donneesBase = maBase.ReadFullTable(VerbTable);

		var index : int = Random.Range(0,donneesBase.Count);
		var verbSelected : String = donneesBase[index][0];
		var prefixeOrNot : String = donneesBase[index][1];
		return [verbSelected,prefixeOrNot];
	}

	function AddPrefixe(mot : String)
	{
		donneesBase = maBase.ReadFullTable(PrefTable);
		var index : int = Random.Range(0,donneesBase.Count);
		var prefSelected : String = donneesBase[index][0];
		mot = prefSelected + "-" + mot ;
		return mot;
	}

	function FindNom()
	{
		donneesBase = maBase.ReadFullTable(NomsTable);

		var index : int = Random.Range(0,donneesBase.Count);
		var nomSelected : String = donneesBase[index][0];
		genreActuel = int.Parse(donneesBase[index][1]);
		var prefixeOrNot : String = donneesBase[index][2];

			//////////////

			//IL MANQUE LE DÉTERMINANT

			//////////////
			return [nomSelected,prefixeOrNot];
		}

		function FindAdjectif()
		{
			donneesBase = maBase.ReadFullTable(AdjTable);
			var index : int = Random.Range(0,donneesBase.Count);
			var adjSelected : String = donneesBase[index][genreActuel - 1];

			return [adjSelected,donneesBase[index][2]];
		}

		public function CopyToSystem(){
			GUIUtility.systemCopyBuffer = corvoTexte.GetComponent(Text).text;
		}

		function MakeDisplay()
		{
			var goToDestroy = GameObject.FindGameObjectsWithTag("Display");
			for(var element in goToDestroy)
				Destroy(element);
			var textPrefab : GameObject;

			///------Noms-------/////
			donneesBase = maBase.ReadFullTable(NomsTable);
			var count = 0;
			for(var element in donneesBase)
			{
				//Première colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(nameTexts[0].transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[0][0]) + element[0].Substring(1);
				
				//Deuxième colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(nameTexts[1].transform);
				if(element[1] == "1")
					textPrefab.GetComponent(Text).text = "Masculin";
				else if(element[1] == "2")
					textPrefab.GetComponent(Text).text = "Féminin";

				//Deuxième colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(nameTexts[2].transform);
				
				if(element[2] == "1")
					textPrefab.GetComponent(Text).text = "Préfixe obligatoire";

				else if(element[2] == "2")
					textPrefab.GetComponent(Text).text = "Préfixe aléatoire";

				count ++;
			}

			///------Verbes------//////
			donneesBase = maBase.ReadFullTable(VerbTable);

			for(var element in donneesBase)
			{
				//Première colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(verbTexts[0].transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[0][0]) + element[0].Substring(1);

				//Deuxième colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(verbTexts[1].transform);
				if(element[1] == "1")
					textPrefab.GetComponent(Text).text = "Préfixe obligatoire";
				else if(element[1] == "2")
					textPrefab.GetComponent(Text).text = "Préfixe aléatoire";
			}

			///------Adjectifs------//////
			donneesBase = maBase.ReadFullTable(AdjTable);

			for(var element in donneesBase)
			{
				//Première colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(adjTexts[0].transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[0][0]) + element[0].Substring(1);

				//Deuxième colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(adjTexts[1].transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[1][0]) + element[1].Substring(1);

				//Troisième colonne ne sert à rien 
				// textPrefab = Instantiate(namePrefab) as GameObject;
				// textPrefab.transform.SetParent(adjTexts[2].transform);
				// if(element[1] == "1")
				// 	textPrefab.GetComponent(Text).text = "Préfixe obligatoire";
				// else if(element[1] == "2")
				// 	textPrefab.GetComponent(Text).text = "Préfixe aléatoire";

			}

			///------Préfixes------//////
			donneesBase = maBase.ReadFullTable(PrefTable);

			for(var element in donneesBase)
			{
				//Première colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(prefText.transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[0][0]) + element[0].Substring(1);

			}

			///------Gabarits------//////
			donneesBase = maBase.ReadFullTable(GabTable);

			for(var element in donneesBase)
			{
				//Première colonne
				textPrefab = Instantiate(namePrefab) as GameObject;
				textPrefab.transform.SetParent(gabText.transform);
				textPrefab.GetComponent(Text).text = char.ToUpper(element[0][0]) + element[0].Substring(1);
			}
		}

		function AjouterALaBase()
		{
			var tableToUse : String;
			var genre : String;
			var prefixe : String;


			if(panels[0].activeSelf)
				tableToUse = NomsTable;
			if(panels[1].activeSelf)
				tableToUse = VerbTable;
			if(panels[2].activeSelf)
				tableToUse = AdjTable;
			if(panels[3].activeSelf)
				tableToUse = PrefTable;
			if(panels[4].activeSelf)
				tableToUse = GabTable;

			var value = inputField.GetComponent(Text).text;
			value = "'"+ value +"'";
			var ArrayValue : String[];

			if(tableToUse == NomsTable)
			{
				Debug.Log("On est dans les noms !");
				if(boutonGenre.GetComponent(Text).text == "Féminin")
					genre = "2";
				else
					genre = "1";

				if(boutonPrefixe.GetComponent(Text).text == "Préfixe aléatoire")
					prefixe = "2";
				else
					prefixe = "1";

				ArrayValue = [value,genre,prefixe];

			}

			else if(tableToUse == VerbTable)
			{
				if(boutonPrefixe.GetComponent(Text).text == "Préfixe aléatoire")
					prefixe = "2";
				else
					prefixe = "1";

				ArrayValue = [value,prefixe];
			}

			else if(tableToUse == AdjTable)
			{
				ArrayValue = [value,inputField2.GetComponent(Text).text,"2"];
			}
			else
				ArrayValue = [value];

			Debug.Log(ArrayValue[0] + " - " + ArrayValue[1] + " - " + ArrayValue[2]);

			maBase.InsertInto(tableToUse,ArrayValue);


			MakeDisplay();
		}



/*




/////SUPPRIMER UN UTILISATEUR
public function BoutonDelete()
[	
	DeletingUser = !DeletingUser;
	
	if(DeletingUser)
	[
		Debug.Log("Delete mode ON");
		deleteButton.GetComponent(Button).image.color = Color.green;	
		for(var player in playerList)
		[
			player.GetComponent(Button).image.color = new Color(1,0.8,0.8);		
		]
	]
	else
	[
		Debug.Log("Delete mode OFF");
		deleteButton.GetComponent(Button).image.color = Color.white;		////On regarde quel bouton est sélectionné
		for(var player in playerList)
		[
			player.GetComponent(Button).image.color = Color.white;		

		]

	]	
]

function MakeDisplay()
[
	DestroyOld();
	donneesBase = maBase.ReadFullTable(PlayerTable);
	for(var i = 0; i < donneesBase.Count;i++)
	[
		var boutonInstance : GameObject = Instantiate(prefabButton) as GameObject;
		
		boutonInstance.transform.SetParent(prefabParent.transform);
		boutonInstance.transform.localScale = new Vector3(1,1,1);
		playerList.Add(boutonInstance);
		boutonInstance.transform.GetChild(0).GetComponent(Text).text = donneesBase[i][1].ToString();
	]
]

function DestroyOld()
[
	for (var button in playerList)
		Destroy(button);
	playerList.Clear();
]

public function BuildRecentGamesList(dataObtained)
[
	//Debug.Log(dataObtained + " is my data.,  its length is " + dataObtained.Count + "," + dataObtained[0].Count);

	for(var i = 0 ; i < dataObtained.Count ; i ++)
	[
		var colonneV = [dataObtained[i][0],dataObtained[i][1],dataObtained[i][2],dataObtained[i][3],dataObtained[i][4],dataObtained[i][5],dataObtained[i][6],dataObtained[i][7],dataObtained[i][8]];

		for (var j = 0 ; j < colonneV.Length ; j++ )
			colonneV[j] = "'"+colonneV[j] +"'";

		maBase.InsertInto(MostPlayedChampTable,colonneV);
	]

	var donneeBase : ArrayList = new ArrayList();
	donneeBase = maBase.ReadFullTableOrdered(MostPlayedChampTable,"NumberPlayed");


	for(var m = 1; m < donneeBase.Count ; m++)
	[
		var boutonInstance : GameObject = Instantiate(prefabRecentGames) as GameObject;

		boutonInstance.transform.SetParent(prefabParentRecentGames.transform);
		boutonInstance.transform.localScale = new Vector3(1,1,1);
		//playerList.Add(boutonInstance);
		boutonInstance.transform.GetChild(0).GetComponent(Text).text = donneeBase[m][1].ToString();
		boutonInstance.transform.GetChild(1).GetComponent(Text).text = " ( " + donneeBase[m][3].ToString() + " / "+ donneeBase[m][4].ToString() + " / " + donneeBase[m][5].ToString() + " ) " + " - "  + " (" + donneeBase[m][8].ToString() + ") " + "  " + donneeBase[m][6].ToString() + "-" + donneeBase[m][7].ToString() + "  ";
	]

	
]

public static function ClearTable(table : String)
[
	maBase.ClearTable(table);
	]*/




