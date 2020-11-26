using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;

public class IniciarSesion : MonoBehaviour
{
    public GameObject ifcorreo;
    public GameObject ifcontrasenia;
    public GameObject btniniciar;
    public GameObject btnrecordar;
    public GameObject btncrear;
    public Text textMensaje;

    public Button BtnIniciar;
    public Button BtnRecordar;
    public Button BtnCrear;

    private string IfCorreo;
    private string IfContrasenia;

    // Start is called before the first frame update
    void Start()
    {
        Screen.orientation = ScreenOrientation.Portrait;

        BtnIniciar = btniniciar.GetComponent<Button>();
        BtnIniciar.onClick.AddListener(validaLogin);

        BtnRecordar = btnrecordar.GetComponent<Button>();
        BtnRecordar.onClick.AddListener(recordarContrasenia);

        BtnCrear = btncrear.GetComponent<Button>();
        BtnCrear.onClick.AddListener(crearUsuario);

        textMensaje.text = "";
    }

    // Update is called once per frame
    void Update()
    {
        if (Application.platform == RuntimePlatform.Android)
        {
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                Application.Quit();
            }
        }
    }

    [Serializable]

    public class DetalleCredenciales
    {
        public int status;
        public string message;
        public int usuarioId;
        public string usuarioTipo;

    }

    private void validaLogin()
    {
        IfCorreo = ifcorreo.GetComponent<InputField>().text;
        IfContrasenia = ifcontrasenia.GetComponent<InputField>().text;

        if (IfCorreo != "" && IfContrasenia != "") {
            StartCoroutine(InicioSesion(IfCorreo, IfContrasenia));
        }
        else {
            textMensaje.text = "Debe ingresar todos los datos";
            return;
        }
    }

    private void recordarContrasenia()
    {
        SceneManager.LoadScene(1);
    }

    private void crearUsuario()
    {
        SceneManager.LoadScene(2);
    }

    public IEnumerator InicioSesion(string IfCorreo, string IfContrasenia)
    {
        WWWForm form = new WWWForm();
        form.AddField("usuarioCorreo", IfCorreo);
        form.AddField("usuarioContrasenia", IfContrasenia);

        UnityWebRequest www = UnityWebRequest.Post("https://cora-app.herokuapp.com/usuario/credenciales", form);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);

            DetalleCredenciales detalleCredenciales = JsonUtility.FromJson<DetalleCredenciales>(www.downloadHandler.text);
            if (detalleCredenciales.status == 1)
            {
                if (detalleCredenciales.usuarioTipo.Equals("Anfitrion"))
                {
                    SceneManager.LoadScene(3);
                }
                if (detalleCredenciales.usuarioTipo.Equals("Participante"))
                {
                    SceneManager.LoadScene(4);
                }
            }
            else
            {
                textMensaje.text = detalleCredenciales.message;
            }
        }

    }
}
