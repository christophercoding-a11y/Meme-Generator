import { useEffect, useState } from "react";
import axios from "axios";

const Meme =()=> {

    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemes, setAllMemes] = useState({})


    // useEffect(callback func, dependency array)
    useEffect(()=>{
        axios.get("https://api.imgflip.com/get_memes")
            .then(data => {
                setAllMemes(data.data)
            })
    },[])

    const getMeme =()=> {

        const memes = allMemes.data.memes
        let idx = Math.floor(Math.random()* memes.length)

        setMeme(prevState => ({
            ...prevState,
            randomImage: memes[idx].url
        }))
    }

    const handleChange =(event)=> {
        const { name, value} = event.target

        setMeme(prevState => ({...prevState,[name]: value}))

        console.log(event)
    }

    return (
        <>
            <section className="section meme-section">
                <div className="container">
                    <form className="form-meme-form">
                        <div className="row">
                            <div className="col">
                                <label
                                    htmlFor="topText"
                                    className="form-label"
                                >Top Text</label>
                                <input
                                    id="topText"
                                    type="text"
                                    onChange={handleChange}
                                    name="topText"
                                    value={meme.topText}
                                    className="form-control text-1"
                                />
                            </div>
                            <div class="row">
                            <div className="col">
                                <label
                                    htmlFor="bottomText"
                                    className="form-label"
                                >bottom Text</label>
                                <input
                                    id="bottomText"
                                    type="text"
                                    onChange={handleChange}
                                    name="bottomText"
                                    value={meme.bottomText}
                                    className="form-control text-1"
                                />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="d-grid">
                        <button className="btn submit-btn" type="button" onClick={ getMeme }>Get a new meme image</button>
                            </div>
                        </div>
                    </form>
                    <div className="meme-img-div">
                        <img src={ meme.randomImage}alt="placeholder img" className="img-fluid image meme-img" />
                        <h2 className="meme-text top">{ meme.topText }</h2>
                        <h2 className="meme-text bottom">{ meme.bottomText }</h2>
                    </div>
                </div>
            </section>
        </>
    )
}



export default Meme