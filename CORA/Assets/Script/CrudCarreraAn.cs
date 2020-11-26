using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;

public class CrudCarreraAn : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Start: ");
        StartCoroutine(buscarDatos("oscarrr"));
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    /*
   [Serializable]

   public class carreraObservacion
   {
       public int carreraObservacionId;
       public string carreraObservacionNombre;
       public string carreraObservacionDescripcion
       public string carreraObservacionCodigoIngreso;
       public int carreraObservacionIntegrantesGrupo:
       public string carreraObservacionEstado;
   }
   */
    [System.Serializable]
    public class Usuario
    {
        public int usuarioId;
        public string usuarioNombre;
        public string usuarioApellido;
        public string usuarioCorreo;
        public string usuarioContrasenia;
        public string usuarioEstado;
        public string usuarioTipo;
        public string createdAt;
        public string updatedAt;
        
    }

    [Serializable]
    public class LineaDatosUusario
    {
        public Usuario[] usuarios;
    }
    public IEnumerator buscarDatos(String dato)
    {
        
     
         UnityWebRequest www = UnityWebRequest.Get("https://cora-app.herokuapp.com/usuario");
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            //Debug.Log(www.downloadHandler.text);
            string resultado = "{"+"usuarios"+":" + www.downloadHandler.text + "}";
   
            Debug.Log("string: " + resultado);
            LineaDatosUusario listausuarios = JsonUtility.FromJson<LineaDatosUusario>(resultado);
            //Usuario[] listausuario = new Usuario[2];

            //listausuario[0] = new Usuario();
            //listausuario[0].usuarioNombre = "oscar";
            //listausuario[0].usuarioApellido = "ruge";
            //listausuario[0].usuarioCorreo = "asdasd Nick";

            Debug.Log(listausuarios.usuarios[0].usuarioNombre);

            //for (int i = 0; i < usuario.Length; i++)
            //{
            //  Debug.Log("Error: " + usuario[1].usuarioNombre);
            //}
        }
        Debug.Log("sale: " + www.error);

    }
    public static class JsonHelper
    {
        public static T[] FromJson<T>(string json)
        {
            Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(json);
            return wrapper.Items;
        }

        public static string ToJson<T>(T[] array)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper);
        }

        public static string ToJson<T>(T[] array, bool prettyPrint)
        {
            Wrapper<T> wrapper = new Wrapper<T>();
            wrapper.Items = array;
            return JsonUtility.ToJson(wrapper, prettyPrint);
        }

        [Serializable]
        private class Wrapper<T>
        {
            public T[] Items;
        }
    }
}
