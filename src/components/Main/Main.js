//que es un HOOK? es una funcion nativa de react la cual nos ayuda a resolver problemas de datos en especifico

//traemos de la librearia react el useState (hook)
import { useState } from "react"            

export default function Main() {

    const [newComment, setNewComment] =useState({
        subject:"",
        content:"",
        author: ""
    })

    const [list, setList] = useState([])

    const [error, setError] = useState("")

    const handleChange = (event) => {
        console.log(event.target.value)
        console.log("Hola")
        console.log("el campo de texto en el que estas escribiendo es:", event.target.name)

        setNewComment({
            ...newComment,                  //el spreadoperator hace una copia completa del valor actual 
            [event.target.name]: event.target.value
        })
        
    }

    const handleSubmit =(event) => {
            event.preventDefault()      //detiene la recarga de la pagina
            
            if(!newComment.subject || !newComment.content || !newComment.author) {

                setError("existe un campo vacio, por favor verifica nuevamente")
                return
    
            }

            setList([
                ...list,
                newComment
            ])

            setNewComment({             
                subject:"",             //esto es para que se limpie lo que ya esta escrito en el formulario
                content:"",
                author:""
            })
            
            setError("")
    }
    
  return (
    <>
        <h1> Seccion de comentarios </h1>

        <form onSubmit={(evt)=> { handleSubmit(evt) } }>

            <label>Asunto</label>
            <input 
            name="subject"
            value={newComment.subject}
            onChange={ (evt)=> { handleChange( evt) }}
            />

            <label>comentario</label>
            <input
            name="content"
            value={newComment.content}
            onChange={evt => {handleChange(evt)}}
            />

            <label>Autor</label>
			<input 
            name="author"
            value={newComment.author}
            onChange={ evt => { handleChange(evt) } }
            />

            <button type="submit">Crear comentario</button>

            <p>{ error }</p>

        </form>

        <h2>Listado de comentarios</h2>

        {
                list.length === 0 ? 
                    <p>No hay publicacion</p> 
                : 
				list.map((elt, index) => {
					return (
						<div key={index}>
							<h3>{elt.subject}</h3>
							<span>Escrito por: {elt.author}</span>
							<p>{elt.content}</p>
						</div>
					)
				})
			}   
        

    </>
  )
}
