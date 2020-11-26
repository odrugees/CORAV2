using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;


public class CrearUsuario : MonoBehaviour
{
    public GameObject ifnombre;
    public GameObject ifapellido;
    public GameObject ifcorreo;
    public GameObject ifcontrasenia;
    public GameObject ifconfirmaContrasenia;
    public GameObject btnconfirmar;
    public GameObject btncancelar;
    public Text textMensaje;

   

    private string ifNombre;
    private string ifApellido;
    private string ifCorreo;
    private string ifContrasenia;
    private string ifConfirmaContrasenia;

    public Button BtnConfirmar;
    public Button BtnCancelar;

    // Start is called before the first frame update
    void Start()
    {
        Screen.orientation = ScreenOrientation.Portrait;

        BtnConfirmar = btnconfirmar.GetComponent<Button>();
        BtnConfirmar.onClick.AddListener(validarCreacion);

        BtnCancelar = btncancelar.GetComponent<Button>();
        BtnCancelar.onClick.AddListener(cancelarCreacion);

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

    private void validarCreacion()
    {
        ifNombre = ifnombre.GetComponent<InputField>().text;
        ifApellido = ifapellido.GetComponent<InputField>().text;
        ifCorreo = ifcorreo.GetComponent<InputField>().text;
        ifContrasenia = ifcontrasenia.GetComponent<InputField>().text;
        ifConfirmaContrasenia = ifconfirmaContrasenia.GetComponent<InputField>().text;

        if (ifNombre !="" && ifApellido != "" && ifCorreo != "" && ifContrasenia != "" && ifConfirmaContrasenia != "")
        {
            if(ifContrasenia.Equals(ifConfirmaContrasenia))
            {
                StartCoroutine(nuevoUsuario(ifNombre, ifApellido, ifCorreo, ifContrasenia));
            }
            else
            {
                textMensaje.text = "Los campos de contraseña deben ser iguales";
                return;
            }

        }
        else
        {
            textMensaje.text = "Debe ingresar todos los datos";
            return;
        }
    }

    public IEnumerator nuevoUsuario(string ifNombre,string ifApellido,string ifCorreo,string ifContrasenia)
    {
        WWWForm form = new WWWForm();
        form.AddField("usuarioNombre", ifNombre);
        form.AddField("usuarioApellido", ifApellido);
        form.AddField("usuarioCorreo", ifCorreo);
        form.AddField("usuarioContrasenia", ifContrasenia);
        form.AddField("usuarioTipo", "Participante");
        
        UnityWebRequest www = UnityWebRequest.Post("https://cora-app.herokuapp.com/usuario", form);

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
                textMensaje.text = detalleRespuesta.message;
            }
            else
            {
                textMensaje.text = detalleRespuesta.message;
            }
        }
    }

    private void cancelarCreacion()
    {
        SceneManager.LoadScene(0);
    }
}
