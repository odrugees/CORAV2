using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;


public class RecordarContrasenia : MonoBehaviour
{
	public GameObject ifnombre;
	public GameObject ifapellido;
	public GameObject ifcorreo;
	public GameObject btnenviar;
	public Text textMensaje;

	public Button BtnEnviar;

	private string ifNombre;
	private string ifApellido;
	private string ifCorreo;

	// Start is called before the first frame update
	void Start()
	{
		Screen.orientation = ScreenOrientation.Portrait;

		BtnEnviar = btnenviar.GetComponent<Button>();
		BtnEnviar.onClick.AddListener(enviarDatos);

		textMensaje.text = "";
	}

	// Update is called once per frame
	void Update()
	{
		if (Application.platform == RuntimePlatform.Android)
		{
			if (Input.GetKeyDown(KeyCode.Escape))
			{
				SceneManager.LoadScene(0);
			}
		}
	}

	[Serializable]

	public class DetalleRespuesta
	{
		public int status;
		public string message;
	}

	private void enviarDatos()
	{
		ifNombre = ifnombre.GetComponent<InputField>().text;
		ifApellido = ifapellido.GetComponent<InputField>().text;
		ifCorreo = ifcorreo.GetComponent<InputField>().text;

		if (ifNombre != "" && ifApellido != "" && ifCorreo != "")
		{
			StartCoroutine(recordarContrasenia(ifNombre, ifApellido, ifCorreo));
		}
		else
		{
			textMensaje.text = "Debe ingresar todos los datos";
			return;
		}
	}

	public IEnumerator recordarContrasenia(string ifNombre, string ifApellido, string ifCorreo)
	{
		WWWForm form = new WWWForm();
		form.AddField("usuarioNombre", ifNombre);
		form.AddField("usuarioApellido", ifApellido);
		form.AddField("usuarioCorreo", ifCorreo);

		 UnityWebRequest www = UnityWebRequest.Post("https://cora-app.herokuapp.com/usuario/restaurarContrasena", form);

		yield return www.SendWebRequest();

		if (www.isNetworkError || www.isHttpError)
		{
			Debug.Log(www.error);
		}
		else
		{
			Debug.Log(www.downloadHandler.text);

			DetalleRespuesta detalleRespuesta = JsonUtility.FromJson<DetalleRespuesta>(www.downloadHandler.text);
			if (detalleRespuesta.status == 1)
			{
				StartCoroutine(EnviarCorreo(ifCorreo, detalleRespuesta.message));
			}
			else
			{
				textMensaje.text = detalleRespuesta.message;
			}
		}

	}

	public IEnumerator EnviarCorreo(string ifCorreo, string nuevaContrasenia)
	{
		WWWForm form = new WWWForm();
		string textMail = "Se ha restaurado el usuario con la siguente contraseña " + "\r\n" + nuevaContrasenia + "\r\n" + "Se recomienda que cambie esta contraseña inmediatamente ingrese a la aplicacion";
		form.AddField("destinatario", ifCorreo);
		form.AddField("asunto", "Contraseña temporal CORA");
		form.AddField("texto", textMail);

		UnityWebRequest www = UnityWebRequest.Post("https://cora-app.herokuapp.com/correo", form);

		yield return www.SendWebRequest();

		if (www.isNetworkError || www.isHttpError)
		{
			Debug.Log(www.error);
		}
		else
		{
			Debug.Log(www.downloadHandler.text);

			DetalleRespuesta detalleRespuesta = JsonUtility.FromJson<DetalleRespuesta>(www.downloadHandler.text);
			if (detalleRespuesta.status == 1)
			{
				textMensaje.text = "Se le ha enviado un correro con la nueva contraseña";			
			}
			else
			{
				textMensaje.text = detalleRespuesta.message;
			}
		}
	}
}
