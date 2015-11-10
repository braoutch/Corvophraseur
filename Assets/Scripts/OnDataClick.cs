using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System;

public class OnDataClick : MonoBehaviour {

	bool isSelected = false;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {

	}

	public void InitializeButton ()
	{
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

		
	}
}