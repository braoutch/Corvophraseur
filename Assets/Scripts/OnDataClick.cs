using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System;

public class OnDataClick : MonoBehaviour {

	bool isSelected = false;
	static GameObject supprimerBouton;

	// Use this for initialization
	void Start () {
		if(supprimerBouton == null)
		supprimerBouton = GameObject.FindWithTag("SupprimerBouton");
		supprimerBouton.SetActive(false);

	}
	
	// Update is called once per frame
	void Update () {

	}

	public void InitializeButton ()
	{
		int count = 0;

		Transform[] Objects = new Transform[gameObject.transform.parent.parent.childCount];
		Debug.Log("Ici on a combien d'éléments ? " + gameObject.transform.parent.parent.childCount);

		for(int i = 0 ; i < gameObject.transform.parent.parent.childCount ; i++)
		Objects[i] = gameObject.transform.parent.parent.GetChild(i).GetChild(int.Parse(gameObject.name));

		if(!isSelected)
		{
			Debug.Log("Touché le bouton " + gameObject.GetComponent<Text>().text);

			foreach(Transform thisObject in Objects)
			thisObject.GetChild(0).GetComponent<Image>().enabled = true;

		}
		else
		{
			foreach(Transform thisObject in Objects)
			thisObject.GetChild(0).GetComponent<Image>().enabled = false;
		}
		isSelected = !isSelected;

		count = 0;
		foreach(Transform thisObject in Objects)
		if (thisObject.GetChild(0).GetComponent<Image>().enabled == true)
		count++;

		if (count == 0)
		supprimerBouton.SetActive(false);
		else
		supprimerBouton.SetActive(true);

	}
}