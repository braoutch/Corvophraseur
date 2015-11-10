using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TabSelection : MonoBehaviour {

	public GameObject[] panels;
	public GameObject popUp;

	//Boutons d'édition
	public GameObject prefixeBouton;
	public GameObject genreBouton;
	public GameObject secondInputField;


	// Use this for initialization
	void Start () {
		popUp.SetActive(false);
	}
	
	// Update is called once per frame
	void Update () {

	}

	public void TabSelect(int tabNumber)
	{
		foreach(GameObject panel in panels)
		panel.SetActive(false);
		panels[tabNumber].SetActive(true);

		//Les boutons à activer / désactiver
		if(tabNumber == 0)
		{
			prefixeBouton.transform.parent.gameObject.SetActive(true);
			genreBouton.transform.parent.gameObject.SetActive(true);
			secondInputField.SetActive(false);
		}
		if(tabNumber == 1)
		{
			prefixeBouton.transform.parent.gameObject.SetActive(true);
			genreBouton.transform.parent.gameObject.SetActive(false);
			secondInputField.SetActive(false);
		}
		if(tabNumber == 2)
		{
			prefixeBouton.transform.parent.gameObject.SetActive(false);
			genreBouton.transform.parent.gameObject.SetActive(false);
			secondInputField.SetActive(true);
		}
		if(tabNumber == 3)
		{
			prefixeBouton.transform.parent.gameObject.SetActive(false);
			genreBouton.transform.parent.gameObject.SetActive(false);
			secondInputField.SetActive(false);
		}
		if(tabNumber == 4)
		{
			prefixeBouton.transform.parent.gameObject.SetActive(false);
			genreBouton.transform.parent.gameObject.SetActive(false);
			secondInputField.SetActive(false);
		}



	}

	public void CallPopUp(bool value)
	{
		popUp.SetActive(value);
	}

	public void PrefixeBouton()
	{
		if(prefixeBouton.GetComponent<Text>().text == "Préfixe aléatoire")
		prefixeBouton.GetComponent<Text>().text = "Préfixe obligatoire";
		else if(prefixeBouton.GetComponent<Text>().text == "Préfixe obligatoire")
		prefixeBouton.GetComponent<Text>().text = "Préfixe aléatoire";
	}

	public void GenreBouton()
	{
		if(genreBouton.GetComponent<Text>().text == "Masculin")
		genreBouton.GetComponent<Text>().text = "Féminin";
		else if(genreBouton.GetComponent<Text>().text == "Féminin")
		genreBouton.GetComponent<Text>().text = "Masculin";
	}

}
